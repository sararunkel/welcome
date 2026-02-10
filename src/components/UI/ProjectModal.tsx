import { FC, useEffect } from 'react';
import { Project } from '../../types';
import './ProjectModal.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="project-modal__backdrop" onClick={handleBackdropClick}>
      <div className="project-modal">
        <button
          className="project-modal__close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>

        <div className="project-modal__content">
          {project.images && project.images.length > 0 && (
            <div className="project-modal__image">
              <img src={project.images[0]} alt={project.title} />
            </div>
          )}

          <div className="project-modal__details">
            <span className="project-modal__category">
              {project.category}
            </span>
            <h2 className="project-modal__title">{project.title}</h2>
            <p className="project-modal__description">{project.fullDescription || project.shortDescription}</p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="project-modal__tech">
                <h4>Technologies</h4>
                <div className="project-modal__tech-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {project.links && (
              <div className="project-modal__links">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-modal__link">
                    View on GitHub →
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-modal__link">
                    View Live Site →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
