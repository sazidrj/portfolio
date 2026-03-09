import { useEffect } from 'react';
import JpegDemo from './JpegDemo';
import MorphingDemo from './MorphingDemo';
import HighlightsDemo from './HighlightsDemo';
import ImageSlider from './ImageSlider';
import s from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const renderMedia = () => {
    switch (project.media?.type) {
      case 'jpeg-demo': return <JpegDemo examples={project.media.examples} />;
      case 'morphing': return (
          <MorphingDemo
            sourceA={project.media.sourceA}
            sourceB={project.media.sourceB}
            gif={project.media.gif}
            strip={project.media.strip}
            fromLabel={project.media.fromLabel}
            toLabel={project.media.toLabel}
            frames={project.media.frames}
            duration={project.media.duration}
          />
        );
      case 'image-slider': return <ImageSlider slides={project.media.slides} />;
      default: return <HighlightsDemo highlights={project.highlights} />;
    }
  };

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <span className={s.num}>{project.num} / Project</span>
            <span className={s.period}>{project.period}</span>
          </div>
          <button className={s.close} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className={s.body}>
          {/* Left column */}
          <div className={s.left}>
            <h2 className={s.title}>{project.title}</h2>
            <p className={s.desc}>{project.longDesc}</p>

            <div className={s.section}>
              <div className={s.sectionLabel}>Tech Stack</div>
              <div className={s.techList}>
                {project.tech.map(t => <span className="tech-badge" key={t}>{t}</span>)}
              </div>
            </div>

            <div className={s.section}>
              <div className={s.sectionLabel}>Key Highlights</div>
              <ul className={s.highlights}>
                {project.highlights.map((h, i) => (
                  <li key={i}><span className={s.bullet}>▸</span>{h}</li>
                ))}
              </ul>
            </div>

            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline" style={{marginTop:'1.5rem', display:'inline-block'}}>
                View on GitHub →
              </a>
            )}
          </div>

          {/* Right column — media */}
          <div className={s.right}>
            <div className={s.sectionLabel} style={{marginBottom:'1.5rem'}}>
              {project.media?.type === 'jpeg-demo' ? 'Quality Comparison' :
               project.media?.type === 'morphing' ? 'Morphing Animations' : project.media?.type === 'image-slider' ? 'Results & Visualizations' : 'Project Details'}
            </div>
            {renderMedia()}
          </div>
        </div>
      </div>
    </div>
  );
}