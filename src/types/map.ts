export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  transitionDuration?: number;
}

export interface LayerVisibility {
  professional: boolean;
  academic: boolean;
  personal: boolean;
}

export interface FilterState {
  technologies: string[];
  categories: string[];
}
