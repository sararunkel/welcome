import { useMap } from '../../context/MapContext';
import { getAllTechnologies } from '../../data/projects';
import './FilterBar.css';

const technologies = getAllTechnologies();

export function FilterBar() {
  const {
    layerVisibility,
    toggleLayer,
    filters,
    setFilters,
    showPhotosLayer,
    togglePhotosLayer,
    ambientEnabled,
    toggleAmbient
  } = useMap();

  const handleTechToggle = (tech: string) => {
    const newTechs = filters.technologies.includes(tech)
      ? filters.technologies.filter(t => t !== tech)
      : [...filters.technologies, tech];
    setFilters({ ...filters, technologies: newTechs });
  };

  const clearFilters = () => {
    setFilters({ technologies: [], categories: [] });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__section">
        <span className="filter-bar__label">Projects:</span>
        <div className="filter-bar__buttons">
          <button
            className={`filter-bar__btn filter-bar__btn--professional ${layerVisibility.professional ? 'active' : ''}`}
            onClick={() => toggleLayer('professional')}
          >
            Professional
          </button>
          <button
            className={`filter-bar__btn filter-bar__btn--academic ${layerVisibility.academic ? 'active' : ''}`}
            onClick={() => toggleLayer('academic')}
          >
            Academic
          </button>
          <button
            className={`filter-bar__btn filter-bar__btn--personal ${layerVisibility.personal ? 'active' : ''}`}
            onClick={() => toggleLayer('personal')}
          >
            Personal
          </button>
        </div>
      </div>

      <div className="filter-bar__section">
        <span className="filter-bar__label">Photos:</span>
        <div className="filter-bar__buttons">
          <button
            className={`filter-bar__btn filter-bar__btn--photos ${showPhotosLayer ? 'active' : ''}`}
            onClick={togglePhotosLayer}
            title="Toggle photo markers on map"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Markers
          </button>
          <button
            className={`filter-bar__btn filter-bar__btn--ambient ${ambientEnabled ? 'active' : ''}`}
            onClick={toggleAmbient}
            title="Toggle ambient photo backgrounds"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Ambient
          </button>
        </div>
      </div>

      <div className="filter-bar__section filter-bar__section--tech">
        <span className="filter-bar__label">Tech:</span>
        <div className="filter-bar__tech-scroll">
          {technologies.slice(0, 8).map(tech => (
            <button
              key={tech}
              className={`filter-bar__tech ${filters.technologies.includes(tech) ? 'active' : ''}`}
              onClick={() => handleTechToggle(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
        {filters.technologies.length > 0 && (
          <button className="filter-bar__clear" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
