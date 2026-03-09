import Reveal from '../ui/Reveal';
import { experience } from '../../data/portfolioData';
import s from './Experience.module.css';

export default function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="section-inner">
        <div className="section-label">Career</div>
        <h2 className="section-h2">Work Experience</h2>
        <div className={s.grid}>
          {experience.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <div className={s.item}>
                <div className={s.meta}>
                  <div className={s.company}>{e.company}</div>
                  <div className={s.location}>{e.location}</div>
                  <div className={s.period}>{e.period}</div>
                </div>
                <div className={s.detail}>
                  <div className={s.role}>{e.role}</div>
                  <ul className={s.bullets}>
                    {e.bullets.map((b, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: b }} />
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
