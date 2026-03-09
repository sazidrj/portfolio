import { useState, useEffect } from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import s from './Navbar.module.css';

const NAV_ITEMS = ['experience','skills','projects','education','contact'];

export default function Navbar() {
  const active = useScrollSpy(NAV_ITEMS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}>
      <a href="#hero" className={s.logo}><span className={s.dim}>~/</span>sazid_ali</a>
      <ul className={s.links}>
        {NAV_ITEMS.map(id => (
          <li key={id}>
            <a href={`#${id}`} className={`${s.link} ${active === id ? s.active : ''}`}>
              {id}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
