import React, { useEffect, useState, useCallback } from 'react';

interface ButtonRipple {
  id: number;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: string;
  };
  clickX: number;
  clickY: number;
  rippleColor: string;
  isDarkButton: boolean;
}

export const SmoothButtonEffects: React.FC = () => {
  const [ripples, setRipples] = useState<ButtonRipple[]>([]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    // Only trigger for primary mouse button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Find closest button or interactive element
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const button = target.closest('button, [role="button"]') as HTMLElement | null;
    if (!button) return;

    // Don't trigger if button is disabled
    if (button.hasAttribute('disabled') || button.getAttribute('aria-disabled') === 'true') {
      return;
    }

    const rect = button.getBoundingClientRect();
    const computed = window.getComputedStyle(button);
    const borderRadius = computed.borderRadius || '24px';
    const bgColor = computed.backgroundColor;

    // Determine if button is dark or light based on RGB or text color
    let isDarkButton = true;
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      // Perceived brightness formula
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      isDarkButton = brightness < 150;
    }

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newRipple: ButtonRipple = {
      id: Date.now() + Math.random(),
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius,
      },
      clickX,
      clickY,
      rippleColor: isDarkButton ? 'rgba(255, 255, 255, 0.35)' : 'rgba(78, 85, 224, 0.22)',
      isDarkButton,
    };

    setRipples((prev) => [...prev.slice(-6), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 550);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [handlePointerDown]);

  if (ripples.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {ripples.map((ripple) => {
        const maxDimension = Math.max(ripple.rect.width, ripple.rect.height);
        const rippleSize = Math.max(maxDimension * 2.4, 120);

        return (
          <div
            key={ripple.id}
            className="absolute overflow-hidden"
            style={{
              top: `${ripple.rect.top}px`,
              left: `${ripple.rect.left}px`,
              width: `${ripple.rect.width}px`,
              height: `${ripple.rect.height}px`,
              borderRadius: ripple.rect.borderRadius,
            }}
          >
            {/* Silky expanding radial wave inside button */}
            <span
              className="absolute rounded-full animate-smooth-button-ripple"
              style={{
                left: `${ripple.clickX}px`,
                top: `${ripple.clickY}px`,
                width: `${rippleSize}px`,
                height: `${rippleSize}px`,
                backgroundColor: ripple.rippleColor,
              }}
            />

            {/* Subtle soft flash sheen across the surface */}
            <span
              className="absolute inset-0 animate-smooth-button-sheen"
              style={{
                backgroundColor: ripple.isDarkButton
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(78, 85, 224, 0.08)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
