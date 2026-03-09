import Reveal from '../ui/Reveal';
import { education } from '../../data/portfolioData';
import s from './Education.module.css';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="section-inner">
        <div className="section-label">Academic</div>
        <h2 className="section-h2">Education</h2>
        <Reveal>
          <div className={s.grid}>
            {education.map(e => (
              <div className={s.card} key={e.id}>
                <div className={s.degree}>{e.degree}</div>
                <div className={s.school}>{e.school}</div>
                <div className={s.period}>{e.period} · {e.location}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
