/** Portfolio page rendered by the Vite application entry point. */
import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";

/* ---------------- EDIT THIS BLOCK (TODO = replace) ---------------- */
const DATA = {
  name: "Chetan Musturi",
  roles: ["Analog IC design", "Verilog RTL & FSMs", "LTspice simulation", "PCB design"],
  headline: "Aspiring Analog & Mixed-Signal VLSI Engineer",
  location: "Tirupati, Andhra Pradesh, India",
  photo: "", // TODO: "/chetan.jpg"
  email: "your-email@gmail.com", // TODO
  links: {
    linkedin: "https://www.linkedin.com/in/chetanmusturi-450858325",
    github: "https://github.com/your-username", // TODO
    resume: "/resume.pdf", // TODO
  },
  about: [
    "I'm a second-year Electronics and Communication Engineering student building toward a career in semiconductor design, with a focus on analog and mixed-signal VLSI.",
    "I simulate circuits in LTspice, describe hardware in Verilog, and have taken boards from schematic to a physical PCB. I'm also preparing for GATE.",
  ],
  stats: [
    { n: 2, from: 0, label: "Certifications" },
    { n: 3, from: 0, label: "Languages: C, Python, Verilog" },
    { n: 2028, from: 2020, label: "Graduating" },
  ],
  skills: [
    { group: "Design", c: "violet", items: ["Analog circuit design", "FSM design", "Verilog (RTL)", "PCB design"] },
    { group: "Tools", c: "cyan", items: ["LTspice", "Schematic capture", "PCB layout"] },
    { group: "Programming", c: "pink", items: ["C", "Python", "AI in electronics"] },
  ],
  projects: [ // TODO: these three are examples, replace with real work
    { title: "Two-Stage Op-Amp", tag: "Analog", c: "violet", text: "Designed and simulated a two-stage CMOS op-amp in LTspice. Measured gain, bandwidth and phase margin.", stack: ["LTspice", "Analog"], link: "#" },
    { title: "Traffic Light Controller", tag: "Digital", c: "cyan", text: "Moore FSM in Verilog with a testbench covering every state transition.", stack: ["Verilog", "FSM"], link: "#" },
    { title: "Custom PCB Board", tag: "Hardware", c: "pink", text: "Took a circuit from schematic capture through layout to a fabricated, working board.", stack: ["PCB", "Layout"], link: "#" },
  ],
  certs: ["ISO 9001:2015 Lead Auditor", "VLSI Chip Design"],
  education: { school: "Sri Venkateswara College of Engineering", degree: "B.Tech, Electronics and Communication Engineering", years: "2024 – 2028" },
};
/* ------------------------------------------------------------------ */

// Same point count for both paths, so anime.js can morph sine -> square
const pts = (f: (s: number) => number) =>
  Array.from({ length: 61 }, (_, i) => `${i ? "L" : "M"}${((i / 60) * 1000).toFixed(1)} ${(60 - f(Math.sin((i / 60) * Math.PI * 6)) * 40).toFixed(1)}`).join(" ");
const SINE = pts((s) => s);
const SQUARE = pts((s) => Math.tanh(s * 6));

