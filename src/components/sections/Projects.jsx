import { useState, useCallback } from 'react';
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

function TiltCard({ children, className, onClick, ariaLabel }) {
  const [style, setStyle] = useState({});

  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      '--glare-x': `${glareX}%`,
      '--glare-y': `${glareY}%`,
      '--glare-opacity': '1',
    });
  }, []);

  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      '--glare-x': '50%',
      '--glare-y': '50%',
      '--glare-opacity': '0',
    });
  }, []);

  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
    >
      {children}
    </button>
  );
}

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
              <TiltCard
                className={s.card}
                onClick={() => setSelected(p)}
                ariaLabel={`View ${p.title}`}
              >
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
              </TiltCard>
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
