"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineBookOpen,
} from "react-icons/hi2";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
};

export default function PaymentSuccessPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let running = true;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let lastTime = 0;

    const colors = ["#0F766E", "#00BBA6", "#FBBF24", "#F472B6"];

    const particles: Particle[] = [];
    const pile: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: -20 - Math.random() * height * 0.4,
      vx: (Math.random() - 0.5) * 1.5,
      vy: 1 + Math.random() * 2.5,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.12,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const spawnWave = () => {
      for (let i = 0; i < 5; i++) {
        particles.push(createParticle());
      }
    };

    const drawPiece = (p: Particle) => {
      if (!ctx) return;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      ctx.restore();
    };

    const animate = (time: number) => {
      if (!running) return;

      const delta = lastTime ? Math.min((time - lastTime) / 16.67, 2) : 1;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Continuously release confetti for 12 seconds.
      if (time - startTime < 4000) {
        spawnWave();
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.vy += 0.035 * delta;
        p.x += (p.vx + Math.sin(time / 350 + p.rotation) * 0.7) * delta;
        p.y += p.vy * delta;
        p.rotation += p.rotationSpeed * delta;

        // Let the confetti settle at the bottom of the screen.
        if (p.y >= height - p.size) {
          p.y = height - p.size;

          pile.push({ ...p, vx: 0, vy: 0, rotationSpeed: 0 });

          particles.splice(i, 1);
          continue;
        }

        drawPiece(p);
      }

      // Keep settled confetti visible at the bottom.
      for (const p of pile) {
        drawPiece(p);
      }

      // Limit memory use on long sessions.
      if (pile.length > 2500) {
        pile.splice(0, pile.length - 2500);
      }

      animationId = requestAnimationFrame(animate);
    };

    const startTime = performance.now();

    resize();
    window.addEventListener("resize", resize);

    // Initial celebration burst.
    confetti({
      particleCount: 180,
      spread: 110,
      startVelocity: 35,
      gravity: 0.7,
      ticks: 250,
      origin: { x: 0.5, y: 0.15 },
      colors,
      zIndex: 99999,
    });

    // Start continuous falling animation.
    animationId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#f4faf9] px-4 py-12">
      {/* Falling confetti overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      />

      {/* Success card */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-teal-100 bg-white px-6 py-12 text-center shadow-lg shadow-teal-900/5 sm:px-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-teal-50">
          <HiOutlineCheckCircle className="h-16 w-16 text-teal-600" />
        </div>

        <p className="mt-6 font-semibold text-teal-600">Congratulations! 🎉</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Payment Successful!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Your payment has been completed successfully. Thank you for using our
          Library Management System. Happy reading!
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard/payments"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            <HiOutlineClipboardDocumentList className="h-5 w-5" />
            View Payment Details
          </Link>

          <Link
            href="/dashboard/borrowed"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            <HiOutlineBookOpen className="h-5 w-5" />
            My Bookings
          </Link>
        </div>
      </div>
    </main>
  );
}
