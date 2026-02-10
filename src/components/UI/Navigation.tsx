import { FC } from 'react';
import './Navigation.css';

interface NavigationProps {
  currentSection?: string;
}

export const Navigation: FC<NavigationProps> = ({ currentSection = 'home' }) => {
  const sections = [
    { id: 'home', label: 'Home', hash: '' },
    { id: 'work', label: 'Work', hash: '#work' },
    { id: 'creative', label: 'Creative', hash: '#creative' },
    { id: 'about', label: 'About', hash: '#about' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (sectionId === 'home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <nav className="navigation">
      {sections.map((section) => (
        <a
          key={section.id}
          href={section.hash || '#'}
          className={`navigation__link ${currentSection === section.id ? 'navigation__link--active' : ''}`}
          onClick={(e) => handleClick(e, section.id)}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
};
