import { useState, useEffect } from 'react';
import { useMap } from '../../context/MapContext';
import { handleImageError, PLACEHOLDER_IMAGE } from '../../utils/imageUtils';
import './AmbientBackground.css';

export function AmbientBackground() {
  const { ambientPhoto, ambientEnabled } = useMap();
  const [displayedPhoto, setDisplayedPhoto] = useState(ambientPhoto);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle smooth transitions between photos
  useEffect(() => {
    if (ambientPhoto?.id !== displayedPhoto?.id) {
      setIsTransitioning(true);
      setImageError(false);

      // Wait for fade out, then change photo
      const timeout = setTimeout(() => {
        setDisplayedPhoto(ambientPhoto);
        // Small delay before fading in
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [ambientPhoto, displayedPhoto?.id]);

  if (!ambientEnabled || !displayedPhoto) return null;

  // Don't show ambient background if image failed to load
  if (imageError) return null;

  return (
    <div className={`ambient-background ${isTransitioning ? 'ambient-background--transitioning' : ''}`}>
      <img
        src={displayedPhoto.src || PLACEHOLDER_IMAGE}
        alt=""
        className="ambient-background__image"
        onError={(e) => {
          handleImageError(e);
          setImageError(true);
        }}
      />
      <div className="ambient-background__overlay" />
      <div className="ambient-background__info">
        <span className="ambient-background__location">
          {displayedPhoto.location.name}
        </span>
      </div>
    </div>
  );
}
