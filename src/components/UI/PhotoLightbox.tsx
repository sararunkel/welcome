import { useEffect, useCallback, useState } from 'react';
import { useMap } from '../../context/MapContext';
import { photos } from '../../data/photos';
import { PLACEHOLDER_IMAGE, handleImageError } from '../../utils/imageUtils';
import './PhotoLightbox.css';

export function PhotoLightbox() {
  const { selectedPhoto, selectPhoto, lightboxOpen, setLightboxOpen } = useMap();
  const [imageLoaded, setImageLoaded] = useState(false);

  const photo = selectedPhoto ? photos.find(p => p.id === selectedPhoto) : null;
  const currentIndex = photo ? photos.findIndex(p => p.id === photo.id) : -1;

  const handleClose = useCallback(() => {
    setLightboxOpen(false);
    selectPhoto(null);
    setImageLoaded(false);
  }, [setLightboxOpen, selectPhoto]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setImageLoaded(false);
      selectPhoto(photos[currentIndex - 1].id);
    }
  }, [currentIndex, selectPhoto]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setImageLoaded(false);
      selectPhoto(photos[currentIndex + 1].id);
    }
  }, [currentIndex, selectPhoto]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, handleClose, handlePrev, handleNext]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!lightboxOpen || !photo) return null;

  return (
    <div className="lightbox" onClick={handleBackdropClick}>
      <button
        className="lightbox__close"
        onClick={handleClose}
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {currentIndex > 0 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={handlePrev}
          aria-label="Previous photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={handleNext}
          aria-label="Next photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <div className="lightbox__content">
        <div className="lightbox__image-container">
          {!imageLoaded && (
            <div className="lightbox__loading">Loading...</div>
          )}
          <img
            src={photo.src || PLACEHOLDER_IMAGE}
            alt={photo.title}
            className={`lightbox__image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        </div>

        <div className="lightbox__info">
          <div className="lightbox__header">
            <h2 className="lightbox__title">{photo.title}</h2>
            <span className="lightbox__category">{photo.category}</span>
          </div>

          {photo.description && (
            <p className="lightbox__description">{photo.description}</p>
          )}

          <div className="lightbox__meta">
            <div className="lightbox__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {photo.location.name}
            </div>

            {photo.dateTaken && (
              <div className="lightbox__meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {new Date(photo.dateTaken).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}

            {photo.camera && (
              <div className="lightbox__meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                {photo.camera}
              </div>
            )}
          </div>

          <div className="lightbox__counter">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
