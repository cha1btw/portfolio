"use client";

import * as React from "react";

/*
 * Constellation grid: a canvas mesh of points held in place by springs.
 *
 * - Every node is pulled back to its rest position by Hooke's law (F = -k * x)
 *   with damping, so it overshoots a little and settles.
 * - The cursor pushes nearby nodes away; the faster it moves, the harder.
 * - A quick sweep releases a shockwave ring that travels outwards and kicks
 *   the nodes it passes.
 * - Displaced nodes light up and link to their neighbours, the two closest to
 *   the cursor get a small "radar" readout with their grid coordinates.
 * - Colours come from the page's CSS variables (--ink, --muted) and update
 *   when the theme switches.
 *
 * Written for this site after the 21st.dev "constellation-grid" (that one needs
 * a 21st.dev account to install). The animation only runs while something
 * moves and the grid is on screen.
 */

type Node = { rx: number; ry: number; x: number; y: number; vx: number; vy: number; col: number; row: number };
type Ring = { x: number; y: number; r: number; power: number };

const SPRING = 60; // k in F = -k * x
const DAMPING = 7;
const PUSH_RADIUS = 130;
const RING_SPEED = 900; // px per second
const SETTLED = 0.02; // below this total motion the loop sleeps

export function ConstellationGrid({ spacing = 44, className = "" }: { spacing?: number; className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    let nodes: Node[] = [];
    let cols = 0;
    let width = 0;
    let height = 0;
    const rings: Ring[] = [];
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, t: 0, inside: false };
    const colors = { ink: "#000", muted: "#888", font: "monospace" };
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let lastRing = 0;

    function readColors() {
      const css = getComputedStyle(document.documentElement);
      colors.ink = css.getPropertyValue("--ink").trim() || colors.ink;
      colors.muted = css.getPropertyValue("--muted").trim() || colors.muted;
      colors.font = css.getPropertyValue("--font-geist-mono").trim() || "monospace";
    }

    function layout() {
      const rect = host!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Centre the grid so the margins on both sides match.
      cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;
      const ox = (width - (cols - 1) * spacing) / 2;
      const oy = (height - (rows - 1) * spacing) / 2;
      nodes = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = ox + col * spacing;
          const y = oy + row * spacing;
          nodes.push({ rx: x, ry: y, x, y, vx: 0, vy: 0, col, row });
        }
      }
      draw();
    }

    function step(dt: number) {
      const speed = Math.hypot(pointer.vx, pointer.vy);
      for (let i = rings.length - 1; i >= 0; i--) {
        rings[i].r += RING_SPEED * dt;
        rings[i].power *= Math.exp(-2.2 * dt);
        if (rings[i].power < 4) rings.splice(i, 1);
      }

      let motion = 0;
      for (const n of nodes) {
        // Hooke's law back to rest, with damping.
        let ax = -SPRING * (n.x - n.rx) - DAMPING * n.vx;
        let ay = -SPRING * (n.y - n.ry) - DAMPING * n.vy;

        if (pointer.inside) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_RADIUS && d > 0.001) {
            const falloff = (1 - d / PUSH_RADIUS) ** 2;
            const force = falloff * (900 + speed * 2.2);
            ax += (dx / d) * force;
            ay += (dy / d) * force;
          }
        }

        for (const ring of rings) {
          const dx = n.rx - ring.x;
          const dy = n.ry - ring.y;
          const d = Math.hypot(dx, dy);
          const band = Math.abs(d - ring.r);
          if (band < 28 && d > 0.001) {
            const kick = ring.power * (1 - band / 28);
            ax += (dx / d) * kick;
            ay += (dy / d) * kick;
          }
        }

        n.vx += ax * dt;
        n.vy += ay * dt;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        motion += Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(n.x - n.rx) + Math.abs(n.y - n.ry);
      }
      // The pointer's speed fades when it stops moving.
      pointer.vx *= Math.exp(-10 * dt);
      pointer.vy *= Math.exp(-10 * dt);
      return motion / Math.max(1, nodes.length);
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const offset = (n: Node) => Math.hypot(n.x - n.rx, n.y - n.ry);

      // Faint grid lines between neighbours; brighter where the mesh is stretched.
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const right = n.col < cols - 1 ? nodes[i + 1] : null;
        const down = nodes[i + cols] ?? null;
        for (const m of [right, down]) {
          if (!m) continue;
          const stretch = Math.min(1, (offset(n) + offset(m)) / 24);
          ctx!.globalAlpha = 0.06 + stretch * 0.35;
          ctx!.strokeStyle = stretch > 0.05 ? colors.ink : colors.muted;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(m.x, m.y);
          ctx!.stroke();
        }
      }

      // Nodes: small and quiet at rest, larger and solid when displaced.
      for (const n of nodes) {
        const o = Math.min(1, offset(n) / 14);
        ctx!.globalAlpha = 0.28 + o * 0.72;
        ctx!.fillStyle = o > 0.05 ? colors.ink : colors.muted;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.1 + o * 2.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Radar readouts on the two nodes closest to the cursor.
      if (pointer.inside) {
        const near = nodes
          .map((n) => ({ n, d: Math.hypot(n.x - pointer.x, n.y - pointer.y) }))
          .filter((e) => e.d < PUSH_RADIUS)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        ctx!.font = `10px ${colors.font}`;
        for (const { n } of near) {
          const label = `${hex(n.col)}:${hex(n.row)}`;
          ctx!.globalAlpha = 0.5;
          ctx!.strokeStyle = colors.ink;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.globalAlpha = 0.75;
          ctx!.fillStyle = colors.ink;
          ctx!.fillText(label, n.x + 17, n.y - 10);
        }
      }
      ctx!.globalAlpha = 1;
    }

    function frame(now: number) {
      raf = 0;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const motion = step(dt);
      draw();
      // Keep animating while anything moves; otherwise sleep until the next pointer event.
      if (visible && (motion > SETTLED || rings.length || pointer.inside)) raf = requestAnimationFrame(frame);
    }

    function wake() {
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const dt = Math.max(1, now - pointer.t) / 1000;
      if (pointer.inside) {
        pointer.vx = (x - pointer.x) / dt;
        pointer.vy = (y - pointer.y) / dt;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.t = now;
      pointer.inside = true;
      // A fast sweep releases a shockwave, at most a few per second.
      const speed = Math.hypot(pointer.vx, pointer.vy);
      if (speed > 1800 && now - lastRing > 220) {
        rings.push({ x, y, r: 0, power: Math.min(5200, speed * 1.6) });
        lastRing = now;
      }
      wake();
    }

    function onLeave() {
      pointer.inside = false;
      pointer.vx = pointer.vy = 0;
      wake();
    }

    readColors();
    layout();

    const resize = new ResizeObserver(layout);
    resize.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(host);
    // Theme switches change data-theme on <html>: redraw with the new colours.
    const themeWatch = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      io.disconnect();
      themeWatch.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [spacing]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

function hex(n: number) {
  return n.toString(16).toUpperCase().padStart(2, "0");
}
