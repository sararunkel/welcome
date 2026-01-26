export const MAP_STYLES = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
} as const;

export const INITIAL_VIEW_STATE = {
  longitude: -105.5,
  latitude: 40.0,
  zoom: 6,
  pitch: 45,
  bearing: 0
} as const;

export const CATEGORY_COLORS: Record<string, [number, number, number, number]> = {
  professional: [74, 144, 217, 220],
  academic: [207, 184, 124, 220],
  personal: [144, 190, 109, 220]
} as const;

export const TRANSITION_DURATION = 2000;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const;
