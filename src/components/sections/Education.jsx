import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '../../data/portfolioData';
import s from './Education.module.css';

export default function Education() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section" id="education">
      <div className="section-inner">
        <div className="section-label">Academic</div>
        <h2 className="section-h2">Education</h2>
        <div ref={ref} className={s.grid}>
          {education.map((e, i) => (
            <motion.div
              key={e.id}
              className={s.card}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16,1,0.3,1] }}
              style={{ '--ec': e.color }}
            >
              <div className={s.iconBadge} style={{ color: e.color, borderColor: `${e.color}30`, background: `${e.color}10` }}>
                {e.icon}
              </div>
              <div className={s.degree}>{e.degree}</div>
              <div className={s.school} style={{ color: e.color }}>{e.school}</div>
              <div className={s.meta}>{e.period} · {e.location}</div>
              <div className={s.accent} style={{ background: e.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
