import { FC } from 'react';
import { ProjectCard } from '../UI/ProjectCard';
import { projects } from '../../data/projects';
import './Section.css';

export const CreativeSection: FC = () => {
  // Filter for personal/creative projects
  const creativeProjects = projects.filter(p => p.category === 'personal' || p.category === 'academic');

  return (
    <section id="creative" className="section section--creative">
      <div className="section__overlay">
        <div className="section__content">
          <h2 className="section__title">Creative</h2>

          <div className="category-grid">
            <div className="category-card category-card--coral">
              <h3 className="category-card__title">Creative Technology & Design</h3>
              <p className="category-card__description">
                Exploring the intersection of climate science, art, and technology to communicate complex issues through innovative mediums.
              </p>
              {creativeProjects.length > 0 && (
                <div className="category-card__projects">
                  {creativeProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
