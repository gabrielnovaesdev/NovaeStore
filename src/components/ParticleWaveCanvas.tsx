import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phaseOffset: number;
  angle: number;
  speed: number;
  waveOffset: number;
  friction: number;
  springFactor: number;
  energy: number;
  activation: number; // 0 (static/default) to 1 (active/chameleon)
}

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
  decay: number;
  hue: number;
}

export const ParticleWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: Particle[] = [];
    let ripples: WaveRipple[] = [];

    // Smooth mouse tracking with inertia & fluid velocity
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      radius: window.innerWidth < 768 ? 220 : 300, // Expanded mouse field radius
      isHovered: false,
      lastMoveTime: 0,
    };

    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    const initParticles = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 34 : 22; // Balanced grid spacing for continuous wave surface
      const cols = Math.ceil(width / density) + 2;
      const rows = Math.ceil(height / density) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Subtle organic jitter for natural flow
          const x = (i - 1) * density + (Math.random() * 6 - 3);
          const y = (j - 1) * density + (Math.random() * 6 - 3);
          // Very fine, airy micro-dots (0.65px to 1.2px)
          const baseRadius = Math.random() * 0.55 + 0.65;
          // Phase offset creates iridescent spatial wave patterns
          const phaseOffset = (x * 0.0015 + y * 0.0018 + Math.random() * 0.2) % 1;

          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            radius: baseRadius,
            baseRadius,
            phaseOffset,
            angle: Math.random() * Math.PI * 2,
            speed: 0.004 + Math.random() * 0.006,
            waveOffset: (x * 0.0035) + (y * 0.0035),
            // High fluid friction and ultra-gentle spring for weightless floating stardust
            friction: 0.958 + Math.random() * 0.012,
            springFactor: 0.010 + Math.random() * 0.004,
            energy: 0,
            activation: 0,
          });
        }
      }
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    // Mouse movement with fluid velocity smoothing
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const now = performance.now();
      const dt = Math.max(1, now - mouse.lastMoveTime);
      mouse.lastMoveTime = now;

      if (mouse.x !== -9999) {
        const rawVx = ((currentX - mouse.x) / dt) * 16;
        const rawVy = ((currentY - mouse.y) / dt) * 16;
        // Low-pass filter for silky smooth mouse momentum
        mouse.vx = mouse.vx * 0.65 + rawVx * 0.35;
        mouse.vy = mouse.vy * 0.65 + rawVy * 0.35;
        mouse.speed = Math.min(Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy), 35);
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.isHovered = true;

      // Soft water-like wave ripples on swift movement
      if (mouse.speed > 14 && Math.random() > 0.8) {
        ripples.push({
          x: currentX,
          y: currentY,
          radius: 6,
          maxRadius: 140 + mouse.speed * 2,
          strength: Math.min(mouse.speed * 0.2, 7),
          speed: 2.8 + mouse.speed * 0.08,
          decay: 0.955,
          hue: (time * 20 + 220) % 360,
        });
      }
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
      mouse.speed = 0;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Gentle fluid ripple
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius: Math.max(width, height) * 0.5,
        strength: 12,
        speed: 4.8,
        decay: 0.965,
        hue: (time * 25 + 260) % 360,
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
        mouse.isHovered = true;
      }
    };

    const onTouchEnd = () => {
      mouse.isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    container.addEventListener('click', onClick, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.009;
      ctx.clearRect(0, 0, width, height);

      // 1. Process Subtle Fluid Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.strength *= rip.decay;

        if (rip.radius >= rip.maxRadius || rip.strength < 0.15) {
          ripples.splice(r, 1);
        }
      }

      // 2. Animate and Render Particles with Enhanced Chameleon Colors & Weightless Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Multi-layered organic wave superposition (weightless stardust floating on air)
        p.angle += p.speed;
        const wave1 = Math.sin(time * 0.65 + p.waveOffset) * 3.2;
        const wave2 = Math.cos(time * 0.45 + p.waveOffset * 0.85) * 2.8;
        const wave3 = Math.sin(time * 0.8 + (p.originX * 0.005) - (p.originY * 0.004)) * 2.2;

        const targetX = p.originX + wave1 + wave3 * 0.35;
        const targetY = p.originY + wave2 + wave3 * 0.6;

        // Interaction with Cursor: Wide radius with feather-light smooth cosine falloff
        let cursorInfluence = 0;
        if (mouse.isHovered) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            // Smooth cosine bell curve across the wide radius
            const norm = dist / mouse.radius;
            const smoothFactor = 0.5 * (1 + Math.cos(Math.PI * norm));
            cursorInfluence = smoothFactor;

            const angle = Math.atan2(dy, dx);
            const pushMagnitude = smoothFactor * (10 + mouse.speed * 0.4);

            // Gentle directional air wake
            const wakeX = mouse.vx * smoothFactor * 0.22;
            const wakeY = mouse.vy * smoothFactor * 0.22;

            p.vx -= (Math.cos(angle) * pushMagnitude * 0.055) - (wakeX * 0.045);
            p.vy -= (Math.sin(angle) * pushMagnitude * 0.055) - (wakeY * 0.045);
          }
        }

        // Interaction with Gentle Ripples
        let rippleInfluence = 0;
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const rdx = p.x - rip.x;
          const rdy = p.y - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const waveDist = Math.abs(rdist - rip.radius);

          if (waveDist < 40 && rdist > 0) {
            const waveForce = (1 - waveDist / 40) * (rip.strength / 15);
            const waveAngle = Math.atan2(rdy, rdx);
            p.vx += Math.cos(waveAngle) * waveForce * 1.8;
            p.vy += Math.sin(waveAngle) * waveForce * 1.8;
            rippleInfluence = Math.max(rippleInfluence, waveForce);
          }
        }

        // Velvet Spring Physics & Easing
        const springX = (targetX - p.x) * p.springFactor;
        const springY = (targetY - p.y) * p.springFactor;

        p.vx = (p.vx + springX) * p.friction;
        p.vy = (p.vy + springY) * p.friction;

        p.x += p.vx;
        p.y += p.vy;

        // Calculate motion velocity intensity
        const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const motionFactor = Math.min(1, velocity * 0.45);

        // Target activation: High when moved by cursor/wave/velocity, 0 when static
        const targetActivation = Math.min(1, cursorInfluence * 1.2 + motionFactor * 0.8 + rippleInfluence * 0.6);

        // Smooth transition easing: Fast activation, graceful gentle fading back to resting color
        if (targetActivation > p.activation) {
          p.activation += (targetActivation - p.activation) * 0.16; // Fast fade-in
        } else {
          p.activation += (targetActivation - p.activation) * 0.035; // Soft, graceful fade-out
        }

        // Slight micro-scale expansion during motion
        p.radius = p.baseRadius + p.activation * 0.55;

        // --- Chameleon Color Engine with Smooth Resting Transition ---
        // 1. Default static color parameters (Soft, clean neutral slate-indigo)
        const baseHue = 232;
        const baseSat = isDark ? 28 : 34;
        const baseLight = isDark ? 66 : 52;
        const baseAlpha = isDark ? 0.32 : 0.28;

        // 2. Active Chameleon spectrum (cycles through vivid colors when in motion)
        const cycle = (time * 0.09 + p.phaseOffset + p.activation * 0.35) % 1;
        let activeHue: number;

        if (cycle < 0.18) {
          // 160° (Emerald/Mint) -> 195° (Cyan/Azure)
          activeHue = 160 + (cycle / 0.18) * 35;
        } else if (cycle < 0.38) {
          // 195° (Cyan) -> 235° (Electric Indigo)
          activeHue = 195 + ((cycle - 0.18) / 0.20) * 40;
        } else if (cycle < 0.60) {
          // 235° (Indigo) -> 275° (Violet / Royal Purple)
          activeHue = 235 + ((cycle - 0.38) / 0.22) * 40;
        } else if (cycle < 0.82) {
          // 275° (Royal Purple) -> 320° (Vivid Magenta / Fuchsia)
          activeHue = 275 + ((cycle - 0.60) / 0.22) * 45;
        } else if (cycle < 0.93) {
          // 320° (Magenta) -> 350° (Electric Rose / Coral)
          activeHue = 320 + ((cycle - 0.82) / 0.11) * 30;
        } else {
          // 350° (Rose) smoothly wrapping back to 160° (Emerald)
          activeHue = 350 - ((cycle - 0.93) / 0.07) * 190;
        }

        const activeSat = isDark ? 92 : 94;
        const activeLight = isDark ? 72 : 50;
        const activeAlpha = isDark ? 0.88 : 0.84;

        // 3. Smoothly interpolate between Base Color (static) and Chameleon Color (motion)
        const act = Math.max(0, Math.min(1, p.activation));

        // Shortest arc hue interpolation
        let dHue = activeHue - baseHue;
        if (dHue > 180) dHue -= 360;
        if (dHue < -180) dHue += 360;
        const hue = baseHue + dHue * act;

        const sat = baseSat + (activeSat - baseSat) * act;
        const light = baseLight + (activeLight - baseLight) * act;
        const alpha = baseAlpha + (activeAlpha - baseAlpha) * act;

        // Ultra-smooth feather-light vertical fade-out towards the bottom for seamless blending
        const fadeZone = Math.max(160, height * 0.42);
        const normY = Math.min(1, Math.max(0, (height - p.y) / fadeZone));
        // Smooth cubic ease-out curve for gentle, natural stardust dissipation
        const verticalFade = normY * normY * (3 - 2 * normY);
        const finalAlpha = Math.max(0, alpha * verticalFade);

        // Draw smoothly transitioning micro-particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${sat.toFixed(0)}%, ${light.toFixed(0)}%, ${finalAlpha.toFixed(2)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('click', onClick);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto overflow-hidden select-none"
      style={{
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.5) 78%, rgba(0,0,0,0.18) 90%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.5) 78%, rgba(0,0,0,0.18) 90%, rgba(0,0,0,0) 100%)',
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
