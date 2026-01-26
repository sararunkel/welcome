import { Project } from '../types';
import c130 from '../../public/images/projects/c130.png';
// import mlClouds from '../../public/images/projects/ml-clouds.png';
// import atlasNetwork from '../../public/images/projects/atlas-network.png';
import climateThreads from '../../public/images/projects/stitching.jpg';
// import climateDashboard from '../../public/images/projects/climate-dashboard.png';


export const projects: Project[] = [
  {
    id: 'ncar-raf',
    title: 'Aircraft Data Visualizer',
    shortDescription: 'Real-time and historic visualization of research aircraft data at NSF NCAR',
    fullDescription: `Developed interactive visualization tools for the NSF NCAR Research Aviation Facility, enabling scientists to explore atmospheric data collected during field campaigns without specialized software.

Key contributions include designing the data pipeline architecture, implementing WebGL-based rendering for large datasets, and creating interactive time-series analysis tools that synchronize with geographic flight tracks.`,
    location: {
      longitude: -105.2705,
      latitude: 39.9911,
      altitude: 10000,
      locationType: 'physical',
      locationName: 'Research Aviation Facility'
    },
    category: 'professional',
    technologies: ['JavaScript', 'MapLibre GL', 'D3.js', 'Python', 'NetCDF', 'WebGL','PostgreSQL'],
    links: {
      github: 'https://github.com/NCAR/aircraft_visualizations',
      live: 'https://datavisualization.eol.ucar.edu/aircraft'
    },
    images: [c130],
    startDate: '2024-10-01',
    featured: true,
    color: '#4A90D9'
  },
  {
    id: 'atlas-practicum',
    title: 'Convergence Science Landscape',
    shortDescription: 'ATLAS Institute practicum exploring convergence research opportunities',
    fullDescription: `A research visualization project for my CU Boulder's ATLAS Institute practicum examining how to encourage convergence thinking at the Research Aviation Facility.
    The project maps relationships between researchers, existing datasets, and scientific opportunities to identify areas for collaboration and cocreation.

Built an interactive network visualization that allows users to explore connections between researchers, institutions, and research topics, revealing patterns in how interdisciplinary collaboration emerges.`,
    location: {
      longitude: -105.2705,
      latitude: 40.0076,
      locationType: 'physical',
      locationName: 'CU Boulder ATLAS'
    },
    category: 'professional',
    technologies: ['React', 'TypeScript', 'D3.js', 'Python', 'NetworkX'],
    links: {
      paper: 'https://example.com/paper'
    },
    images: [c130],
    startDate: '2026-01-01',
    featured: true,
    color: '#CFB87C'
  },
  {
    id: 'ml-weather',
    title: 'Machine Learning for Cloud Phase Classification',
    shortDescription: 'Hybrid convolutional neural network models for particle phase classification in clouds.',
    fullDescription: `
      Developed machine learning models to classify cloud particle phases (liquid, ice) using in-situ aircraft measurements from cloud probes.
      Implemented hybrid convolutional neural networks (CNNs) that combine image-based features with traditional meteorological variables to improve classification accuracy.
      The current model achieves over 90% accuracy on unseen test data.`,
    location: {
      longitude: -105.2705,
      latitude: 40.015,
      locationType: 'physical',
      locationName: 'Research Aviation Facility'
    },
    category: 'professional',
    technologies: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'Scikit-learn'],
    links: {
      github: 'https://github.com/yourusername/ml-weather'
    },
    images: [c130],
    startDate: '2025-08-01',
    featured: false,
    color: '#90BE6D'
  },
  {
    id: 'climate-threads',
    title: 'Climate Threads',
    shortDescription: 'Geospatial analysis of urban air quality and socioeconomic factors',
    fullDescription: `Collaborative project with MS cohort to apply creative technology and design techniques to climate justice and health.
    Conducted geospatial analysis of air quality from the TROPOMI satellites, and socioeconomic data to identify vulnerable communities disproportionately affected by climate change in the Denver metro area.
    Developed a physical knitted scarf to visualize air quality in two census tracts in Denver and Boulder to display the intersection of climate data and social justice through tactile media.`,
    location: {
      longitude: -104.9903,
      latitude: 39.7392,
      locationType: 'physical',
      locationName: 'Denver, CO'
    },
    category: 'academic',
    technologies: ['Python', 'GeoPandas', 'Rasterio', 'JavaScript', 'Leaflet'],
    links: {
      github: 'https://github.com/sararunkel/tempo-site',
      live: 'https://tempo-site.vercel.app/'
    },
    images: [climateThreads],
    startDate: '2025-08-25',
    endDate: "2025-12-15",
    featured: true,
    color: '#F94144'
  }
];

// Helper functions
export const getProjectsByTechnology = (tech: string): Project[] =>
  projects.filter(p => p.technologies.includes(tech));

export const getProjectsByCategory = (category: Project['category']): Project[] =>
  projects.filter(p => p.category === category);

export const getFeaturedProjects = (): Project[] =>
  projects.filter(p => p.featured);

export const getAllTechnologies = (): string[] => {
  const techSet = new Set<string>();
  projects.forEach(p => p.technologies.forEach(t => techSet.add(t)));
  return Array.from(techSet).sort();
};
