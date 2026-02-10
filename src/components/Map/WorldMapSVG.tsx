import { FC, useEffect, useRef, useState } from 'react';
import { useMap } from '../../context/MapContext';
import './WorldMapSVG.css';

const DOT_MAPPINGS: Array<{ dotIndex: number; type: string; id: string }> = [
  { dotIndex: 50, type: 'project', id: 'ncar-raf' },
  { dotIndex: 100, type: 'project', id: 'climate-threads' },
  { dotIndex: 150, type: 'project', id: 'ml-weather' },
  { dotIndex: 25, type: 'project', id: 'atlas-practicum' },
];

export const WorldMapSVG: FC = () => {
  const svgRef = useRef<HTMLDivElement>(null);
  // ref to the generated SVG group that contains the marker and foreignObject
  const locationGroupRef = useRef<SVGGElement | null>(null);
  const sunValleyDotRef = useRef<SVGPathElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { selectProject } = useMap();
  const [showIntro, setShowIntro] = useState(true);
  // capture initial showIntro so the one-time SVG injection can read it
  const initialShowIntroRef = useRef<boolean>(showIntro);

  // Map of dots is defined above as DOT_MAPPINGS

  // We will compute the marker once (SVG coordinate space) and inject an SVG group
  // containing the marker + intro foreignObject. This keeps them inside the SVG
  // so they scale/move together without recalculating on each resize.

  useEffect(() => {
    const hostEl = svgRef.current;

    const loadSVG = async () => {
      try {
        const response = await fetch('/World Map.svg');
        const svgText = await response.text();

        if (svgRef.current) {
          svgRef.current.innerHTML = svgText;

          // Find all paths and set up interactions
          const paths = svgRef.current.querySelectorAll('path');
          let foundSunValley = false;

          // We'll collect dot centers so we can implement a proximity hover
          // that highlights multiple dots when the pointer is nearby.
          const dotCenters: Array<{ el: SVGPathElement; cx: number; cy: number }> = [];

          paths.forEach((path, index) => {
            path.classList.add('map-dot');

            // Check for Sun Valley dot by path data (specific location)
            const pathData = path.getAttribute('d');
            const fill = path.getAttribute('fill');
            if (pathData && pathData.startsWith('M220.16 448.516') && fill?.toLowerCase() === '#ff412f') {
              sunValleyDotRef.current = path as SVGPathElement;
              path.classList.add('sun-valley-dot');
              foundSunValley = true;
              console.log('Found Sun Valley dot at index:', index, 'with path:', pathData);
              return; // Skip adding interactive class to this dot
            }

            // Check if this dot has a mapping
            const mapping = DOT_MAPPINGS.find((m) => m.dotIndex === index);

            if (mapping) {
              path.classList.add('map-dot--interactive');
              path.style.cursor = 'pointer';

              path.addEventListener('click', () => {
                if (mapping.type === 'project') {
                  selectProject(mapping.id);
                }
                // TODO: Handle photo clicks when PhotoModal is implemented
              });
            }

            // Capture the path center for proximity highlighting. Use getBBox()
            // to compute an approximate center in SVG coordinates.
            try {
              const bbox = (path as SVGPathElement).getBBox();
              const cx = bbox.x + bbox.width / 2;
              const cy = bbox.y + bbox.height / 2;
              dotCenters.push({ el: path as SVGPathElement, cx, cy });
            } catch {
              // getBBox can throw in some edge cases; ignore those paths.
            }
          });

          if (!foundSunValley) {
            console.warn('Sun Valley dot not found! Searching all #FF412F dots...');
            paths.forEach((path) => {
              const fill = path.getAttribute('fill');
              if (fill?.toLowerCase() === '#ff412f') {
                console.log('Found #FF412F dot with path:', path.getAttribute('d'));
              }
            });
          }

          setIsLoaded(true);

          // Attach a proximity hover handler with distance-based scaling.
          // Dots closer to the pointer get a stronger effect; dots farther away
          // get a weaker effect, creating a smooth gradient of interaction.
          try {
            const svgEl2 = svgRef.current?.querySelector('svg') as SVGSVGElement | null;
            if (svgEl2 && dotCenters.length) {
              const HOVER_RADIUS = 60; // px in SVG coordinate space
              const svgPoint = svgEl2.createSVGPoint();

              const handleMove = (ev: MouseEvent) => {
                svgPoint.x = ev.clientX;
                svgPoint.y = ev.clientY;
                const ctm = svgEl2.getScreenCTM();
                if (!ctm) return;
                const pt = svgPoint.matrixTransform(ctm.inverse());

                dotCenters.forEach(({ el, cx, cy }) => {
                  const dx = pt.x - cx;
                  const dy = pt.y - cy;
                  const distSq = dx * dx + dy * dy;
                  const dist = Math.sqrt(distSq);

                  if (dist <= HOVER_RADIUS) {
                    // Calculate strength: 1.0 at center, 0.0 at radius edge
                    // Using quadratic easing for smoother falloff
                    const strength = 1 - (dist / HOVER_RADIUS);
                    const easedStrength = strength * strength; // quadratic easing

                    // Apply distance-based transform with scale
                    // Max scale of 1.2 at center, reducing to 1.0 at edge
                    const scale = 1 + (0.2 * easedStrength);
                    const translateY = -2 * easedStrength; // max -2px at center

                    el.style.transform = `translateY(${translateY}px) scale(${scale})`;

                    // Apply filter and stroke with reduced intensity based on distance
                    const shadowIntensity = 0.22 * easedStrength;
                    el.style.filter = `drop-shadow(0 4px 8px rgba(0, 0, 0, ${shadowIntensity}))`;

                    if (easedStrength > 0.5) {
                      el.style.stroke = 'var(--color-coral)';
                      el.style.strokeWidth = `${1 + easedStrength}px`;
                    } else {
                      el.style.stroke = '';
                      el.style.strokeWidth = '';
                    }

                    el.classList.add('hover-prox');
                  } else {
                    // Reset to default state
                    el.style.transform = '';
                    el.style.filter = '';
                    el.style.stroke = '';
                    el.style.strokeWidth = '';
                    el.classList.remove('hover-prox');
                  }
                });
              };

              const handleLeave = () => {
                dotCenters.forEach(({ el }) => {
                  el.style.transform = '';
                  el.style.filter = '';
                  el.style.stroke = '';
                  el.style.strokeWidth = '';
                  el.classList.remove('hover-prox');
                });
              };

              svgEl2.addEventListener('mousemove', handleMove);
              svgEl2.addEventListener('mouseleave', handleLeave);

                (hostEl as unknown as { __dotHoverCleanup?: () => void }).__dotHoverCleanup = () => {
                svgEl2.removeEventListener('mousemove', handleMove);
                svgEl2.removeEventListener('mouseleave', handleLeave);
              };
            }
          } catch (err) {
            console.error('Failed to attach proximity hover:', err);
          }

          // If we found the Sun Valley dot, compute its center in SVG coordinates
          // and inject an SVG <g> containing the marker and a <foreignObject>
          // with the intro box. This only needs to be done once after load.
          if (sunValleyDotRef.current) {
            const svgEl = svgRef.current?.querySelector('svg') as SVGSVGElement | null;
            if (svgEl) {
              try {
                const bbox = sunValleyDotRef.current.getBBox();
                const cx = bbox.x + bbox.width / 2;
                const cy = bbox.y + bbox.height / 2;

                const SVG_NS = 'http://www.w3.org/2000/svg';

                // Create a wrapper group (no transforms) to contain the pin and popup.
                // We'll position the visual elements using absolute SVG coordinates
                // instead of applying transforms to the wrapper.
                const wrapper = document.createElementNS(SVG_NS, 'g');
                wrapper.setAttribute('class', 'location-marker-wrapper');
                wrapper.setAttribute('data-open', initialShowIntroRef.current ? 'true' : 'false');

                // Nested SVG for the pin graphic. We set x/y so the pin tip lands
                // at the desired SVG coordinate (cx, cy). The pin graphic is 24x24
                // and its tip is approximately at (12,22) within that space, so we
                // offset by those values.
                const pinSvg = document.createElementNS(SVG_NS, 'svg');
                pinSvg.setAttribute('x', String(cx - 12));
                pinSvg.setAttribute('y', String(cy - 22));
                pinSvg.setAttribute('width', '24');
                pinSvg.setAttribute('height', '24');
                pinSvg.setAttribute('viewBox', '0 0 24 24');
                pinSvg.setAttribute('class', 'location-pin-svg');

                const pinWrap = document.createElementNS(SVG_NS, 'g');
                pinWrap.setAttribute('class', 'pin-wrap');

                const pin = document.createElementNS(SVG_NS, 'path');
                pin.setAttribute('d', 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
                pin.setAttribute('class', 'svg-location-pin');
                pinWrap.appendChild(pin);
                pinSvg.appendChild(pinWrap);

                // Create a positioned foreignObject for the intro popup using
                // absolute SVG coordinates relative to the main SVG root.
                const POPUP_WIDTH = 300;
                const POPUP_HEIGHT = 160;
                const GAP = 65; // space between popup bottom and pin tip

                // compute popup top so the popup sits fully above the pin
                const popupTopY = cy - POPUP_HEIGHT - GAP;

                const fo = document.createElementNS(SVG_NS, 'foreignObject');
                // center the popup above the marker: x = cx - width/2, y = popupTopY
                fo.setAttribute('x', String(cx - POPUP_WIDTH / 2));
                fo.setAttribute('y', String(popupTopY));
                fo.setAttribute('width', String(POPUP_WIDTH));
                fo.setAttribute('height', String(POPUP_HEIGHT));

                const div = document.createElement('div');
                div.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                div.className = 'intro-text-box svg-foreign';
                div.innerHTML = `<h1>I'm Sara,</h1><h2>A Climate Data Scientist</h2>`;
                fo.appendChild(div);

                // Append pin and popup to the wrapper (no connector)
                wrapper.appendChild(pinSvg);
                wrapper.appendChild(fo);

                // Toggle intro visibility when clicking the pin (pinSvg)
                pinSvg.addEventListener('click', (e) => {
                  e.stopPropagation();
                  const isOpen = wrapper.getAttribute('data-open') === 'true';
                  const next = (!isOpen).toString();
                  wrapper.setAttribute('data-open', next);
                  setShowIntro(!isOpen);
                });

                svgEl.appendChild(wrapper);
                locationGroupRef.current = wrapper;
              } catch (err) {
                console.error('Failed to create SVG marker group:', err);
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to load SVG:', error);
      }
    };

    loadSVG();

    // cleanup: remove any attached SVG listeners when this effect unmounts
    return () => {
      try {
        const cleanup = (hostEl as unknown as { __dotHoverCleanup?: () => void }).__dotHoverCleanup;
        if (cleanup) cleanup();
      } catch {
        /* ignore */
      }
    };
  }, [selectProject]);

  // Sync showIntro state to the injected SVG group so opening/closing via
  // React state keeps the SVG group's data-open attribute in sync.
  useEffect(() => {
    if (locationGroupRef.current) {
      locationGroupRef.current.setAttribute('data-open', showIntro ? 'true' : 'false');
    }
  }, [showIntro]);

  // No continuous resize handling needed because the marker lives inside the SVG
  // and will scale/translate together with it. If you later need to support
  // container transforms outside the SVG, consider a ResizeObserver.

  // Click outside to close intro box (checks the injected SVG group)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!showIntro) return;
      const target = event.target as Node;
      if (locationGroupRef.current && !locationGroupRef.current.contains(target)) {
        setShowIntro(false);
        // ensure the SVG group attribute is synced
        if (locationGroupRef.current) locationGroupRef.current.setAttribute('data-open', 'false');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showIntro]);

  return (
    <div className="world-map-container">
      <div
        ref={svgRef}
        className={`world-map-svg-wrapper ${isLoaded ? 'loaded' : ''}`}
      />

      {/* Marker is injected inside the SVG as an SVG <g> once after load. */}
      {/* ProjectModal is now in App.tsx and shared across all sections */}
    </div>
  );
};
