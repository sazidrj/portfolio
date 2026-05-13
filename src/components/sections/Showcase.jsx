import { useState, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from '../ui/Reveal';
import { showcase } from '../../data/portfolioData';
import s from './Showcase.module.css';

function BrowserCard({ site, index }) {
  const [tilt, setTilt] = useState({});
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const onMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      transform: `perspective(900px) rotateX(${(y - 0.5) * -9}deg) rotateY(${(x - 0.5) * 11}deg) scale3d(1.025,1.025,1.025)`,
    });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ transform: 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)' });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={s.card}
      style={tilt}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Browser chrome */}
      <div className={s.chrome}>
        <span className={s.dot} style={{ background: '#ff5f57' }} />
        <span className={s.dot} style={{ background: '#febc2e' }} />
        <span className={s.dot} style={{ background: '#28c840' }} />
        <div className={s.urlBar}>
          <span className={s.urlLock}>🔒</span>
          <span className={s.urlText}>{site.url}</span>
        </div>
      </div>

      {/* Preview */}
      <div className={s.preview} style={{ background: `linear-gradient(135deg, ${site.color1}, ${site.color2})` }}>
        <div className={s.previewGrid} />
        <div className={s.previewCenter}>
          <span className={s.previewIcon}>{'</>'}</span>
        </div>
        <div className={s.previewFade} />
      </div>

      {/* Body */}
      <div className={s.body}>
        <div className={s.row}>
          <span className={s.title}>{site.title}</span>
          <span className={`${s.badge} ${s[site.status]}`}>
            {site.status === 'live' ? '● Live' : '○ Soon'}
          </span>
        </div>
        <p className={s.desc}>{site.desc}</p>
        <div className={s.tech}>
          {site.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  return (
    <section className="section section-alt" id="showcase">
      <div className="section-inner">
        <div className="section-label">Freelance Work</div>
        <h2 className="section-h2">Featured Builds</h2>
        <p className={s.sub}>
          Websites and applications built for clients and personal projects.<br />
          More live work coming soon — reach out to collaborate.
        </p>

        <div className={s.grid}>
          {showcase.map((site, i) => (
            <BrowserCard key={site.id} site={site} index={i} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className={s.cta}>
            <div className={s.ctaLeft}>
              <p className={s.ctaHeading}>Have a project in mind?</p>
              <p className={s.ctaSub}>I build fast, production-ready websites and web apps.</p>
            </div>
            <a href="#contact" className="btn-primary">Let's Build It →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
