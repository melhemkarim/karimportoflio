"use client";

import { useEffect, useRef, useState } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const PALETTE = ["#C9873A","#D94F3D","#7A9E87","#4A6FA5","#E8C87A","#9B5EA2","#D98B6A","#5B8C6E"];

// ─── Project data with images ─────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "TwoCoded Media",
    category: "Brand Identity",
    year: "2023",
    description: "Founded and led a creative studio — full brand system including stationery, business cards, and visual identity across every touchpoint.",
    tags: ["Branding", "Stationery", "Creative Direction"],
    color: "#D94F3D",
    images: ["/twocoded1.PNG", "/twocoded2.PNG", "/twocoded3.jpeg"],
    span: "wide",
  },
  {
    title: "Saifan",
    category: "Packaging & Print",
    year: "2024–2025",
    description: "Complete visual output for a heritage olive oil brand — product labels for export (Thai, FDA USA, Health Canada), business cards, social media campaigns, and branded exhibition materials. Coordinated production with printing houses end-to-end.",
    tags: ["Label Design", "Export Labels", "Social Media", "Print Production", "Exhibition"],
    color: "#C9873A",
    images: ["/saifan1.png", "/saifan2.png", "/saifan3.jpeg", "/saifan4.jpeg"],
    span: "wide",
  },
  {
    title: "Olivco",
    category: "Packaging Design",
    year: "2024",
    description: "Full packaging system for a natural olive oil soap brand — bar soap box with die-cut design, liquid soap bottle label, brand identity, and a 4-language product catalog. From concept to shelf-ready.",
    tags: ["Packaging", "Die-Cut", "Catalog", "Label Design"],
    color: "#7A9E87",
    images: ["/olivco1.jpeg", "/olivco2.jpeg"],
    span: "normal",
  },
  {
    title: "Sweet House by Maria",
    category: "Social Media Design",
    year: "2024",
    description: "Instagram content strategy and visual design for a Lebanese home bakery — Arabic-language posts with strong food photography, brand-consistent typography, and warm storytelling.",
    tags: ["Social Media", "Arabic Typography", "Content Design"],
    color: "#E8C87A",
    images: ["/maria1.jpeg", "/maria2.jpeg", "/maria3.jpeg"],
    span: "normal",
  },
  {
    title: "Food & Beverage Posters",
    category: "Social Media Posters",
    year: "2023–2024",
    description: "High-impact promotional posters for food clients — bold typographic layouts, product photography, and clear conversion-focused design.",
    tags: ["Poster Design", "Social Media", "Food & Beverage"],
    color: "#4A6FA5",
    images: ["/poster3.png", "/poster4.png"],
    span: "normal",
  },
  {
    title: "Saifan × Chef Sarah Joe",
    category: "Custom Label Design",
    year: "2025",
    description: "Custom-designed wedding gift label for a limited-edition Saifan olive oil collaboration — elegant handcrafted typography, personalised per event.",
    tags: ["Label Design", "Custom Print", "Collaboration"],
    color: "#9B5EA2",
    images: ["/labelchef.png"],
    span: "normal",
  },

];

// ─── Paint blobs ──────────────────────────────────────────────────────────────
const BLOBS = [
  { x: 15, y: 8,  size: 700, color: "#E8400A", opacity: 0.22, delay: 0,    dur: 0.5 },
  { x: 80, y: 5,  size: 600, color: "#4A6FA5", opacity: 0.20, delay: 0.05, dur: 0.5 },
  { x: 50, y: 20, size: 500, color: "#C9873A", opacity: 0.18, delay: 0.1,  dur: 0.4 },
  { x: 5,  y: 40, size: 650, color: "#9B5EA2", opacity: 0.20, delay: 0.15, dur: 0.5 },
  { x: 90, y: 35, size: 550, color: "#D94F3D", opacity: 0.18, delay: 0.2,  dur: 0.4 },
  { x: 35, y: 50, size: 750, color: "#2A9D8F", opacity: 0.22, delay: 0.25, dur: 0.5 },
  { x: 70, y: 55, size: 600, color: "#E8C87A", opacity: 0.18, delay: 0.3,  dur: 0.4 },
  { x: 10, y: 68, size: 580, color: "#4A6FA5", opacity: 0.20, delay: 0.35, dur: 0.5 },
  { x: 55, y: 72, size: 700, color: "#E8400A", opacity: 0.18, delay: 0.4,  dur: 0.4 },
  { x: 85, y: 75, size: 620, color: "#9B5EA2", opacity: 0.22, delay: 0.45, dur: 0.5 },
  { x: 28, y: 85, size: 640, color: "#C9873A", opacity: 0.20, delay: 0.5,  dur: 0.4 },
  { x: 65, y: 90, size: 560, color: "#2A9D8F", opacity: 0.20, delay: 0.55, dur: 0.5 },
  { x: 45, y: 95, size: 500, color: "#D94F3D", opacity: 0.18, delay: 0.6,  dur: 0.4 },
];

