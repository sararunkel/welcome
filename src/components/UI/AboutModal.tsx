import { useEffect, useRef } from 'react';
import { useMap } from '../../context/MapContext';
import './AboutModal.css';
import mePhoto from '../../../public/me.jpeg';

export function AboutModal() {
  const { aboutOpen, setAboutOpen } = useMap();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && aboutOpen) {
        setAboutOpen(false);
      }
    };

    if (aboutOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [aboutOpen, setAboutOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setAboutOpen(false);
    }
  };

  if (!aboutOpen) return null;

  return (
    <div className="about-modal__backdrop" onClick={handleBackdropClick}>
      <div className="about-modal" ref={modalRef} role="dialog" aria-modal="true">
        <button
          className="about-modal__close"
          onClick={() => setAboutOpen(false)}
          aria-label="Close about dialog"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="about-modal__content">
          <div className="about-modal__header">
            <div className="about-modal__avatar">
              {/* Replace with your photo */}
              <img src={mePhoto} alt="Sara Runkel" className="about-modal__avatar-image" />
            </div>
            <div>
              <h2 className="about-modal__name">Sara Runkel</h2>
              <p className="about-modal__role">Climate Data Scientist</p>
            </div>
          </div>

          <div className="about-modal__bio">
            <p>
              Hi, I'm Sara Runkel, a climate and health data scientist currently working in atmospheric observations.
              I'm pursuing a Master's in Creative Technology and Design: Social Impact
              to bring a creative perspective to climate science research.
            </p>
            <p>
              Growing up, I witnessed firsthand the impacts of climate change on my home community in Idaho,
              from decreasing snowfall patterns to annual wildfires and drought.
              In recent years, my grandparents have lost their home of 60 years to the LA wildfires.
            </p>
            <p>
              Seeing the nature I care for receding and the impacts it has on us daily motivates me to address these crises.
              My work in the intersection of climate change, air quality, and
              human health focuses on protecting vulnerable communities from climate and health inequities.
              By combining scientific analysis with design thinking and social justice principles,
              I hope to communicate complex climate issues in engaging ways to drive meaningful action.

            </p>
          </div>

          <div className="about-modal__section">
            <h3>Current Focus</h3>
            <ul>
              <li>Data management and convergence research at the NSF NCAR Research Aviation Facility</li>
              <li>Graduate research at CU Boulder ATLAS Institute</li>
              <li>Climate storytelling through data</li>
            </ul>
          </div>

          <div className="about-modal__section">
            <h3>Get in Touch</h3>
            <div className="about-modal__links">
              <a href="mailto:sara.runkel@colorado.edu" className="about-modal__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                sara.runkel@colorado.edu
              </a>
              <a href="https://github.com/sararunkel" target="_blank" rel="noopener noreferrer" className="about-modal__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/sara-runkel-56097b149/" target="_blank" rel="noopener noreferrer" className="about-modal__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
