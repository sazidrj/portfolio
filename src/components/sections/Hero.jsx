import Reveal from '../ui/Reveal';
import HeroScene from '../3d/HeroScene';
import { personalInfo } from '../../data/portfolioData';
import s from './Hero.module.css';

export default function Hero() {
  const [first, last] = personalInfo.name.split(' ');
  return (
    <section className={s.hero} id="hero">
      {/* 3D knowledge graph — full section background */}
      <div className={s.sceneBg}>
        <HeroScene />
      </div>

      <div className={s.inner}>
        <Reveal>
          <div className={s.tag}>{personalInfo.title}</div>
          <h1 className={s.h1}>
            {first}<br/>
            <span className={s.accent}>{last}</span>
            <span className={s.dim}>.</span>
          </h1>
          <p className={s.desc}>{personalInfo.tagline}</p>
          <div className={s.cta}>
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-outline">Get In Touch</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
