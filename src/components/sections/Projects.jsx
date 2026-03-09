import { useState } from 'react';
import Reveal from '../ui/Reveal';
import ProjectModal from '../projects/ProjectModal';
import { projects } from '../../data/portfolioData';
import s from './Projects.module.css';

const TYPE_COLORS = {
  research: '#f9a825',
  vision: '#00d9ff',
  llm: '#7c3aed',
};
const TYPE_LABELS = { research: 'Research', vision: 'Computer Vision', llm: 'LLM / Agents' };

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section section-alt" id="projects">
      <div className="section-inner">
        <div className="section-label">Portfolio</div>
        <h2 className="section-h2">Featured Projects</h2>
        <div className={s.grid}>
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <button className={s.card} onClick={() => setSelected(p)} aria-label={`View ${p.title}`}>
                <div className={s.cardTop}>
                  <span className={s.num}>{p.num}</span>
                  <span
                    className={s.typeBadge}
                    style={{ color: TYPE_COLORS[p.type], borderColor: `${TYPE_COLORS[p.type]}44` }}
                  >
                    {TYPE_LABELS[p.type]}
                  </span>
                </div>
                <div className={s.title}>{p.title}</div>
                <p className={s.desc}>{p.shortDesc}</p>
                <div className={s.tech}>
                  {p.tech.slice(0, 5).map(t => (
                    <span className="tech-badge" key={t}>{t}</span>
                  ))}
                  {p.tech.length > 5 && (
                    <span className={s.more}>+{p.tech.length - 5}</span>
                  )}
                </div>
                <div className={s.viewBtn}>
                  <span>View Project</span>
                  <span className={s.arrow}>→</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
