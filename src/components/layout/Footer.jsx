import { personalInfo } from '../../data/portfolioData';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <p className={s.copy}>© 2025 {personalInfo.name} — Built with intention.</p>
      <p className={s.sub}>AI/ML Engineer · {personalInfo.location}</p>
    </footer>
  );
}
