import { FC } from 'react';
import { Project } from '../../types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick} role="button" tabIndex={0}>
      {project.images && project.images.length > 0 && (
        <div className="project-card__image">
          <img src={project.images[0]} alt={project.title} />
        </div>
      )}
      <div className="project-card__content">
        <h4 className="project-card__title">{project.title}</h4>
        <p className="project-card__description">{project.shortDescription}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-card__tech">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="project-card__tech-tag">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="project-card__tech-tag">+{project.technologies.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
