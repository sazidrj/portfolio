import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../ui/Reveal';
import ProjectModal from '../projects/ProjectModal';
import { projects } from '../../data/portfolioData';
import s from './Projects.module.css';

const TYPE_COLORS = { research: '#f9a825', vision: '#00d9ff', llm: '#7c3aed' };
const TYPE_LABELS = { research: 'Research', vision: 'Computer Vision', llm: 'LLM / Agents' };
const FILTERS = ['All', 'Research', 'Vision'];

function TiltCard({ children, className, onClick, ariaLabel }) {
  const [style, setStyle] = useState({});
  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 10}deg) scale3d(1.02,1.02,1.02)`,
      '--gx': `${x * 100}%`,
      '--gy': `${y * 100}%`,
    });
  }, []);
  const onLeave = useCallback(() => {
    setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)' });
  }, []);

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}
      onMouseMove={onMove} onMouseLeave={onLeave} style={style}
    >
      {children}
    </button>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.type === filter.toLowerCase());

  return (
    <section className="section section-alt" id="projects">
      <div className="section-inner">
        <div className="section-label">Portfolio</div>
        <h2 className="section-h2">Featured Projects</h2>

        {/* Filter tabs */}
        <div className={s.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${s.filterBtn} ${filter === f ? s.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className={s.grid}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 55}>
                <TiltCard
                  className={s.card}
                  onClick={() => setSelected(p)}
                  ariaLabel={`View ${p.title}`}
                >
                  {/* Top gradient bar */}
                  <div className={s.topBar} style={{ background: TYPE_COLORS[p.type] }} />
                  {/* Glare overlay */}
                  <div className={s.glare} />

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
                    {p.tech.slice(0, 5).map(t => <span className="tech-badge" key={t}>{t}</span>)}
                    {p.tech.length > 5 && <span className={s.more}>+{p.tech.length - 5}</span>}
                  </div>
                  <div className={s.viewBtn}>
                    <span>View Project</span>
                    <span className={s.arrow}>→</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
