import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MapProvider, useMap } from './context/MapContext';
import { Navigation } from './components/UI';
import {
  HomeSection,
  WorkSection,
  CreativeSection,
  AboutSection,
} from './components/Sections';
import { ProjectModal } from './components/UI/ProjectModal';
import { projects } from './data/projects';

function AppContent() {
  const { setCurrentSection, currentSection, selectedProject, selectProject } = useMap();

  useEffect(() => {
    // Track section changes via Intersection Observer
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id as 'home' | 'work' | 'creative' | 'about';
            setCurrentSection(sectionId);

            // Update URL hash without triggering scroll
            if (sectionId !== 'home') {
              history.replaceState(null, '', `#${sectionId}`);
            } else {
              history.replaceState(null, '', window.location.pathname);
            }
          }
        });
      },
      { threshold: [0.5] }
    );

    sections.forEach((section) => observer.observe(section));

    // Handle initial hash
    const hash = window.location.hash.slice(1) as 'home' | 'work' | 'creative' | 'about';
    if (hash && ['home', 'work', 'creative', 'about'].includes(hash)) {
      setCurrentSection(hash);
    }

    return () => observer.disconnect();
  }, [setCurrentSection]);

  // Find the selected project object from the ID
  const selectedProjectData = selectedProject
    ? projects.find(p => p.id === selectedProject) || null
    : null;

  return (
    <div className="app">
      {/* Sticky left navigation */}
      <Navigation currentSection={currentSection} />

      {/* Scrollable sections */}
      <main className="main-scroll">
        <HomeSection />
        <WorkSection />
        <CreativeSection />
        <AboutSection />
      </main>

      {/* Shared project modal accessible from map dots and project cards */}
      <ProjectModal
        project={selectedProjectData}
        onClose={() => selectProject(null)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MapProvider>
        <AppContent />
      </MapProvider>
    </ThemeProvider>
  );
}

export default App;
