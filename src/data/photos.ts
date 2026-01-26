import { Photo, PhotoRegion } from '../types';

// Dynamically import all JPEG images from the photos directory
const photoModules = import.meta.glob<{ default: string }>(
  '../../public/images/photos/*.jpeg',
  { eager: true }
);

// Build a map of filename to image path
const photoMap: Record<string, string> = {};
Object.entries(photoModules).forEach(([path, module]) => {
  const filename = path.split('/').pop();
  if (filename) {
    photoMap[filename] = module.default;
  }
});

export const photos: Photo[] = [
  // Colorado photos
  {
    id: 'layla-arthur',
    src: photoMap['arthur.jpeg'],
    thumbnail: photoMap['arthur.jpeg'],
    title: 'Arthur and Layla Skiing',
    description: 'Early morning light on the iconic Boulder Flatirons',
    location: {
      longitude: -105.2928,
      latitude: 39.9990,
      name: 'Boulder, CO',
      region: 'colorado'
    },
    category: 'landscape',
    dateTaken: '2024-06-15',
    featured: true
  }
  // Add more photos here as needed
];

// Define regions for ambient background matching
export const photoRegions: PhotoRegion[] = [
  {
    id: 'colorado',
    name: 'Colorado',
    bounds: {
      minLon: -109.5,
      maxLon: -102.0,
      minLat: 36.5,
      maxLat: 41.5
    },
    photos: ['layla-arthur']
  },
  {
    id: 'west-coast',
    name: 'West Coast',
    bounds: {
      minLon: -125.0,
      maxLon: -119.0,
      minLat: 32.0,
      maxLat: 42.0
    },
    photos: []
  },
  {
    id: 'pacific-northwest',
    name: 'Pacific Northwest',
    bounds: {
      minLon: -125.0,
      maxLon: -116.0,
      minLat: 42.0,
      maxLat: 49.0
    },
    photos: []
  },
  {
    id: 'southwest',
    name: 'Southwest',
    bounds: {
      minLon: -115.0,
      maxLon: -103.0,
      minLat: 31.0,
      maxLat: 37.5
    },
    photos: []
  }
];

// Helper functions
export const getPhotosByRegion = (regionId: string): Photo[] =>
  photos.filter(p => p.location.region === regionId);

export const getFeaturedPhotos = (): Photo[] =>
  photos.filter(p => p.featured);

export const getPhotosByCategory = (category: Photo['category']): Photo[] =>
  photos.filter(p => p.category === category);

export const findRegionForCoordinates = (lon: number, lat: number): PhotoRegion | null => {
  return photoRegions.find(region =>
    lon >= region.bounds.minLon &&
    lon <= region.bounds.maxLon &&
    lat >= region.bounds.minLat &&
    lat <= region.bounds.maxLat
  ) || null;
};

export const getRandomPhotoForRegion = (regionId: string): Photo | null => {
  const regionPhotos = photos.filter(p => p.location.region === regionId && p.featured);
  if (regionPhotos.length === 0) return null;
  return regionPhotos[Math.floor(Math.random() * regionPhotos.length)];
};
