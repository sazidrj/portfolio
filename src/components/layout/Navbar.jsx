import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import s from './Navbar.module.css';

const NAV_ITEMS = ['experience', 'skills', 'projects', 'showcase', 'education', 'contact'];

export default function Navbar() {
  const active = useScrollSpy(NAV_ITEMS);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}>
        <a href="#hero" className={s.logo}>
          <span className={s.slash}>~/</span>sazid_ali
        </a>

        <ul className={s.links}>
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${s.link} ${active === id ? s.active : ''}`}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>

        <div className={s.actions}>
          <a
            className={s.resumeBtn}
            href="https://github.com/sazidrj"
            target="_blank"
            rel="noreferrer"
          >
            <span className={s.resumeText}>GitHub</span>
            <span className={s.resumeArrow}>↗</span>
          </a>
          <button
            className={`${s.burger} ${mobileOpen ? s.burgerOpen : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={s.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className={s.mobilePanel}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={s.mobileHeader}>
                <span className={s.mobileLogo}><span className={s.slash}>~/</span>sazid_ali</span>
                <button className={s.closeBtn} onClick={() => setMobileOpen(false)}>✕</button>
              </div>
              <nav className={s.mobileLinks}>
                {NAV_ITEMS.map((id, i) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    className={`${s.mobileLink} ${active === id ? s.mobileLinkActive : ''}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <span className={s.mobileNum}>0{i + 1}</span>
                    <span>{id}</span>
                  </motion.a>
                ))}
              </nav>
              <div className={s.mobileSocials}>
                <a href="https://github.com/sazidrj" target="_blank" rel="noreferrer" className={s.socialLink}>GitHub ↗</a>
                <a href="https://www.linkedin.com/in/sazid-ali-932571159/" target="_blank" rel="noreferrer" className={s.socialLink}>LinkedIn ↗</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
