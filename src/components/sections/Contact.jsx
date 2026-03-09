import Reveal from '../ui/Reveal';
import { personalInfo } from '../../data/portfolioData';
import s from './Contact.module.css';

const LINKS = [
  { icon: '✉', label: p => p.email, href: p => `mailto:${p.email}` },
  { icon: 'in', label: () => 'LinkedIn Profile', href: p => p.linkedin },
  { icon: 'gh', label: () => 'GitHub Profile', href: p => p.github },
  { icon: '☎', label: p => p.phone, href: p => `tel:${p.phone}` },
];

export default function Contact() {
  const p = personalInfo;
  return (
    <section className="section section-alt" id="contact">
      <div className="section-inner">
        <div className="section-label">Let's Connect</div>
        <h2 className="section-h2">Get In Touch</h2>
        <div className={s.grid}>
          <div>
            <p className={s.intro}>
              I'm currently open to new opportunities in AI/ML engineering.<br />
              Whether you have a project, a role, or just want to talk shop —<br />
              feel free to reach out.
            </p>
            <div className={s.links}>
              {LINKS.map(l => (
                <a key={l.label(p)} className={s.link} href={l.href(p)} target="_blank" rel="noreferrer">
                  <div className={s.icon}>{l.icon}</div>
                  <span>{l.label(p)}</span>
                </a>
              ))}
            </div>
          </div>
          <Reveal>
            <div className={s.big}>
              LET'S<br />BUILD<br /><span className={s.hl}>SOMETHING</span><br />GREAT.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
