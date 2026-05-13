import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import s from './Loader.module.css';

const LINES = [
  '> initializing portfolio...',
  '> loading 3d assets...',
  '> compiling shaders...',
  '> establishing connections...',
  '> welcome.',
];

export default function Loader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('sa_loader')) {
      onComplete();
      return;
    }

    let i = 0;
    const addLine = () => {
      if (i < LINES.length) {
        setLines(prev => [...prev, LINES[i]]);
        setProgress(Math.round(((i + 1) / LINES.length) * 100));
        i++;
        setTimeout(addLine, i === LINES.length ? 200 : 380);
      } else {
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem('sa_loader', '1');
          setTimeout(onComplete, 700);
        }, 300);
      }
    };

    setTimeout(addLine, 400);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className={s.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          <div className={s.terminal}>
            <div className={s.chrome}>
              <span className={s.dot} style={{ background: '#ff5f57' }} />
              <span className={s.dot} style={{ background: '#febc2e' }} />
              <span className={s.dot} style={{ background: '#28c840' }} />
              <span className={s.chromeTitle}>~/sazid_ali — portfolio</span>
            </div>
            <div className={s.body}>
              <div className={s.name}>SAZID ALI</div>
              <div className={s.sub}>AI / ML Engineer</div>
              <div className={s.divider} />
              <div className={s.lines}>
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    className={s.line}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className={s.lineText}>{line}</span>
                    {i === lines.length - 1 && <span className={s.cursor}>█</span>}
                  </motion.div>
                ))}
              </div>
              <div className={s.progressWrap}>
                <div className={s.progressBar} style={{ width: `${progress}%` }} />
              </div>
              <div className={s.progressNum}>{progress}%</div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
