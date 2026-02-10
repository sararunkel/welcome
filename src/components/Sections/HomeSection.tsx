import { FC } from 'react';
import { WorldMapSVG } from '../Map/WorldMapSVG';
import './Section.css';

export const HomeSection: FC = () => {
  return (
    <section id="home" className="section section--home">
      <WorldMapSVG />
    </section>
  );
};
