import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('button, a, input, textarea, select, [role="button"], .interactive-node')
      );
      const isBtn = Boolean(target.closest('button, [role="button"], .primary-magnetic-btn'));

      setIsPointer(isInteractive);
      setIsButton(isBtn);
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);
    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [isVisible]);

  // Smooth lerp animation for the trailing ring
  useEffect(() => {
    if (isTouchDevice) return;
    let animId: number;

    const loop = () => {
      setPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.22,
        y: prev.y + (targetPos.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetPos, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision small dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-[#00629B] transition-transform duration-75 ease-out"
        style={{
          width: '6px',
          height: '6px',
          transform: `translate3d(${targetPos.x - 3}px, ${targetPos.y - 3}px, 0) scale(${isClicking ? 0.6 : 1})`,
          opacity: 0.95
        }}
      />

      {/* Trailing reaction ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#00629B]/40 transition-all duration-150 ease-out"
        style={{
          width: isButton ? '36px' : isPointer ? '28px' : '18px',
          height: isButton ? '36px' : isPointer ? '28px' : '18px',
          transform: `translate3d(${pos.x - (isButton ? 18 : isPointer ? 14 : 9)}px, ${
            pos.y - (isButton ? 18 : isPointer ? 14 : 9)
          }px, 0) scale(${isClicking ? 1.4 : 1})`,
          borderColor: isButton ? 'rgba(0, 98, 155, 0.7)' : isPointer ? 'rgba(2, 132, 199, 0.5)' : 'rgba(0, 98, 155, 0.25)',
          backgroundColor: isButton ? 'rgba(0, 98, 155, 0.05)' : 'transparent'
        }}
      />
    </>
  );
};
