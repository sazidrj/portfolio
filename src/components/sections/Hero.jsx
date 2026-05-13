import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroScene from '../3d/HeroScene';
import { personalInfo, roles, stats } from '../../data/portfolioData';
import s from './Hero.module.css';

const easeOut = { type: 'spring', damping: 22, stiffness: 120 };

export default function Hero() {
  const [first, last] = personalInfo.name.split(' ');
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    const speed = deleting ? 42 : 88;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < target.length) {
          setDisplayed(target.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 2200);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIdx(i => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  return (
    <section className={s.hero} id="hero">
      {/* 3D scene — right panel */}
      <div className={s.sceneWrap}>
        <HeroScene />
      </div>

      {/* Left-to-right gradient so text stays readable */}
      <div className={s.fadeOverlay} />

      {/* Content */}
      <div className={s.inner}>
        <div className={s.content}>
          {/* Availability badge */}
          <motion.div
            className={s.badge}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOut, delay: 0.1 }}
          >
            <span className={s.pulseDot} />
            Available for Work
          </motion.div>

          {/* Name */}
          <motion.h1
            className={s.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOut, delay: 0.2 }}
          >
            <span className={s.first}>{first}</span>
            <br />
            <span className={s.last}>{last}</span>
            <span className={s.period}>.</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            className={s.roleRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOut, delay: 0.35 }}
          >
            <span className={s.prompt}>&gt;&nbsp;</span>
            <span className={s.typewriter}>{displayed}</span>
            <span className={s.cursor}>█</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className={s.tagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOut, delay: 0.45 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA */}
          <motion.div
            className={s.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOut, delay: 0.55 }}
          >
            <a href="#projects" className="btn-primary">
              View Projects <span>→</span>
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className={s.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            {stats.map((st, i) => (
              <div key={i} className={s.stat}>
                <span className={s.statNum}>{st.num}</span>
                <span className={s.statLabel}>{st.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={s.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className={s.scrollLine} />
          <span className={s.scrollLabel}>scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
