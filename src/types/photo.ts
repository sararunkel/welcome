export interface Photo {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  description?: string;
  location: {
    longitude: number;
    latitude: number;
    name: string;
    region: string;  // For ambient backgrounds: 'colorado', 'west-coast', 'iceland', etc.
  };
  category: 'landscape' | 'street' | 'portrait' | 'nature' | 'urban' | 'travel';
  dateTaken?: string;
  camera?: string;
  featured: boolean;  // Featured photos can be used as ambient backgrounds
}

export interface PhotoRegion {
  id: string;
  name: string;
  bounds: {
    minLon: number;
    maxLon: number;
    minLat: number;
    maxLat: number;
  };
  photos: string[];  // Photo IDs for ambient backgrounds in this region
}
