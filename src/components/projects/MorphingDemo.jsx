import s from './MorphingDemo.module.css';

function Placeholder({ label, hint, spin = false }) {
  return (
    <div className={s.placeholder}>
      <div className={s.placeholderGrid} />
      <span className={`${s.placeholderIcon} ${spin ? s.spin : ''}`}>⟳</span>
      <span className={s.placeholderLabel}>{label}</span>
      {hint && <span className={s.placeholderHint}>/public/projects/morphing/{hint}</span>}
    </div>
  );
}

export default function MorphingDemo({ sourceA, sourceB, gif, strip, fromLabel, toLabel, frames, duration }) {
  return (
    <div className={s.root}>

      {/* ── Section 1: Source images side by side ── */}
      <div className={s.sectionLabel}>Source Images</div>
      <div className={s.sources}>
        <div className={s.imgCard}>
          <div className={s.imgCardLabel}>{fromLabel}</div>
          {sourceA
            ? <img src={sourceA} alt={fromLabel} className={s.sourceImg} />
            : <Placeholder label={fromLabel} hint="source_a.jpg" />}
        </div>
        <div className={s.arrow}>→</div>
        <div className={s.imgCard}>
          <div className={s.imgCardLabel}>{toLabel}</div>
          {sourceB
            ? <img src={sourceB} alt={toLabel} className={s.sourceImg} />
            : <Placeholder label={toLabel} hint="source_b.jpg" />}
        </div>
      </div>

      {/* ── Section 2: Morphing GIF ── */}
      <div className={s.sectionLabel}>Morphing Animation</div>
      <div className={s.gifWrap}>
        <div className={s.gifBadge}>Auto-loop · GIF</div>
        {gif
          ? <img src={gif} alt={`${fromLabel} → ${toLabel}`} className={s.gifImg} />
          : <Placeholder label="Transition GIF" hint="morph.gif" spin />}
        <div className={s.gifMeta}>
          <span><span className={s.metaKey}>Duration</span> {duration}</span>
          <span><span className={s.metaKey}>Frames</span> {frames}</span>
          <span><span className={s.metaKey}>Loop</span> ∞</span>
        </div>
      </div>

      {/* ── Section 3: Intermediate steps (full width strip) ── */}
      <div className={s.sectionLabel}>
        Intermediate Steps
        <span className={s.frameCount}>{frames} frames</span>
      </div>
      <div className={s.stripWrap}>
        {strip
          ? (
            <>
              <img src={strip} alt="Intermediate morphing frames" className={s.stripImg} />
              <div className={s.stripGrid} style={{ '--cols': frames }} />
              <div className={s.stripLabels}>
                <span className={s.stripEnd}>{fromLabel}</span>
                <span className={s.stripEnd}>{toLabel}</span>
              </div>
            </>
          )
          : <Placeholder label="16-frame intermediate strip" hint="strip.jpg" />}
      </div>

      {/* ── Pipeline ── */}
      <div className={s.pipeline}>
        <span className={s.pipelineLabel}>Pipeline</span>
        <div className={s.pipelineSteps}>
          {['Feature Points', 'Delaunay Mesh', 'Warp Triangles', 'Alpha Blend', 'GIF Export'].map((step, i, arr) => (
            <span key={step} className={s.stepWrap}>
              <span className={s.step}>{step}</span>
              {i < arr.length - 1 && <span className={s.stepArrow}>→</span>}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}