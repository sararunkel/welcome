import { FC } from 'react';
import './Section.css';
import mePhoto from '../../../public/me.jpeg';

export const AboutSection: FC = () => {
  return (
    <section id="about" className="section section--about">
      <div className="section__overlay section__overlay--sage">
        <div className="section__content">
          <h2 className="section__title">A Little Bit About Me</h2>

          <div className="about-content">
            <div className="about-header">
              <div className="about-avatar">
                <img src={mePhoto} alt="Sara Runkel" className="about-avatar__image" />
              </div>
              <div>
                <h3 className="about-name">Sara Runkel</h3>
                <p className="about-role">Climate Data Scientist</p>
              </div>
            </div>

            <div className="about-text">
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

              <div className="about-focus">
                <h4>Current Focus</h4>
                <ul>
                  <li>Data management and convergence research at the NSF NCAR Research Aviation Facility</li>
                  <li>Graduate research at CU Boulder ATLAS Institute</li>
                  <li>Climate storytelling through data</li>
                </ul>
              </div>
            </div>

            <a href="mailto:sara.runkel@colorado.edu" className="contact-button">Contact Me</a>
          </div>

          <footer className="about-footer">
            <h3 className="about-footer__message">
              Let's work together to make the world more sustainable.
            </h3>
            <div className="about-footer__social">
              <a href="example.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="CV">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </a>
              <a href="https://github.com/sararunkel" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .296a12 12 0 00-3.794 23.4c.6.112.82-.26.82-.578 0-.286-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.836 2.809 1.306 3.495.999.108-.776.418-1.306.762-1.606-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 016.003 0c2.292-1.552 3.298-1.23 3.298-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.479 5.921.43.371.815 1.102.815 2.222 0 1.604-.014 2.896-.014 3.293 0 .32.216.694.825.576A12.005 12.005 0 0012 .296z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/sara-runkel/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
