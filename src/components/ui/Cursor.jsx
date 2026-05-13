import { useEffect, useRef } from 'react';
import s from './Cursor.module.css';

export default function Cursor() {
  const dotRef = useRef();
  const ringRef = useRef();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnterBtn = () => ring.classList.add(s.hover);
    const onLeaveBtn = () => ring.classList.remove(s.hover);

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    const updateListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterBtn);
        el.addEventListener('mouseleave', onLeaveBtn);
      });
    };
    updateListeners();

    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={s.dot} />
      <div ref={ringRef} className={s.ring} />
    </>
  );
}
