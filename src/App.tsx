import { ThemeProvider } from './context/ThemeContext';
import { MapProvider } from './context/MapContext';
import { MapContainer } from './components/Map';
import {
  Header,
  FilterBar,
  TimeSlider,
  Sidebar,
  AboutModal,
  AmbientBackground,
  PhotoLightbox,
  Gallery
} from './components/UI';

function App() {
  return (
    <ThemeProvider>
      <MapProvider>
        <div className="app">
          <Header />
          <main className="main">
            <div className="map-wrapper">
              <AmbientBackground />
              <MapContainer />
              <FilterBar />
              <TimeSlider />
            </div>
            <Sidebar />
          </main>
          <AboutModal />
          <PhotoLightbox />
          <Gallery />
        </div>
      </MapProvider>
    </ThemeProvider>
  );
}

export default App;
