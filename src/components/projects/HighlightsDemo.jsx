import s from './HighlightsDemo.module.css';

export default function HighlightsDemo({ highlights }) {
  return (
    <div className={s.root}>
      {highlights.map((h, i) => (
        <div className={s.item} key={i} style={{ animationDelay: `${i * 100}ms` }}>
          <div className={s.index}>0{i + 1}</div>
          <div className={s.text}>{h}</div>
        </div>
      ))}
    </div>
  );
}
