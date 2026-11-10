"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Compass, Pause, Play } from "lucide-react";

const NAMES = ["Scout", "Layout", "Typeset", "Motion", "QA", "Deploy", "Copy", "Lint", "Index", "Render", "Palette", "Review"];
const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#06b6d4", "#ec4899", "#f97316", "#84cc16", "#14b8a6", "#0ea5e9", "#f43f5e", "#eab308", "#10b981"];
const MAX_ACTIVE = 6;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Cur = { el: HTMLDivElement; x: number; y: number; busy: boolean; name: string };
type Job = { el: HTMLElement; mode: string; cur: Cur; box: HTMLDivElement; phase: 0 | 1 | 2; t: number; dur: number; fx: number; fy: number; full: string; a?: HTMLSpanElement; b?: HTMLSpanElement };

export default function Agents() {
  const [loading, setLoading] = useState(true);
  const [on, setOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const [touring, setTouring] = useState(false);
  const pausedRef = useRef(false);

  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  }, []);
  const toggleAgents = useCallback(() => {
    const now = document.documentElement.classList.contains("build-mode");
    try { localStorage.setItem("agents", now ? "off" : "on"); } catch {}
    location.href = location.pathname + "?agents=" + (now ? "off" : "on");
  }, []);
  const startTour = useCallback(() => {
    try { sessionStorage.setItem("tour", "1"); } catch {}
    location.reload();
  }, []);

  useEffect(() => {
    history.scrollRestoration = "manual";
    const buildOn = document.documentElement.classList.contains("build-mode");
    setOn(buildOn);
    let wantTour = false;
    try { wantTour = sessionStorage.getItem("tour") === "1"; sessionStorage.removeItem("tour"); } catch {}
    if (wantTour) window.scrollTo(0, 0);

    let raf = 0, tourRaf = 0, started = false, alive = true;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };

    /* ---------- tour: ease in, steady, ease out ---------- */
    const stopEvents = ["wheel", "touchstart", "mousedown"];
    const stopTour = () => {
      if (!tourRaf) return;
      cancelAnimationFrame(tourRaf); tourRaf = 0;
      stopEvents.forEach((e) => window.removeEventListener(e, stopTour));
      setTouring(false);
    };
    const runTour = () => {
      if (!alive) return;
      window.scrollTo(0, 0); setTouring(true);
      const d = document.documentElement.scrollHeight - window.innerHeight;
      const v = 110, r = 1.8; // px/s cruise speed, ramp seconds
      const cr = Math.max(0, d - v * r);
      const T = 2 * r + cr / v;
      const t0 = performance.now();
      stopEvents.forEach((e) => window.addEventListener(e, stopTour, { passive: true }));
      const step = (now: number) => {
        const t = (now - t0) / 1000;
        const y = t < r ? (v * t * t) / (2 * r) : t < r + cr / v ? (v * r) / 2 + v * (t - r) : d - (v * Math.max(0, T - t) ** 2) / (2 * r);
        window.scrollTo(0, Math.min(d, y));
        if (t >= T) { stopTour(); return; }
        tourRaf = requestAnimationFrame(step);
      };
      tourRaf = requestAnimationFrame(step);
    };

    /* ---------- keyboard ---------- */
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = e.key.toLowerCase();
      if (e.key === "Escape") stopTour();
      else if (k === "t") startTour();
      else if (k === "a") toggleAgents();
      else if (k === "p") togglePause();
    };
    window.addEventListener("keydown", onKey);

    let cleanupEngine = () => {};
    if (!buildOn) {
      setLoading(false);
      if (wantTour) later(runTour, 800);
    } else {
      /* ---------- robot cursor engine ---------- */
      const N = window.innerWidth < 768 ? 6 : 12;
      const layer = document.createElement("div");
      layer.className = "agent-layer";
      document.body.appendChild(layer);

      const place = (c: Cur, x: number, y: number) => { c.x = x; c.y = y; c.el.style.transform = `translate3d(${x}px,${y}px,0)`; };
      const cursors: Cur[] = Array.from({ length: N }, (_, i) => {
        const el = document.createElement("div");
        el.className = "agent";
        el.style.setProperty("--c", COLORS[i]);
        el.innerHTML = `<svg width="18" height="22" viewBox="0 0 18 22"><path d="M1 1l15 9.5-6.4 1.6L7 19z" fill="${COLORS[i]}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg><span class="tag"><span class="bot"><span class="ant"></span><span class="eye"></span><span class="eye"></span></span>${NAMES[i]}</span>`;
        layer.appendChild(el);
        const c: Cur = { el, x: 0, y: 0, busy: false, name: NAMES[i] };
        place(c, window.innerWidth * (0.2 + 0.6 * Math.random()), window.innerHeight + 40);
        return c;
      });

      const jobs: Job[] = [];
      const queue: HTMLElement[] = [];
      const seen = new WeakSet<Element>();
      const instant = (el: Element) => { seen.add(el); el.classList.add("built"); };

      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (seen.has(el)) continue;
          if (e.isIntersecting) { seen.add(el); queue.push(el); }
          else if (e.boundingClientRect.bottom < 0) instant(el);
        }
      }, { rootMargin: "0px 0px -8% 0px" });

      const start = (el: HTMLElement, cur: Cur) => {
        const mode = el.dataset.build || "pop";
        const r = el.getBoundingClientRect();
        const box = document.createElement("div");
        box.className = "wire"; box.style.opacity = "0";
        box.innerHTML = `<i></i><i></i><i></i><i></i><span>${mode} · ${el.tagName.toLowerCase()}</span>`;
        layer.appendChild(box);
        cur.busy = true; cur.el.style.opacity = "1";
        const dist = Math.hypot(r.left - cur.x, r.top - cur.y);
        jobs.push({ el, mode, cur, box, phase: 0, t: 0, dur: clamp(350 + dist * 0.45, 450, 1000), fx: cur.x, fy: cur.y, full: el.textContent || "" });
      };

      const initReveal = (j: Job) => {
        j.el.classList.add("built");
        if (j.mode === "type") {
          j.el.textContent = "";
          j.a = document.createElement("span"); j.b = document.createElement("span");
          j.b.style.visibility = "hidden"; j.b.textContent = j.full;
          j.el.append(j.a, j.b);
          j.dur = clamp(j.full.length * 24, 400, 2400);
        } else if (j.mode === "wipe") { j.dur = 800; j.el.style.clipPath = "inset(-20% 100% -20% -5%)"; }
        else { j.dur = 380; j.el.style.opacity = "0"; }
      };

      const step = (j: Job, dt: number): boolean => {
        j.t += dt;
        const r = j.el.getBoundingClientRect();
        const p = clamp(j.t / j.dur, 0, 1), e = ease(p);
        const setBox = (w: number, h: number) => { Object.assign(j.box.style, { left: r.left + "px", top: r.top + "px", width: w + "px", height: h + "px" }); };
        if (j.phase === 0) {
          place(j.cur, j.fx + (r.left - j.fx) * e, j.fy + (r.top - j.fy) * e);
          if (p >= 1) { j.phase = 1; j.t = 0; j.dur = 520; j.box.style.opacity = "1"; }
        } else if (j.phase === 1) {
          setBox(r.width * e, r.height * e);
          place(j.cur, r.left + r.width * e, r.top + r.height * e);
          if (p >= 1) { j.phase = 2; j.t = 0; initReveal(j); }
        } else {
          setBox(r.width, r.height);
          if (j.mode === "type") {
            const n = Math.floor(j.full.length * p);
            j.a!.textContent = j.full.slice(0, n); j.b!.textContent = j.full.slice(n);
            place(j.cur, r.left + r.width * p, r.top + r.height * 0.85);
          } else {
            place(j.cur, r.right, r.bottom);
            if (j.mode === "wipe") j.el.style.clipPath = `inset(-20% ${(1 - e) * 100}% -20% -5%)`;
            else { j.el.style.opacity = String(e); j.el.style.transform = `translateY(${(1 - e) * 12}px) scale(${0.94 + 0.06 * e})`; }
          }
          if (p >= 1) {
            if (j.mode === "type") j.el.textContent = j.full;
            else { j.el.style.opacity = ""; j.el.style.transform = ""; j.el.style.clipPath = ""; }
            j.box.style.opacity = "0";
            const box = j.box; window.setTimeout(() => box.remove(), 300);
            j.cur.busy = false;
            const c = j.cur; window.setTimeout(() => { if (!c.busy) c.el.style.opacity = "0"; }, 1200);
            return true;
          }
        }
        return false;
      };

      const pump = () => {
        for (let i = queue.length - 1; i >= 0; i--) {
          if (queue[i].getBoundingClientRect().bottom < 0) { instant(queue[i]); queue.splice(i, 1); }
        }
        const pos = (el: HTMLElement) => { const r = el.getBoundingClientRect(); return r.top + r.left * 0.001; };
        while (jobs.length < MAX_ACTIVE && queue.length) {
          const free = cursors.find((c) => !c.busy);
          if (!free) break;
          queue.sort((a, b) => pos(a) - pos(b));
          start(queue.shift()!, free);
        }
      };

      let last = performance.now(), heroDone = false;
      const frame = (now: number) => {
        const dt = Math.min(50, now - last); last = now;
        if (!pausedRef.current) {
          for (let i = jobs.length - 1; i >= 0; i--) if (step(jobs[i], dt)) jobs.splice(i, 1);
          pump();
        }
        if (wantTour && !heroDone && !jobs.length && !document.querySelector("#hero [data-build]:not(.built)")) {
          heroDone = true; later(runTour, 700);
        }
        raf = requestAnimationFrame(frame);
      };

      later(() => {
        setLoading(false);
        document.querySelectorAll("[data-build]").forEach((el) => io.observe(el));
        started = true; last = performance.now();
        raf = requestAnimationFrame(frame);
      }, 1100);

      cleanupEngine = () => { cancelAnimationFrame(raf); io.disconnect(); layer.remove(); };
    }

    return () => {
      alive = false; stopTour(); cleanupEngine();
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [startTour, toggleAgents, togglePause]);

  return (
    <>
      {loading && (
        <div className="boot" role="status" aria-live="polite">
          <span>booting agents…</span>
          <div className="bar" />
        </div>
      )}
      <div className="dock" role="toolbar" aria-label="Page controls">
        <button className="dbtn" onClick={togglePause} disabled={!on} aria-pressed={paused} title="Pause (P)">
          {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}
        </button>
        <button className="dbtn" onClick={toggleAgents} aria-pressed={on} title="Agents (A)">
          <Bot size={14} /> Agents {on ? "on" : "off"}
        </button>
        <button className="dbtn" onClick={startTour} disabled={touring} title="Tour (T)">
          <Compass size={14} /> {touring ? "Touring" : "Tour"}
        </button>
      </div>
    </>
  );
}
