import { personalInfo } from '../../data/portfolioData';
import s from './Footer.module.css';

const LINKS = [
  { label: 'GitHub', href: personalInfo.github },
  { label: 'LinkedIn', href: personalInfo.linkedin },
  { label: 'Email', href: `mailto:${personalInfo.email}` },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.left}>
          <span className={s.logo}><span className={s.slash}>~/</span>sazid_ali</span>
          <span className={s.copy}>© 2025 {personalInfo.name}</span>
        </div>
        <div className={s.center}>
          <span className={s.built}>Built with React · Three.js · Vite</span>
        </div>
        <nav className={s.links}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={s.link}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
