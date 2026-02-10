import { createContext, useContext, useState, useMemo, useCallback, useEffect, ReactNode } from 'react';
import { projects } from '../data/projects';
import { photos, findRegionForCoordinates, getRandomPhotoForRegion } from '../data/photos';
import { Project, LayerVisibility, FilterState, ViewState, Photo } from '../types';
import { INITIAL_VIEW_STATE, TRANSITION_DURATION } from '../constants';

type Section = 'home' | 'work' | 'creative' | 'about';

interface MapContextValue {
  // View state
  viewState: ViewState;
  setViewState: (state: ViewState) => void;
  flyTo: (longitude: number, latitude: number, zoom?: number) => void;

  // Section navigation
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  mapInteractive: boolean;

  // Projects
  filteredProjects: Project[];
  selectedProject: string | null;
  selectProject: (id: string | null) => void;

  // Photos
  filteredPhotos: Photo[];
  selectedPhoto: string | null;
  selectPhoto: (id: string | null) => void;
  showPhotosLayer: boolean;
  togglePhotosLayer: () => void;

  // Ambient background
  ambientPhoto: Photo | null;
  ambientEnabled: boolean;
  toggleAmbient: () => void;

  // Filters
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  layerVisibility: LayerVisibility;
  toggleLayer: (layer: keyof LayerVisibility) => void;

  // Timeline
  dateRange: [Date, Date];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  aboutOpen: boolean;
  setAboutOpen: (open: boolean) => void;
  lightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
}

const MapContext = createContext<MapContextValue | null>(null);

export function MapProvider({ children }: { children: ReactNode }) {
  // View state
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);

  // Section navigation
  const [currentSection, setCurrentSection] = useState<Section>('home');

  // Map is only interactive on home section
  const mapInteractive = useMemo(() => currentSection === 'home', [currentSection]);

  // Selection
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Photo layer visibility
  const [showPhotosLayer, setShowPhotosLayer] = useState(true);

  // Ambient background
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const [ambientPhoto, setAmbientPhoto] = useState<Photo | null>(null);
  const [currentRegion, setCurrentRegion] = useState<string | null>(null);

  // Layer visibility
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    professional: true,
    academic: true,
    personal: true
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    technologies: [],
    categories: []
  });

  // Timeline
  const [currentDate, setCurrentDate] = useState(new Date());

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Calculate date range from projects
  const dateRange = useMemo((): [Date, Date] => {
    const dates = projects.map(p => new Date(p.startDate));
    return [
      new Date(Math.min(...dates.map(d => d.getTime()))),
      new Date()
    ];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (!layerVisibility[project.category]) return false;

      if (filters.technologies.length > 0) {
        const hasMatchingTech = filters.technologies.some(
          tech => project.technologies.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      const projectDate = new Date(project.startDate);
      if (projectDate > currentDate) return false;

      return true;
    });
  }, [layerVisibility, filters, currentDate]);

  // Filter photos (for now, show all when layer is visible)
  const filteredPhotos = useMemo(() => {
    if (!showPhotosLayer) return [];
    return photos;
  }, [showPhotosLayer]);

  // Update ambient photo based on map position
  useEffect(() => {
    if (!ambientEnabled) {
      setAmbientPhoto(null);
      return;
    }

    const region = findRegionForCoordinates(viewState.longitude, viewState.latitude);
    const regionId = region?.id || null;

    // Only update if region changed
    if (regionId !== currentRegion) {
      setCurrentRegion(regionId);

      if (regionId) {
        const photo = getRandomPhotoForRegion(regionId);
        setAmbientPhoto(photo);
      } else {
        setAmbientPhoto(null);
      }
    }
  }, [viewState.longitude, viewState.latitude, ambientEnabled, currentRegion]);

  // Actions
  const flyTo = useCallback((longitude: number, latitude: number, zoom = 10) => {
    setViewState(prev => ({
      ...prev,
      longitude,
      latitude,
      zoom,
      pitch: 60,
      transitionDuration: TRANSITION_DURATION
    }));
  }, []);

  const toggleLayer = useCallback((layer: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  }, []);

  const togglePhotosLayer = useCallback(() => {
    setShowPhotosLayer(prev => !prev);
  }, []);

  const toggleAmbient = useCallback(() => {
    setAmbientEnabled(prev => !prev);
  }, []);

  const selectProject = useCallback((id: string | null) => {
    setSelectedProject(id);
    setSelectedPhoto(null); // Clear photo selection
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        flyTo(project.location.longitude, project.location.latitude);
        setSidebarOpen(true);
      }
    }
  }, [flyTo]);

  const selectPhoto = useCallback((id: string | null) => {
    setSelectedPhoto(id);
    setSelectedProject(null); // Clear project selection
    if (id) {
      const photo = photos.find(p => p.id === id);
      if (photo) {
        flyTo(photo.location.longitude, photo.location.latitude, 8);
        setLightboxOpen(true);
      }
    }
  }, [flyTo]);

  const value: MapContextValue = {
    viewState,
    setViewState,
    flyTo,
    currentSection,
    setCurrentSection,
    mapInteractive,
    filteredProjects,
    selectedProject,
    selectProject,
    filteredPhotos,
    selectedPhoto,
    selectPhoto,
    showPhotosLayer,
    togglePhotosLayer,
    ambientPhoto,
    ambientEnabled,
    toggleAmbient,
    filters,
    setFilters,
    layerVisibility,
    toggleLayer,
    dateRange,
    currentDate,
    setCurrentDate,
    sidebarOpen,
    setSidebarOpen,
    aboutOpen,
    setAboutOpen,
    lightboxOpen,
    setLightboxOpen
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap(): MapContextValue {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
