import { useState, useRef, useCallback } from 'react';
import s from './JpegDemo.module.css';

// ─── Placeholder shown when no image is provided ───────────────────────────
function ImgPlaceholder({ label }) {
  return (
    <div className={s.placeholder}>
      <div className={s.placeholderGrid} />
      <span className={s.placeholderIcon}>⬜</span>
      <span className={s.placeholderLabel}>{label}</span>
      <span className={s.placeholderHint}>Add image to /public/projects/jpeg/</span>
    </div>
  );
}

// ─── Drag-to-compare slider ─────────────────────────────────────────────────
function CompareSlider({ original, encoded, altOrig, altEnc }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) updatePos(e.clientX); };
  const onMouseUp   = () => { dragging.current = false; };
  const onTouchMove = (e) => updatePos(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className={s.slider}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* RIGHT — Encoded (base layer) */}
      <div className={s.sliderFull}>
        {encoded
          ? <img src={encoded} alt={altEnc} className={s.sliderImg} draggable={false} />
          : <ImgPlaceholder label={altEnc} />
        }
        <span className={s.sliderLabel} style={{ right: 10, left: 'auto' }}>ENCODED</span>
      </div>

      {/* LEFT — Original (clipped overlay) */}
      <div className={s.sliderClip} style={{ width: `${pos}%` }}>
        {original
          ? <img src={original} alt={altOrig} className={s.sliderImg} draggable={false} />
          : <ImgPlaceholder label={altOrig} />
        }
        <span className={s.sliderLabel} style={{ left: 10 }}>ORIGINAL</span>
      </div>

      {/* Divider line + handle */}
      <div
        className={s.divider}
        style={{ left: `${pos}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => { dragging.current = true; }}
      >
        <div className={s.handle}>
          <span className={s.handleArrow}>‹</span>
          <span className={s.handleArrow}>›</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main JPEG Demo ─────────────────────────────────────────────────────────
export default function JpegDemo({ examples }) {
  const [active, setActive] = useState(0);
  const ex = examples[active];

  return (
    <div className={s.root}>

      {/* ── Image grid (thumbnails) ── */}
      <div className={s.grid}>
        {examples.map((e, i) => (
          <button
            key={e.label}
            className={`${s.thumb} ${i === active ? s.thumbActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Select ${e.label}`}
          >
            {/* thumbnail: show image if available, else mini placeholder */}
            {e.original
              ? <img src={e.original} alt={e.label} className={s.thumbImg} />
              : (
                <div className={s.thumbPlaceholder}>
                  <div className={s.thumbPlaceholderGrid} />
                  <span className={s.thumbPlaceholderText}>{e.label}</span>
                </div>
              )
            }
            <div className={s.thumbOverlay}>
              <span className={s.thumbLabel}>{e.label}</span>
              <span className={s.thumbQ}>Q{e.quality}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Before / After slider ── */}
      <CompareSlider
        original={ex.original}
        encoded={ex.encoded}
        altOrig={`${ex.placeholder} — Original`}
        altEnc={`${ex.placeholder} — Encoded Q${ex.quality}`}
      />

      <p className={s.hint}>
        <span className={s.hintIcon}>↔</span>
        Drag the divider to compare Original vs Encoded
      </p>

      {/* ── Stats row ── */}
      <div className={s.stats}>
        {[
          { key: 'Quality',     val: `Q${ex.quality}` },
          { key: 'Compression', val: ex.compressionRatio },
          { key: 'PSNR',        val: ex.psnr },
        ].map(st => (
          <div className={s.stat} key={st.key}>
            <span className={s.statVal}>{st.val}</span>
            <span className={s.statKey}>{st.key}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
