import { FC, useState, useEffect } from 'react';
import './HeroOverlay.css';

const OVERLAY_DISMISSED_KEY = 'hero-overlay-dismissed';

export const HeroOverlay: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(OVERLAY_DISMISSED_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(OVERLAY_DISMISSED_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="hero-overlay">
      <div className="hero-overlay__content">
        <h1 className="hero-overlay__title">Sara Runkel</h1>
        <p className="hero-overlay__subtitle">A Climate Data Scientist</p>
        <button
          className="hero-overlay__close"
          onClick={handleDismiss}
          aria-label="Close welcome message"
        >
          ×
        </button>
      </div>
    </div>
  );
};
