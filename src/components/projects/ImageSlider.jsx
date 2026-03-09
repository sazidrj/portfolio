import { useState } from 'react';
import s from './ImageSlider.module.css';

export default function ImageSlider({ slides }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + slides.length) % slides.length);
  const next = () => setActive(i => (i + 1) % slides.length);

  return (
    <div className={s.root}>

      {/* ── Main image ── */}
      <div className={s.imageWrap}>
        <img
          key={active}
          src={slides[active].src}
          alt={slides[active].title}
          className={s.image}
        />
        <button className={`${s.navBtn} ${s.navPrev}`} onClick={prev} aria-label="Previous">‹</button>
        <button className={`${s.navBtn} ${s.navNext}`} onClick={next} aria-label="Next">›</button>
        <div className={s.titleBadge}>{slides[active].title}</div>
        <div className={s.counter}>{active + 1} / {slides.length}</div>
      </div>

      {/* ── Dot indicators ── */}
      <div className={s.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${s.dot} ${i === active ? s.dotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Thumbnail strip ── */}
      <div className={s.thumbs}>
        {slides.map((sl, i) => (
          <button
            key={i}
            className={`${s.thumb} ${i === active ? s.thumbActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={sl.title}
          >
            <img src={sl.src} alt={sl.title} className={s.thumbImg} />
            <div className={s.thumbLabel}>{sl.title}</div>
          </button>
        ))}
      </div>

    </div>
  );
}