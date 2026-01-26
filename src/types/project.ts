export interface ProjectLocation {
  longitude: number;
  latitude: number;
  altitude?: number;
  locationType: 'physical' | 'thematic';
  locationName: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  location: ProjectLocation;
  category: 'professional' | 'academic' | 'personal';
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    paper?: string;
  };
  images: string[];
  startDate: string;
  endDate?: string;
  featured: boolean;
  color?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'domain';
  proficiency: 'learning' | 'proficient' | 'expert';
  relatedProjects: string[];
}