const initials = DATA.name.split(" ").map((w) => w[0]).join("");
const PINS = [70, 130, 190, 250, 310];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Figtree:wght@400;500;600&display=swap');
body{margin:0;background:#0B0F24}
.pf{--bg:#0B0F24;--ink:#EAF0FF;--muted:#9AA6C8;--glass:rgba(255,255,255,.06);--line:rgba(255,255,255,.12);
  --violet:#8B5CF6;--cyan:#22D3EE;--pink:#F472B6;--sun:#FBBF24;
  font-family:'Figtree',system-ui,sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;min-height:100vh;position:relative;overflow-x:hidden}
.pf *{box-sizing:border-box}.pf h1,.pf h2,.pf h3{font-family:'Bricolage Grotesque',sans-serif;margin:0;line-height:1.05}
.pf a{color:inherit}.pf :focus-visible{outline:3px solid var(--cyan);outline-offset:3px;border-radius:8px}
.pf .violet{--c:var(--violet)}.pf .cyan{--c:var(--cyan)}.pf .pink{--c:var(--pink)}.pf .sun{--c:var(--sun)}
.pf .bar{position:fixed;top:0;left:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,var(--violet),var(--cyan),var(--pink));z-index:20}
.pf .aur{position:fixed;width:60vmax;height:60vmax;border-radius:50%;filter:blur(90px);opacity:.28;pointer-events:none;animation:drift 22s ease-in-out infinite alternate}
.pf .aur.a{background:var(--violet);top:-25vmax;left:-15vmax}.pf .aur.b{background:var(--cyan);bottom:-30vmax;right:-20vmax;animation-delay:-8s}
@keyframes drift{to{transform:translate(8vmax,6vmax) scale(1.15)}}
.pf .wrap{max-width:1040px;margin:0 auto;padding:0 24px;position:relative}
.pf nav{position:sticky;top:12px;z-index:10;margin-top:12px;display:flex;justify-content:space-between;align-items:center;padding:10px 20px;border-radius:999px;background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(14px)}
.pf nav b{font-family:'Bricolage Grotesque',sans-serif;font-size:1.15rem}.pf nav div{display:flex;gap:18px;font-size:.92rem;font-weight:500}
.pf nav a{text-decoration:none;color:var(--muted);transition:color .2s}.pf nav a:hover{color:var(--ink)}
.pf .hero{display:grid;grid-template-columns:1.2fr 1fr;gap:32px;align-items:center;min-height:82vh}
.pf h1{font-size:clamp(2.8rem,8vw,5.2rem);font-weight:800;letter-spacing:-.03em;background:linear-gradient(100deg,#fff 30%,var(--cyan),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent}
.pf .head{font-size:1.2rem;margin:16px 0 6px}.pf .type{font-size:1.1rem;color:var(--cyan);min-height:1.7em}
.pf .type i{display:inline-block;width:2px;height:1.1em;background:var(--cyan);margin-left:2px;vertical-align:-3px;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.pf .loc{color:var(--muted);margin:0 0 26px}.pf .btns{display:flex;gap:12px;flex-wrap:wrap}
.pf .btn{padding:12px 24px;border-radius:999px;font-weight:600;text-decoration:none;border:1px solid var(--line);background:var(--glass);transition:transform .2s,box-shadow .2s}
.pf .btn.main{background:linear-gradient(100deg,var(--violet),var(--cyan));border:0;color:#08102A}
.pf .btn:hover{transform:translateY(-3px);box-shadow:0 10px 30px -10px var(--cyan)}
.pf .chip-art{width:100%;max-width:400px;justify-self:center}
.pf .trace{fill:none;stroke:var(--c,var(--cyan));stroke-width:2.5;stroke-linecap:round}
.pf .node{fill:var(--c,var(--cyan))}
.pf .wave{width:100%;height:120px;display:block}.pf .sig{fill:none;stroke:url(#g);stroke-width:3;stroke-linejoin:round}
.pf section{padding:72px 0}.pf h2{font-size:clamp(1.9rem,4vw,2.7rem);font-weight:800;letter-spacing:-.02em;margin-bottom:28px}
.pf .rv{opacity:0}
.pf .about{display:grid;grid-template-columns:auto 1fr;gap:32px;align-items:center}
.pf .avatar{width:170px;height:170px;border-radius:40% 60% 55% 45%/50% 45% 55% 50%;background:linear-gradient(135deg,var(--violet),var(--pink));display:grid;place-items:center;font:800 3.4rem 'Bricolage Grotesque',sans-serif;overflow:hidden}
.pf .avatar img{width:100%;height:100%;object-fit:cover}.pf .about p{max-width:62ch;margin:0 0 12px;font-size:1.08rem;color:#CBD5F5}
.pf .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:32px}
.pf .stat{padding:20px;border-radius:20px;background:var(--glass);border:1px solid var(--line)}
.pf .stat strong{display:block;font:800 2.6rem 'Bricolage Grotesque',sans-serif;color:var(--cyan)}.pf .stat span{color:var(--muted);font-size:.92rem}
.pf .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;perspective:900px}
.pf .card{position:relative;padding:24px;border-radius:24px;background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(10px);overflow:hidden;
  transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .2s ease-out,border-color .2s}
.pf .card::before{content:"";position:absolute;inset:0;background:radial-gradient(260px circle at var(--mx,50%) var(--my,0%),color-mix(in srgb,var(--c) 30%,transparent),transparent 70%);opacity:0;transition:opacity .25s}
.pf .card:hover{border-color:var(--c)}.pf .card:hover::before{opacity:1}.pf .card>*{position:relative}
.pf .card h3{font-size:1.35rem;margin-bottom:10px}.pf .card p{margin:0 0 14px;color:var(--muted)}
.pf .tag{font-size:.85rem;font-weight:600;color:var(--c);display:block;margin-bottom:8px}
.pf .chips{display:flex;flex-wrap:wrap;gap:8px}.pf .chip{padding:4px 12px;border-radius:999px;font-size:.86rem;background:color-mix(in srgb,var(--c) 18%,transparent);border:1px solid color-mix(in srgb,var(--c) 40%,transparent)}
.pf .more{display:inline-block;margin-top:14px;font-weight:600;color:var(--c)}
.pf .two{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.pf .cert{padding:16px 20px;border-radius:16px;background:var(--glass);border:1px solid var(--line);border-left:5px solid var(--sun);margin-bottom:12px;font-weight:600}
.pf .contact{text-align:center;padding:56px 24px;border-radius:32px;background:linear-gradient(135deg,rgba(139,92,246,.35),rgba(34,211,238,.25));border:1px solid var(--line)}
.pf .contact p{color:#CBD5F5;margin:12px 0 24px}.pf .contact .btn{margin:6px}
.pf footer{text-align:center;color:var(--muted);padding:32px 0;font-size:.9rem}
@media (max-width:760px){.pf .hero,.pf .two,.pf .about{grid-template-columns:1fr}.pf .hero{min-height:auto;padding:40px 0}.pf nav div{gap:10px;font-size:.8rem}}
@media (prefers-reduced-motion:reduce){.pf .aur,.pf .type i{animation:none}.pf .card,.pf .btn{transition:none}}
`;

export default function Portfolio(): JSX.Element {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ i: 0, n: 0, del: false });

  // typewriter for the rotating skill line
  useEffect(() => {
    const w = DATA.roles[t.i];
    const wait = !t.del && t.n === w.length ? 1400 : t.del ? 30 : 70;
    const id = setTimeout(() => {
      if (!t.del) setT(t.n < w.length ? { ...t, n: t.n + 1 } : { ...t, del: true });
      else setT(t.n > 0 ? { ...t, n: t.n - 1 } : { i: (t.i + 1) % DATA.roles.length, n: 0, del: false });
    }, wait);
    return () => clearTimeout(id);
  }, [t]);

  // all anime.js motion lives here
  useEffect(() => {
    const el = root.current!;
    const show = () => el.querySelectorAll<HTMLElement>(".rv,.ch").forEach((e) => (e.style.opacity = "1"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return show();

    anime.timeline({ easing: "easeOutExpo" })
      .add({ targets: el.querySelectorAll(".ch"), translateY: [60, 0], opacity: [0, 1], delay: anime.stagger(45), duration: 900 })
      .add({ targets: el.querySelectorAll(".trace"), strokeDashoffset: [anime.setDashoffset, 0], duration: 1600, delay: anime.stagger(120), easing: "easeInOutSine" }, "-=600")
      .add({ targets: el.querySelectorAll(".node"), scale: [0, 1], opacity: [0, 1], delay: anime.stagger(80), duration: 500 }, "-=900");

    const morph = anime({ targets: el.querySelector(".sig"), d: [{ value: SQUARE }], direction: "alternate", loop: true, duration: 2200, delay: 600, easing: "easeInOutQuad" });

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      anime({ targets: e.target, translateY: [32, 0], opacity: [0, 1], duration: 800, easing: "easeOutCubic" });
      e.target.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => {
        const o = { v: +(c.dataset.from || 0) };
        anime({ targets: o, v: +c.dataset.count!, round: 1, duration: 1600, easing: "easeOutExpo", update: () => (c.textContent = String(o.v)) });
      });
    }), { threshold: 0.15 });
    el.querySelectorAll(".rv").forEach((e) => io.observe(e));

    const onScroll = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { morph.pause(); io.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);

  // spotlight + tilt on cards
  const move = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const s = e.currentTarget.style;
    s.setProperty("--mx", `${x * 100}%`); s.setProperty("--my", `${y * 100}%`);
    s.setProperty("--ry", `${(x - 0.5) * 8}deg`); s.setProperty("--rx", `${(0.5 - y) * 8}deg`);
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
  const cardProps = { onMouseMove: move, onMouseLeave: leave };

  return (
    <div className="pf" ref={root}>
      <style>{CSS}</style>
      <div className="bar" ref={bar} />
      <div className="aur a" /><div className="aur b" />
      <div className="wrap">
        <nav aria-label="Main">
          <b>{initials}</b>
          <div><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
        </nav>

        <header className="hero">
          <div>
            <h1 aria-label={DATA.name}>
              {[...DATA.name].map((c, i) => <span key={i} className="ch" aria-hidden style={{ display: "inline-block", opacity: 0 }}>{c === " " ? "\u00A0" : c}</span>)}
            </h1>
            <p className="head">{DATA.headline}</p>
            <p className="type" aria-live="off">{DATA.roles[t.i].slice(0, t.n)}<i /></p>
            <p className="loc">{DATA.location}</p>
            <div className="btns">
              <a className="btn main" href="#projects">See my projects</a>
              <a className="btn" href={DATA.links.resume}>Download resume</a>
            </div>
          </div>
          <svg className="chip-art" viewBox="0 0 400 400" role="img" aria-label="A microchip with traces radiating outward">
            <rect x="120" y="120" width="160" height="160" rx="24" fill="rgba(255,255,255,.06)" stroke="#8B5CF6" strokeWidth="3" />
            <text x="200" y="215" textAnchor="middle" fontSize="54" fontWeight="800" fill="#EAF0FF" fontFamily="Bricolage Grotesque, sans-serif">{initials}</text>
            {PINS.map((y, i) => {
              const col = ["violet", "cyan", "pink"][i % 3];
              const cy = 120 + ((y - 70) / 240) * 160 + 0; // pin y on chip edge
              return (
                <g key={y} className={col}>
                  <path className="trace" d={`M120 ${cy} H70 L${40} ${y}`} />
                  <circle className="node" cx="40" cy={y} r="6" />
                  <path className="trace" d={`M280 ${cy} H330 L${360} ${y}`} />
                  <circle className="node" cx="360" cy={y} r="6" />
                </g>
              );
            })}
          </svg>
        </header>

        <svg className="wave" viewBox="0 0 1000 120" preserveAspectRatio="none" role="img" aria-label="An analog sine wave morphing into a digital square wave">
          <defs><linearGradient id="g"><stop offset="0" stopColor="#8B5CF6" /><stop offset=".5" stopColor="#22D3EE" /><stop offset="1" stopColor="#F472B6" /></linearGradient></defs>
          <path className="sig" d={SINE} />
        </svg>

        <section id="about">
          <h2 className="rv">About</h2>
          <div className="about rv">
            <div className="avatar">{DATA.photo ? <img src={DATA.photo} alt={DATA.name} /> : initials}</div>
            <div>{DATA.about.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <div className="stats">
            {DATA.stats.map((s) => (
              <div key={s.label} className="stat rv">
                <strong data-count={s.n} data-from={s.from}>{s.n}</strong><span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <h2 className="rv">Skills</h2>
          <div className="grid">
            {DATA.skills.map((s) => (
              <div key={s.group} className={`card rv ${s.c}`} {...cardProps}>
                <h3>{s.group}</h3>
                <div className="chips">{s.items.map((i) => <span key={i} className="chip">{i}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="rv">Projects</h2>
          <div className="grid">
            {DATA.projects.map((p) => (
              <article key={p.title} className={`card rv ${p.c}`} {...cardProps}>
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="chips">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                <a className="more" href={p.link}>View project</a>
              </article>
            ))}
          </div>
        </section>

        <section className="two">
          <div className="rv">
            <h2>Certifications</h2>
            {DATA.certs.map((c) => <div key={c} className="cert">{c}</div>)}
          </div>
          <div className="rv">
            <h2>Education</h2>
            <div className="card sun" {...cardProps}>
              <h3>{DATA.education.school}</h3><p>{DATA.education.degree}</p>
              <span className="chip">{DATA.education.years}</span>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="contact rv">
            <h2>Let's build something</h2>
            <p>Open to internships and collaborations in VLSI and electronics.</p>
            <a className="btn main" href={`mailto:${DATA.email}`}>Email me</a>
            <a className="btn" href={DATA.links.linkedin}>LinkedIn</a>
            <a className="btn" href={DATA.links.github}>GitHub</a>
          </div>
        </section>

        <footer>© {new Date().getFullYear()} {DATA.name}</footer>
      </div>
    </div>
  );
}
