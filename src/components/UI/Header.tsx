import { useTheme } from '../../context/ThemeContext';
import { useMap } from '../../context/MapContext';
import './Header.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { setAboutOpen } = useMap();

  const openGallery = () => {
    // Gallery component listens for this
    (window as unknown as { openGallery?: () => void }).openGallery?.();
  };

  return (
    <header className="header">
      <div className="header__brand">
        <h1 className="header__title">Sara Runkel</h1>
        <span className="header__subtitle">Climate Storytelling</span>
      </div>

      <nav className="header__nav">
        <button
          className="header__nav-btn"
          onClick={() => setAboutOpen(true)}
        >
          About
        </button>
        <button
          className="header__nav-btn header__nav-btn--photos"
          onClick={openGallery}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Photography
        </button>
        <a
          href="https://github.com/sararunkel"
          target="_blank"
          rel="noopener noreferrer"
          className="header__nav-btn"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sara-runkel-56097b149/"
          target="_blank"
          rel="noopener noreferrer"
          className="header__nav-btn"
        >
          LinkedIn
        </a>
        <button
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
