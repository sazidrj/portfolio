import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillsOrb from '../3d/SkillsOrb';
import { skills, stats } from '../../data/portfolioData';
import s from './Skills.module.css';

export default function Skills() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      <SkillsOrb />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">Expertise</div>
        <h2 className="section-h2">Technical Skills</h2>

        <div ref={ref} className={s.grid}>
          {skills.map((group, gi) => (
            <motion.div
              key={group.label}
              className={s.group}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: gi * 0.09, ease: [0.16,1,0.3,1] }}
            >
              <div className={s.groupHeader}>
                <span className={s.groupDot} style={{ background: group.color, boxShadow: `0 0 8px ${group.color}88` }} />
                <span className={s.groupLabel} style={{ color: group.color }}>{group.label}</span>
              </div>
              <div className={s.tags}>
                {group.tags.map((t, ti) => (
                  <motion.span
                    key={t}
                    className={s.tag}
                    style={{ '--hc': group.color }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: gi * 0.09 + ti * 0.03 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className={s.statsRow}>
          {stats.map((st, i) => (
            <motion.div
              key={st.label}
              className={s.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <span className={s.statNum}>{st.num}</span>
              <span className={s.statLabel}>{st.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