// ─── Background ───────────────────────────────────────────────────────────────
function BrushCanvas({ progress }: { progress: number }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "#0D0F1A" }} />
      {BLOBS.map((b, i) => {
        const filled = Math.max(0, Math.min(1, (progress - b.delay) / b.dur));
        return (
          <div key={i} style={{
            position: "absolute", left: `${b.x}%`, top: `${b.y}%`,
            width: b.size, height: b.size,
            transform: `translate(-50%, -50%) scale(${0.3 + filled * 0.7})`,
            opacity: b.opacity * filled, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 40%, ${b.color}, ${b.color}00 70%)`,
            filter: "blur(60px)", mixBlendMode: "screen",
          }} />
        );
      })}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.6, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }} />
    </div>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Cursor trail ─────────────────────────────────────────────────────────────
function CursorTrail() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
  const counter = useRef(0);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      setDots(p => [...p.slice(-18), { x: e.clientX, y: e.clientY, id: counter.current++, color }]);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none" }}>
      {dots.map((d, i) => (
        <div key={d.id} style={{
          position: "absolute", left: d.x, top: d.y, width: 6, height: 6,
          borderRadius: "50%", background: d.color, opacity: (i / dots.length) * 0.5,
          transform: "translate(-50%, -50%)", filter: "blur(0.5px)",
        }} />
      ))}
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(13,15,26,0.95)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "none",
      }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: 24, right: 32, background: "none", border: "none",
        color: "#F5EDD6", fontSize: "28px", cursor: "none", opacity: 0.6, lineHeight: 1,
      }}>✕</button>

      {/* Image */}
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}>
        <img
          src={images[idx]}
          alt=""
          style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px", display: "block" }}
        />
        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }} style={{
              position: "absolute", left: -56, top: "50%", transform: "translateY(-50%)",
              background: "rgba(245,237,214,0.08)", border: "1px solid rgba(245,237,214,0.15)",
              color: "#F5EDD6", width: 44, height: 44, borderRadius: "50%", cursor: "none",
              fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>‹</button>
            <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }} style={{
              position: "absolute", right: -56, top: "50%", transform: "translateY(-50%)",
              background: "rgba(245,237,214,0.08)", border: "1px solid rgba(245,237,214,0.15)",
              color: "#F5EDD6", width: 44, height: 44, borderRadius: "50%", cursor: "none",
              fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>›</button>
          </>
        )}
        {/* Dots */}
        {images.length > 1 && (
          <div style={{ position: "absolute", bottom: -32, left: 0, right: 0, display: "flex", justifyContent: "center", gap: "8px" }}>
            {images.map((_, i) => (
              <div key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} style={{
                width: i === idx ? 20 : 6, height: 6, borderRadius: "3px",
                background: i === idx ? "#C9873A" : "rgba(245,237,214,0.3)",
                transition: "width 0.3s, background 0.3s", cursor: "none",
              }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ project, index, visible }: { project: typeof PROJECTS[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  const openLightbox = (i: number) => { setLightboxStart(i); setLightboxOpen(true); };

  const previewImages = project.images.slice(0, project.span === "wide" ? 3 : 2);

  return (
    <>
      {lightboxOpen && (
        <Lightbox images={project.images} startIndex={lightboxStart} onClose={() => setLightboxOpen(false)} />
      )}
      <div
        className={`reveal ${visible ? "visible" : ""}`}
        style={{
          "--i": index * 0.15,
          gridColumn: project.span === "wide" ? "span 2" : "span 1",
          border: "1px solid rgba(245,237,214,0.08)",
          background: hovered ? "rgba(245,237,214,0.04)" : "rgba(245,237,214,0.015)",
          borderRadius: "6px",
          overflow: "hidden",
          transition: "background 0.4s, transform 0.4s, box-shadow 0.4s",
          transform: hovered ? "translateY(-4px)" : "none",
          boxShadow: hovered ? `0 20px 60px ${project.color}22` : "none",
          cursor: "none",
          position: "relative",
        } as React.CSSProperties}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top accent line */}
        <div style={{
          height: "2px", background: project.color,
          opacity: hovered ? 1 : 0.3, transition: "opacity 0.4s",
        }} />

        {/* Image grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: previewImages.length === 1 ? "1fr" : previewImages.length === 2 ? "1fr 1fr" : "2fr 1fr 1fr",
          gap: "2px",
          height: project.span === "wide" ? "340px" : "240px",
          background: "#0a0c14",
        }}>
          {previewImages.map((src, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              style={{
                overflow: "hidden", position: "relative", cursor: "none",
                background: "#111320",
              }}
            >
              <img
                src={src}
                alt={`${project.title} ${i + 1}`}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
                  transform: hovered ? "scale(1.04)" : "scale(1)",
                }}
              />
              {/* Extra count badge */}
              {i === previewImages.length - 1 && project.images.length > previewImages.length && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(13,15,26,0.7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fraunces', serif",
                  fontSize: "22px", fontWeight: 700, color: "#F5EDD6",
                }}>
                  +{project.images.length - previewImages.length}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{ padding: "28px 32px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: project.color, fontWeight: 500 }}>
              {project.category}
            </span>
            <span style={{ fontSize: "11px", color: "#F5EDD633", fontFamily: "'Fraunces', serif" }}>
              {project.year}
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(20px, 2.2vw, 26px)",
            fontWeight: 700, color: "#F5EDD6",
            lineHeight: 1.2, marginBottom: "10px",
          }}>{project.title}</h3>
          <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#F5EDD666", marginBottom: "20px" }}>
            {project.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "3px 10px", background: `${project.color}18`,
                color: project.color, borderRadius: "2px",
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Hover blob */}
        <div style={{
          position: "absolute", bottom: -30, right: -30, width: 140, height: 140,
          borderRadius: "60% 40% 30% 70%",
          background: `radial-gradient(ellipse, ${project.color}1a, transparent)`,
          filter: "blur(24px)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
          pointerEvents: "none",
        }} />
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 1.5 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 300); return () => clearTimeout(t); }, []);

  const about     = useReveal(0.15);
  const gallery   = useReveal(0.05);
  const philosophy = useReveal(0.15);
  const contact   = useReveal(0.15);

  const fade = (delay: number) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "none" : "translateY(28px)",
    transition: `opacity 1s ${delay}s cubic-bezier(.16,1,.3,1), transform 1s ${delay}s cubic-bezier(.16,1,.3,1)`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0D0F1A; color: #F5EDD6; font-family: 'DM Sans', sans-serif; font-weight: 300; cursor: none; overflow-x: hidden; }
        ::selection { background: #C9873A44; color: #F5EDD6; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal { transition-delay: calc(var(--i, 0) * 1s); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0D0F1A; }
        ::-webkit-scrollbar-thumb { background: #C9873A66; border-radius: 2px; }
        @media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none; } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        @keyframes grow { 0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.5)} }
      `}</style>

      <CursorTrail />
      <BrushCanvas progress={scrollProgress} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8vw", position: "relative", overflow: "hidden" }}>

          {/* Decorative K */}
          <div style={{
            position: "absolute", right: "-2vw", top: "50%", transform: "translateY(-50%)",
            fontSize: "clamp(200px, 30vw, 420px)", fontFamily: "'Fraunces', serif", fontWeight: 900,
            color: "transparent", WebkitTextStroke: "1px rgba(201,135,58,0.10)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.05em",
          }}>K</div>

          <div style={{ maxWidth: "900px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", ...fade(0.2) }}>
              <div style={{ width: 40, height: 1, background: "#C9873A" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9873A", fontWeight: 500 }}>
                Portfolio 2025
              </span>
            </div>

            <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 300, color: "#F5EDD688", marginBottom: "8px", ...fade(0.4) }}>
              Hello, I'm
            </p>

            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(52px, 10vw, 140px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "24px", ...fade(0.5) }}>
              <span style={{ display: "block", color: "#F5EDD6" }}>Karim</span>
              <span style={{ display: "block", color: "transparent", WebkitTextStroke: "2px #C9873A" }}>Melhem</span>
            </h1>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px", border: "1px solid rgba(245,237,214,0.15)", borderRadius: "100px", marginBottom: "48px", ...fade(0.7) }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7A9E87", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "13px", letterSpacing: "0.1em", color: "#F5EDD6aa" }}>
                Graphic & UI/UX Designer — Tripoli, Lebanon
              </span>
            </div>

            <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(16px, 2.2vw, 22px)", fontWeight: 300, color: "#F5EDD6bb", maxWidth: "520px", lineHeight: 1.6, ...fade(0.9) }}>
              I turn concepts into complete visual systems — across packaging, brand identity, UI/UX, and print — with the code skills to build what I design.
            </p>
          </div>

          {/* Scroll cue */}
          <div style={{ position: "absolute", bottom: "48px", left: "8vw", display: "flex", alignItems: "center", gap: "16px", ...fade(1.3) }}>
            <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, #C9873A)", animation: "grow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#F5EDD666" }}>Scroll</span>
          </div>
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════════════════════ */}
        <section ref={about.ref as React.RefObject<HTMLElement>} style={{ padding: "120px 8vw", maxWidth: "1300px", margin: "0 auto" }}>
          <div className={`reveal ${about.visible ? "visible" : ""}`}>
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9873A", fontWeight: 500 }}>About</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginTop: "48px", alignItems: "start" }}>
            <div className={`reveal ${about.visible ? "visible" : ""}`} style={{ "--i": 0.1 } as React.CSSProperties}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#F5EDD6" }}>
                Design is <em style={{ color: "#C9873A", fontStyle: "italic" }}>thinking</em> made visible
              </h2>
            </div>

            <div className={`reveal ${about.visible ? "visible" : ""}`} style={{ "--i": 0.2 } as React.CSSProperties}>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#F5EDD6aa", marginBottom: "28px" }}>
                Creative and production-aware designer with a Bachelor's in Computer Science. I've led branding, packaging, and print production for multiple brands — coordinating with printing houses from brief to shelf-ready file.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#F5EDD6aa", marginBottom: "48px" }}>
                I founded TwoCoded Media, designed complete UI/UX systems in Figma, and write production code in React and Next.js. I also integrate AI tools into my design workflow — using them to accelerate concepting, image creation, and copy without losing creative control.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                {[
                  { n: "CS", label: "Bachelor's degree" },
                  { n: "6+", label: "Brands worked with" },
                  { n: "4", label: "Languages — Olivco catalog" },
                  { n: "1", label: "Studio founded" },
                ].map(s => (
                  <div key={s.n}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: "42px", fontWeight: 900, color: "#C9873A", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: "12px", color: "#F5EDD655", letterSpacing: "0.08em", marginTop: "4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className={`reveal ${about.visible ? "visible" : ""}`} style={{ "--i": 0.3, marginTop: "72px", display: "flex", flexWrap: "wrap", gap: "10px" } as React.CSSProperties}>
            {[
              "Brand Identity", "Packaging & Labels", "Print Production",
              "Die-Cut & Carton Design", "UI/UX Design", "Figma",
              "Social Media Design", "Catalog Design", "Export Labels (FDA · Health Canada)",
              "Adobe Illustrator", "Photoshop", "InDesign",
              "React.js", "Next.js", "Front-End Dev",
              "AI-Assisted Design", "ChatGPT", "Midjourney",
            ].map(skill => (
              <span key={skill}
                style={{ padding: "8px 18px", border: "1px solid rgba(245,237,214,0.12)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.06em", color: "#F5EDD699", transition: "border-color 0.3s, color 0.3s", cursor: "none" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "#C9873A"; (e.target as HTMLElement).style.color = "#C9873A"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "rgba(245,237,214,0.12)"; (e.target as HTMLElement).style.color = "#F5EDD699"; }}
              >{skill}</span>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═══════════════════════════════════════════════════════════ */}
        <section ref={gallery.ref as React.RefObject<HTMLElement>} style={{ padding: "80px 8vw 120px" }}>
          <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
            <div className={`reveal ${gallery.visible ? "visible" : ""}`} style={{ marginBottom: "64px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9873A", fontWeight: 500 }}>Selected Work</span>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginTop: "12px", color: "#F5EDD6" }}>
                Things I've made
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}>
              {PROJECTS.map((project, i) => (
                <GalleryCard key={project.title} project={project} index={i} visible={gallery.visible} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ PHILOSOPHY ════════════════════════════════════════════════════════ */}
        <section ref={philosophy.ref as React.RefObject<HTMLElement>} style={{ padding: "120px 8vw", background: "rgba(245,237,214,0.02)", borderTop: "1px solid rgba(245,237,214,0.06)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className={`reveal ${philosophy.visible ? "visible" : ""}`}>
              <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9873A", fontWeight: 500 }}>How I work</span>
            </div>
            {[
              { n: "01", title: "Design that survives production", body: "A beautiful file that can't be printed is a failed file. I coordinate with printing houses, prep production-ready artwork, understand die-cut specs, and know the difference between screen and shelf — because that's where most design falls apart." },
              { n: "02", title: "From Figma to deployed code", body: "I design in Figma and build in React and Next.js. No translation loss between design and dev — interactive prototypes, responsive layouts, and design systems that actually ship." },
              { n: "03", title: "AI is a tool, not a replacement", body: "I use AI tools to move faster and explore more — generating visuals, iterating concepts, and automating the boring parts. But every decision still goes through a designer's eye. Speed with craft, not instead of it." },
            ].map((item, i) => (
              <div key={item.n}
                className={`reveal ${philosophy.visible ? "visible" : ""}`}
                style={{ "--i": (i + 1) * 0.15, marginTop: "64px", paddingBottom: "64px", borderBottom: "1px solid rgba(245,237,214,0.08)", display: "grid", gridTemplateColumns: "80px 1fr", gap: "32px", alignItems: "start" } as React.CSSProperties}
              >
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "13px", color: "#C9873A55", fontWeight: 700, letterSpacing: "0.1em", paddingTop: "6px" }}>{item.n}</span>
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: "#F5EDD6", lineHeight: 1.2, marginBottom: "16px" }}>{item.title}</h3>
                  <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#F5EDD699" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CONTACT + CV ══════════════════════════════════════════════════════ */}
        <section ref={contact.ref as React.RefObject<HTMLElement>} style={{ padding: "120px 8vw", minHeight: "60vh", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: "1300px", margin: "0 auto", width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

              <div className={`reveal ${contact.visible ? "visible" : ""}`}>
                <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9873A", fontWeight: 500 }}>Let's work</span>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(36px, 5.5vw, 76px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", marginTop: "16px", marginBottom: "32px", color: "#F5EDD6" }}>
                  Have a brief?<br />
                  <em style={{ color: "#C9873A", fontStyle: "italic" }}>Let's talk.</em>
                </h2>
                <a href="mailto:karim.melhemm@gmail.com" style={{ fontSize: "16px", color: "#F5EDD6aa", textDecoration: "none", borderBottom: "1px solid rgba(245,237,214,0.2)", paddingBottom: "2px", transition: "color 0.3s, border-color 0.3s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = "#C9873A"; (e.target as HTMLElement).style.borderBottomColor = "#C9873A"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "#F5EDD6aa"; (e.target as HTMLElement).style.borderBottomColor = "rgba(245,237,214,0.2)"; }}
                >karim.melhemm@gmail.com</a>
              </div>

              <div className={`reveal ${contact.visible ? "visible" : ""}`} style={{ "--i": 0.15 } as React.CSSProperties}>
                <div style={{ padding: "48px", border: "1px solid rgba(245,237,214,0.1)", borderRadius: "4px", background: "rgba(245,237,214,0.03)", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "40% 60% 70% 30%", background: "radial-gradient(ellipse, rgba(201,135,58,0.15), transparent)", filter: "blur(20px)" }} />
                  <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#F5EDD644" }}>Resume</span>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 700, color: "#F5EDD6", margin: "8px 0" }}>Karim Melhem</h3>
                  <p style={{ fontSize: "13px", color: "#F5EDD655", marginBottom: "32px" }}>
                    Graphic & UI/UX Designer — Tripoli, Lebanon<br />
                    Brand · Packaging · UI/UX · Front-End · AI Workflow
                  </p>
                  <a href="/Karim_Melhem_CV_S.pdf" download="Karim_Melhem_CV.pdf"
                    style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "16px 28px", background: "#C9873A", color: "#0D0F1A", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "14px", letterSpacing: "0.06em", borderRadius: "2px", transition: "transform 0.2s, background 0.2s", cursor: "none" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.background = "#D9974A"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.background = "#C9873A"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M5 8l3 3 3-3M2 13h12" stroke="#0D0F1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Download CV
                  </a>
                  <div style={{ marginTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    {[{ label: "Portfolio", href: "https://karimmelhemportfolio.netlify.app" }, { label: "WhatsApp", href: "https://wa.me/96171958051" }, { label: "LinkedIn", href: "#" }].map(link => (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                        style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#F5EDD644", textDecoration: "none", transition: "color 0.3s", cursor: "none" }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color = "#C9873A"}
                        onMouseLeave={e => (e.target as HTMLElement).style.color = "#F5EDD644"}
                      >{link.label}</a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ padding: "32px 8vw", borderTop: "1px solid rgba(245,237,214,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700, color: "#F5EDD633" }}>KM</span>
          <span style={{ fontSize: "11px", color: "#F5EDD622", letterSpacing: "0.1em" }}>© 2025 Karim Melhem</span>
        </footer>
      </div>
    </>
  );
}
