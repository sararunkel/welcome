import { useCallback, useMemo, useState, useEffect } from 'react';
import { Map } from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { FlyToInterpolator, PickingInfo } from '@deck.gl/core';
import { useMap } from '../../context/MapContext';
import { useTheme } from '../../context/ThemeContext';
import { Project, Photo } from '../../types';
import { MAP_STYLES, CATEGORY_COLORS, TRANSITION_DURATION } from '../../constants';
import 'maplibre-gl/dist/maplibre-gl.css';

export function MapContainer() {
  const { theme } = useTheme();
  const {
    viewState,
    setViewState,
    filteredProjects,
    selectedProject,
    selectProject,
    filteredPhotos,
    selectedPhoto,
    selectPhoto
  } = useMap();

  // Delay rendering to avoid WebGL initialization issues
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure container is mounted and sized
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewStateChange = useCallback((params: any) => {
    if (params.viewState) {
      setViewState(params.viewState);
    }
  }, [setViewState]);

  const handleProjectClick = useCallback((info: PickingInfo) => {
    const project = info.object as Project | undefined;
    if (project) {
      selectProject(project.id);
    }
  }, [selectProject]);

  const handlePhotoClick = useCallback((info: PickingInfo) => {
    const photo = info.object as Photo | undefined;
    if (photo) {
      selectPhoto(photo.id);
    }
  }, [selectPhoto]);

  const layers = useMemo(() => {
    if (!isReady) return [];

    const layerList = [];

    // Photo markers layer - using ScatterplotLayer with distinct styling
    if (filteredPhotos.length > 0) {
      // Outer ring for photos
      layerList.push(
        new ScatterplotLayer<Photo>({
          id: 'photos-ring',
          data: filteredPhotos,
          pickable: true,
          opacity: 1,
          stroked: true,
          filled: false,
          radiusScale: 1,
          radiusMinPixels: 14,
          radiusMaxPixels: 40,
          lineWidthMinPixels: 3,
          getPosition: (d) => [d.location.longitude, d.location.latitude],
          getRadius: 6000,
          getLineColor: (d) => d.id === selectedPhoto
            ? [255, 255, 255, 255] as [number, number, number, number]
            : [139, 92, 246, 255] as [number, number, number, number],
          getLineWidth: (d) => d.id === selectedPhoto ? 4 : 3,
          onClick: handlePhotoClick,
          updateTriggers: {
            getLineColor: [selectedPhoto],
            getLineWidth: [selectedPhoto]
          }
        })
      );

      // Inner dot for photos
      layerList.push(
        new ScatterplotLayer<Photo>({
          id: 'photos-center',
          data: filteredPhotos,
          pickable: true,
          opacity: 1,
          stroked: false,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 5,
          radiusMaxPixels: 15,
          getPosition: (d) => [d.location.longitude, d.location.latitude],
          getRadius: 2500,
          getFillColor: (d) => d.id === selectedPhoto
            ? [139, 92, 246, 255] as [number, number, number, number]
            : [255, 255, 255, 255] as [number, number, number, number],
          onClick: handlePhotoClick,
          updateTriggers: {
            getFillColor: [selectedPhoto]
          }
        })
      );
    }

    // Project markers
    layerList.push(
      new ScatterplotLayer<Project>({
        id: 'projects',
        data: filteredProjects,
        pickable: true,
        opacity: 0.9,
        stroked: true,
        filled: true,
        radiusScale: 1,
        radiusMinPixels: 12,
        radiusMaxPixels: 60,
        lineWidthMinPixels: 2,
        getPosition: (d) => [
          d.location.longitude,
          d.location.latitude,
          (d.location.altitude || 0) * 10
        ],
        getRadius: (d) => d.featured ? 8000 : 5000,
        getFillColor: (d) => {
          const baseColor = CATEGORY_COLORS[d.category];
          if (d.id === selectedProject) {
            return [255, 255, 255, 255] as [number, number, number, number];
          }
          return baseColor;
        },
        getLineColor: (d) => {
          if (d.id === selectedProject) {
            return CATEGORY_COLORS[d.category];
          }
          return [255, 255, 255, 200] as [number, number, number, number];
        },
        getLineWidth: (d) => d.id === selectedProject ? 4 : 2,
        onClick: handleProjectClick,
        updateTriggers: {
          getFillColor: [selectedProject],
          getLineColor: [selectedProject],
          getLineWidth: [selectedProject]
        },
        transitions: {
          getFillColor: TRANSITION_DURATION / 2,
          getLineColor: TRANSITION_DURATION / 2
        }
      })
    );

    // Selected project pulse effect
    if (selectedProject) {
      const selectedData = filteredProjects.filter(p => p.id === selectedProject);
      const category = selectedData[0]?.category || 'professional';

      layerList.push(
        new ScatterplotLayer<Project>({
          id: 'selected-pulse',
          data: selectedData,
          pickable: false,
          opacity: 0.2,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 20,
          radiusMaxPixels: 100,
          getPosition: (d) => [d.location.longitude, d.location.latitude],
          getRadius: 15000,
          getFillColor: CATEGORY_COLORS[category]
        })
      );
    }

    return layerList;
  }, [isReady, filteredProjects, filteredPhotos, selectedProject, selectedPhoto, handleProjectClick, handlePhotoClick]);

  const getTooltip = useCallback((info: PickingInfo) => {
    if (!info.object) return null;

    if (info.layer?.id === 'photos-ring' || info.layer?.id === 'photos-center') {
      const photo = info.object as Photo;
      return {
        html: `
          <div class="map-tooltip map-tooltip--photo">
            <strong>${photo.title}</strong>
            <p>${photo.location.name}</p>
            <span class="map-tooltip__hint">Click to view</span>
          </div>
        `,
        style: {
          backgroundColor: 'transparent',
          padding: '0',
          border: 'none'
        }
      };
    }

    const project = info.object as Project;
    return {
      html: `
        <div class="map-tooltip">
          <strong>${project.title}</strong>
          <p>${project.shortDescription}</p>
          <span class="map-tooltip__hint">Click to explore</span>
        </div>
      `,
      style: {
        backgroundColor: 'transparent',
        padding: '0',
        border: 'none'
      }
    };
  }, []);

  // Handle WebGL errors gracefully
  const onError = useCallback((error: Error) => {
    console.warn('DeckGL error:', error.message);
  }, []);

  if (!isReady) {
    return (
      <div className="map-container map-container--loading">
        <div className="map-loading">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <DeckGL
        viewState={{
          ...viewState,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: viewState.transitionDuration || 0
        }}
        onViewStateChange={handleViewStateChange}
        onError={onError}
        controller={true}
        layers={layers}
        getTooltip={getTooltip}
      >
        <Map
          mapStyle={MAP_STYLES[theme]}
          attributionControl={true}
        />
      </DeckGL>
    </div>
  );
}
