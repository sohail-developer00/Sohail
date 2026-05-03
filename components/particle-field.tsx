"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  hue: number;
  alpha: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const particles: Particle[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const createParticles = () => {
      const density = mediaQuery.matches ? 28 : 46;
      particles.length = 0;

      for (let index = 0; index < density; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.8,
          speedX: (Math.random() - 0.5) * 0.16,
          speedY: (Math.random() - 0.5) * 0.16,
          hue: Math.random() > 0.5 ? 190 : 272,
          alpha: Math.random() * 0.55 + 0.12,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -30) particle.x = width + 30;
        if (particle.x > width + 30) particle.x = -30;
        if (particle.y < -30) particle.y = height + 30;
        if (particle.y > height + 30) particle.y = -30;

        const glow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 12,
        );

        glow.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.alpha})`);
        glow.addColorStop(1, `hsla(${particle.hue}, 100%, 70%, 0)`);

        context.fillStyle = glow;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 12, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="particle-canvas" />;
}
