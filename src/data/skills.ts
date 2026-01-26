import { Skill } from '../types';

export const skills: Skill[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'language',
    proficiency: 'expert',
    relatedProjects: ['ncar-raf', 'atlas-practicum', 'ml-weather', 'geospatial-analysis', 'climate-dashboard']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'language',
    proficiency: 'expert',
    relatedProjects: ['ncar-raf', 'geospatial-analysis']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'language',
    proficiency: 'proficient',
    relatedProjects: ['atlas-practicum', 'climate-dashboard']
  },
  {
    id: 'react',
    name: 'React',
    category: 'framework',
    proficiency: 'learning',
    relatedProjects: ['atlas-practicum', 'climate-dashboard']
  },
  {
    id: 'd3',
    name: 'D3.js',
    category: 'framework',
    proficiency: 'proficient',
    relatedProjects: ['ncar-raf', 'atlas-practicum', 'climate-dashboard']
  },
  {
    id: 'maplibre',
    name: 'MapLibre GL',
    category: 'framework',
    proficiency: 'proficient',
    relatedProjects: ['ncar-raf']
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'framework',
    proficiency: 'proficient',
    relatedProjects: ['ml-weather']
  },
  {
    id: 'data-viz',
    name: 'Data Visualization',
    category: 'domain',
    proficiency: 'expert',
    relatedProjects: ['ncar-raf', 'atlas-practicum', 'climate-dashboard', 'geospatial-analysis']
  },
  {
    id: 'geospatial',
    name: 'Geospatial Analysis',
    category: 'domain',
    proficiency: 'expert',
    relatedProjects: ['ncar-raf', 'geospatial-analysis', 'climate-dashboard']
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'domain',
    proficiency: 'proficient',
    relatedProjects: ['ml-weather']
  },
  {
    id: 'climate',
    name: 'Climate Science',
    category: 'domain',
    proficiency: 'proficient',
    relatedProjects: ['ncar-raf', 'climate-dashboard', 'geospatial-analysis']
  }
];

export const getSkillsByCategory = (category: Skill['category']): Skill[] =>
  skills.filter(s => s.category === category);

export const getSkillsForProject = (projectId: string): Skill[] =>
  skills.filter(s => s.relatedProjects.includes(projectId));
