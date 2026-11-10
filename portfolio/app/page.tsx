import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Agents from "./Agents";
import { heroStats, principles, profile, projects, record, skills, tools, workStats } from "@/lib/data";

const wrap = "mx-auto w-full max-w-7xl px-6";
const label = "font-mono text-xs tracking-wide text-accent";
const h2 = "font-display text-[clamp(3rem,9vw,7.5rem)] leading-[.95] text-zinc-100";

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div data-build="pop" className="border-l border-zinc-700 pl-4">
      <div className="font-display text-4xl text-zinc-100 md:text-5xl">{v}</div>
      <div className="mt-1 max-w-[16ch] font-mono text-[11px] text-zinc-400">{l}</div>
    </div>
  );
}

export default function Page() {
  return (
    <main>
      <Agents />

      {/* HERO */}
      <section id="hero" className="relative isolate flex min-h-svh flex-col overflow-hidden">
        <div data-build="wipe" aria-hidden className="metal pointer-events-none absolute inset-x-0 top-[9svh] z-0 select-none whitespace-nowrap text-center font-display leading-none" style={{ fontSize: "min(21vw, 30rem)" }}>
          PORTFOLIO
        </div>
        <div data-build="pop" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto h-[62svh] w-fit md:h-[84svh]">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[90%] w-[140%] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(closest-side,rgba(255,59,47,.55),rgba(255,59,47,.12)_55%,transparent)]" />
          <Image src="/headshot.png" alt="Portrait of Paras Kumar" width={1130} height={1672} priority className="h-full w-auto" style={{ filter: "grayscale(1) contrast(1.2)", maskImage: "linear-gradient(to bottom,#000 72%,transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom,#000 72%,transparent 100%)" }} />
        </div>

        <div className={`${wrap} relative z-20 grid flex-1 grid-cols-1 content-between gap-10 pb-24 pt-24 lg:grid-cols-[1.1fr_.8fr_.7fr] lg:content-end lg:items-end lg:pb-20`}>
          <div>
            <p data-build="type" className="font-brush text-3xl text-zinc-300 md:text-4xl">Hello, I’m</p>
            <h1 data-build="wipe" className="mt-1 font-display text-[clamp(4rem,10vw,9rem)] leading-[.88] text-zinc-50">PARAS<br />KUMAR</h1>
            <p data-build="type" className="mt-4 font-mono text-sm text-accent md:text-base">{profile.role}</p>
            <p data-build="type" className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300 md:text-base">
              Final-year ECE student specialising in VLSI. I design CMOS circuits, 4-layer PCBs and embedded firmware, and I’m open to VLSI, PCB design and embedded roles.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a data-build="pop" href="#work" className="btn btn-primary">View work <ArrowDown size={16} /></a>
              <span data-build="pop" className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400"><MapPin size={14} className="text-accent" />Based in {profile.city}</span>
            </div>
          </div>
          <div className="hidden lg:block" />
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:justify-items-end lg:gap-6">
            {heroStats.map((s) => <Stat key={s.l} {...s} />)}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className={`${wrap} py-24 md:py-32`}>
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p data-build="type" className={label}>Selected projects</p>
            <h2 data-build="wipe" className={`${h2} mt-3`}>WORK THAT SHIPS</h2>
          </div>
          <div>
            <p data-build="type" className="max-w-md text-zinc-400">Boards I designed and fabricated, circuits I simulated, and firmware I wrote.</p>
            <div className="mt-6 grid grid-cols-3 gap-4">{workStats.map((s) => <Stat key={s.l} {...s} />)}</div>
          </div>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <article key={p.title} data-build="pop" className={`flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-600 md:p-8 ${i === 0 ? "md:col-span-2" : ""}`}>
              <p className="font-mono text-xs text-zinc-500">{p.year}</p>
              <h3 className="mt-2 font-display text-3xl leading-tight text-zinc-100 md:text-4xl">{p.title}</h3>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-zinc-300">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{b}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => <span key={t} className="rounded-full border border-zinc-700 px-3 py-1 font-mono text-[11px] text-zinc-300">{t}</span>)}
              </div>
              <div className="mt-6 pt-1">
                <a className="link" href={profile.github} target="_blank" rel="noreferrer">Code on GitHub <ArrowUpRight size={14} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="py-20">
        <div className={wrap}>
          <p data-build="type" className={label}>Tools and languages</p>
          <h2 data-build="wipe" className={`${h2} mt-3`}>THE STACK</h2>
        </div>
        <div data-build="pop" className="marquee mt-12 overflow-hidden" aria-label="Tools and technologies">
          <div className="track">
            {[0, 1].map((k) => (
              <ul key={k} className="flex shrink-0 gap-3 pr-3" aria-hidden={k === 1}>
                {tools.map((t) => <li key={t} className="whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-900 px-5 py-3 font-mono text-sm text-zinc-300">{t}</li>)}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* RECORD */}
      <section id="record" className={`${wrap} py-24 md:py-32`}>
        <p data-build="type" className={label}>Experience, exams, education</p>
        <h2 data-build="wipe" className={`${h2} mt-3`}>THE RECORD</h2>
        <ol className="relative mt-14 space-y-5 border-l border-zinc-800 pl-6 md:pl-10">
          {record.map((r) => (
            <li key={r.title} data-build="pop" className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <span className="absolute -left-[31px] top-8 size-3 rounded-full bg-accent ring-4 ring-[#09090b] md:-left-[47px]" />
              <p className="font-mono text-xs text-accent">{r.when}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-100">{r.title}</h3>
              <p className="text-sm text-zinc-400">{r.org}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{r.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ABOUT */}
      <section id="about" className={`${wrap} py-24 md:py-32`}>
        <p data-build="type" className={label}>About</p>
        <h2 data-build="wipe" className={`${h2} mt-3`}>HOW I WORK</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-14">
          <p data-build="type" className="max-w-xl text-lg leading-relaxed text-zinc-300">
            I’m a final-year Electronics & Communication Engineering student with a VLSI specialisation, working across the hardware stack: CMOS circuit design in Cadence Virtuoso, multi-layer PCB design in KiCad and embedded firmware on microcontrollers.
          </p>
          <p data-build="type" className="max-w-xl text-lg leading-relaxed text-zinc-300">
            I independently designed and fabricated several PCBs, including 4-layer boards with USB, eMMC and BGA routing. I’m GATE 2026 qualified and looking for VLSI, PCB design or embedded systems roles.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.g} data-build="pop" className="rounded-2xl border border-zinc-800 p-6">
              <h3 className="font-mono text-sm text-accent">{s.g}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <div key={p.h} data-build="pop" className="bg-[#09090b] p-6">
              <span className="font-mono text-xs text-zinc-500">Principle {i + 1}</span>
              <h3 className="mt-3 font-display text-2xl text-zinc-100">{p.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${wrap} pb-10 pt-24 md:pt-32`}>
        <p data-build="type" className={label}>Contact</p>
        <h2 data-build="wipe" className={`${h2} mt-3`}>LET’S TALK</h2>
        <div data-build="pop" className="mt-12 rounded-3xl border border-zinc-800 bg-[radial-gradient(ellipse_at_top_right,rgba(255,59,47,.18),transparent_60%)] p-8 md:p-14">
          <p className="max-w-2xl font-display text-4xl leading-tight text-zinc-100 md:text-6xl">Hiring for VLSI, PCB design or embedded systems?</p>
          <p className="mt-4 max-w-xl text-zinc-400">Send a note and I’ll reply with relevant boards, schematics and code.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}><Mail size={16} /> Email me</a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          </div>
          <p className="mt-6 break-all font-mono text-xs text-zinc-500">{profile.email}</p>
        </div>
        <footer className="mt-16 flex flex-col gap-2 border-t border-zinc-800 py-8 pb-28 font-mono text-xs text-zinc-500 sm:flex-row sm:justify-between">
          <span data-build="type">© 2026 Paras Kumar</span>
          <span data-build="type">{profile.city}</span>
        </footer>
      </section>
    </main>
  );
}
