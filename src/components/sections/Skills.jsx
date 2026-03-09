import Reveal from '../ui/Reveal';
import { skills, stats } from '../../data/portfolioData';
import s from './Skills.module.css';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-inner">
        <div className="section-label">Expertise</div>
        <h2 className="section-h2">Technical Skills</h2>
        <Reveal>
          <div className={s.skillsGrid}>
            {skills.map(g => (
              <div className={s.group} key={g.label}>
                <div className={s.groupLabel}>{g.label}</div>
                <div className={s.tags}>
                  {g.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className={s.statsRow}>
            {stats.map(st => (
              <div className={s.statCard} key={st.label}>
                <span className={s.statNum}>{st.num}</span>
                <span className={s.statLabel}>{st.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
