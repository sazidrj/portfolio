export default function GridBackground() {
  return (
    <div aria-hidden="true" style={{
      position:'fixed', inset:0,
      backgroundImage:'linear-gradient(rgba(0,217,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.03) 1px, transparent 1px)',
      backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0
    }} />
  );
}
