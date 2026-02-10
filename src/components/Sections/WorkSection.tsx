import { FC } from 'react';
import { projects } from '../../data/projects';
import { useMap } from '../../context/MapContext';
import './Section.css';
import './WorkSection.css';

export const WorkSection: FC = () => {
  const { selectProject } = useMap();

  // Filter for professional and academic projects
  const professionalProjects = projects.filter(p => p.category === 'professional');
  const academicProjects = projects.filter(p => p.category === 'academic');

  // Separate ML-related projects
  const mlProjects = professionalProjects.filter(p =>
    p.technologies.some(tech =>
      tech.toLowerCase().includes('machine learning') ||
      tech.toLowerCase().includes('pytorch') ||
      tech.toLowerCase().includes('ml') ||
      p.title.toLowerCase().includes('machine learning')
    )
  );

  // Data visualization projects (all others + academic)
  const vizProjects = [...professionalProjects.filter(p => !mlProjects.includes(p)), ...academicProjects];

  return (
    <section id="work" className="section section--work">
      <div className="section__overlay">
        <div className="section__content">
          {/* Data Visualizations Section */}
          <div className="work-category work-category--coral">
            <div className="work-category__content">
              <h3 className="work-category__title">Data Visualizations</h3>
              <p className="work-category__description">
                Designed climate-smart data stories to translate complex research into the popular scholarly app
              </p>
              <a href="#" className="work-category__link">View Projects →</a>
            </div>
            <div className="work-category__projects">
              {vizProjects.slice(0, 6).map(project => (
                <div
                  key={project.id}
                  className="work-project-card"
                  onClick={() => selectProject(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectProject(project.id);
                    }
                  }}
                >
                  <div className="card-slide card-slide--image">
                    {project.images?.[0] && (
                      <img src={project.images[0]} alt={project.title} />
                    )}
                  </div>
                  <div className="card-slide card-slide--content">
                    <h4>{project.title}</h4>
                    <p>{project.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Machine Learning Section */}
          {mlProjects.length > 0 && (
            <div className="work-category work-category--navy">
              <div className="work-category__content">
                <h3 className="work-category__title">Machine Learning</h3>
                <p className="work-category__description">
                  Designed cloud primary data, processed and modeled climate impacts using the popular scholarly app
                </p>
                <a href="#" className="work-category__link">View Projects →</a>
              </div>
              <div className="work-category__projects">
                {mlProjects.slice(0, 6).map(project => (
                  <div
                    key={project.id}
                    className="work-project-card"
                    onClick={() => selectProject(project.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectProject(project.id);
                      }
                    }}
                  >
                    <div className="card-slide card-slide--image">
                      {project.images?.[0] && (
                        <img src={project.images[0]} alt={project.title} />
                      )}
                    </div>
                    <div className="card-slide card-slide--content">
                      <h4>{project.title}</h4>
                      <p>{project.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Software Development Section */}
          <div className="work-category work-category--coral">
            <div className="work-category__content">
              <h3 className="work-category__title">Software Development</h3>
              <p className="work-category__description">
                Designed active energy-data products to launch APIs for the popular scholarly app
              </p>
              <a href="#" className="work-category__link">View Projects →</a>
            </div>
            <div className="work-category__projects">
              {professionalProjects.slice(0, 6).map(project => (
                <div
                  key={project.id}
                  className="work-project-card"
                  onClick={() => selectProject(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectProject(project.id);
                    }
                  }}
                >
                  <div className="card-slide card-slide--image">
                    {project.images?.[0] && (
                      <img src={project.images[0]} alt={project.title} />
                    )}
                  </div>
                  <div className="card-slide card-slide--content">
                    <h4>{project.title}</h4>
                    <p>{project.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
