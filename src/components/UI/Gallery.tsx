import { useState, useEffect, useCallback } from 'react';
import { useMap } from '../../context/MapContext';
import { photos } from '../../data/photos';
import { Photo } from '../../types';
import { handleImageError, PLACEHOLDER_IMAGE } from '../../utils/imageUtils';
import './Gallery.css';

type FilterCategory = Photo['category'] | 'all';

export function Gallery() {
  const { selectPhoto, setLightboxOpen } = useMap();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  const filteredPhotos = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.category === activeFilter);

  const categories: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'landscape', label: 'Landscape' },
    { value: 'street', label: 'Street' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'nature', label: 'Nature' },
    { value: 'urban', label: 'Urban' },
    { value: 'travel', label: 'Travel' }
  ];

  // Only show categories that have photos
  const availableCategories = categories.filter(cat =>
    cat.value === 'all' || photos.some(p => p.category === cat.value)
  );

  const handlePhotoClick = useCallback((photo: Photo) => {
    selectPhoto(photo.id);
    setLightboxOpen(true);
  }, [selectPhoto, setLightboxOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  // Expose open function globally for Header to use
  useEffect(() => {
    (window as unknown as { openGallery: () => void }).openGallery = () => setIsOpen(true);
    return () => {
      delete (window as unknown as { openGallery?: () => void }).openGallery;
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="gallery">
      <div className="gallery__header">
        <div className="gallery__title-section">
          <h1 className="gallery__title">Photography</h1>
          <p className="gallery__subtitle">{filteredPhotos.length} photos</p>
        </div>

        <div className="gallery__filters">
          {availableCategories.map(cat => (
            <button
              key={cat.value}
              className={`gallery__filter ${activeFilter === cat.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          className="gallery__close"
          onClick={handleClose}
          aria-label="Close gallery"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="gallery__content">
        {filteredPhotos.length === 0 ? (
          <div className="gallery__empty">
            <p>No photos in this category yet.</p>
          </div>
        ) : (
          <div className="gallery__grid">
            {filteredPhotos.map(photo => (
              <div
                key={photo.id}
                className={`gallery__item ${hoveredPhoto === photo.id ? 'hovered' : ''}`}
                onClick={() => handlePhotoClick(photo)}
                onMouseEnter={() => setHoveredPhoto(photo.id)}
                onMouseLeave={() => setHoveredPhoto(null)}
              >
                <div className="gallery__image-wrapper">
                  <img
                    src={photo.thumbnail || photo.src || PLACEHOLDER_IMAGE}
                    alt={photo.title}
                    className="gallery__image"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="gallery__overlay">
                    <h3 className="gallery__photo-title">{photo.title}</h3>
                    <p className="gallery__photo-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {photo.location.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
