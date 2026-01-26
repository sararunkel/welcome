import { useMemo } from 'react';
import { useMap } from '../../context/MapContext';
import { projects } from '../../data/projects';
import './TimeSlider.css';

export function TimeSlider() {
  const { dateRange, currentDate, setCurrentDate } = useMap();
  const [minDate, maxDate] = dateRange;

  const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
  const currentDays = (currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value, 10);
    const newDate = new Date(minDate.getTime() + days * 24 * 60 * 60 * 1000);
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Tick marks for each project start date
  const projectTicks = useMemo(() => {
    return projects.map(p => {
      const pDate = new Date(p.startDate);
      const pDays = (pDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
      const position = Math.max(0, Math.min(100, (pDays / totalDays) * 100));
      return { id: p.id, position, title: p.title };
    });
  }, [minDate, totalDays]);

  const visibleProjects = projects.filter(p => new Date(p.startDate) <= currentDate).length;

  return (
    <div className="time-slider">
      <div className="time-slider__header">
        <label className="time-slider__label">
          Career Timeline
        </label>
        <span className="time-slider__date">
          {formatDate(currentDate)} ({visibleProjects} projects)
        </span>
      </div>
      <div className="time-slider__track">
        <input
          type="range"
          min={0}
          max={Math.floor(totalDays)}
          value={Math.floor(currentDays)}
          onChange={handleChange}
          className="time-slider__input"
          aria-label="Timeline slider"
        />
        <div className="time-slider__ticks">
          {projectTicks.map(tick => (
            <div
              key={tick.id}
              className="time-slider__tick"
              style={{ left: `${tick.position}%` }}
              title={tick.title}
            />
          ))}
        </div>
      </div>
      <div className="time-slider__labels">
        <span>{formatDate(minDate)}</span>
        <span>Present</span>
      </div>
    </div>
  );
}
