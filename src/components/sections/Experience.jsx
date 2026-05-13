import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import s from './Experience.module.css';

function Card({ item, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={s.item}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline dot */}
      <div className={s.dotWrap}>
        <div className={s.dotCore} style={{ background: item.color, boxShadow: `0 0 10px ${item.color}88` }} />
        <div className={s.dotRing} style={{ borderColor: `${item.color}44` }} />
      </div>

      {/* Card */}
      <div className={s.card} style={{ '--hue': item.color }}>
        <div className={s.cardHeader}>
          <div className={s.initial} style={{ color: item.color, borderColor: `${item.color}30`, background: `${item.color}10` }}>
            {item.company[0]}
          </div>
          <div className={s.meta}>
            <div className={s.company}>{item.company}</div>
            <div className={s.location}>{item.location}</div>
          </div>
          <div className={s.period}>{item.period}</div>
        </div>

        <div className={s.role} style={{ color: item.color }}>{item.role}</div>

        <ul className={s.bullets}>
          {item.bullets.map((b, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: b }} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="section-inner">
        <div className="section-label">Career</div>
        <h2 className="section-h2">Work Experience</h2>
        <div className={s.timeline}>
          <div className={s.line} />
          {experience.map((e, i) => <Card key={e.id} item={e} index={i} />)}
        </div>
      </div>
    </section>
  );
}
