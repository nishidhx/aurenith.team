import { useState, useEffect, useRef } from "react";

const TEAM_MEMBERS_DEFAULT = [
  {
    id: 1,
    name: "Nishidh Singh",
    role: "Team Lead & Full Stack Developer",
    bio: "Architecting scalable solutions and leading the team through 36-hour hackathon sprints with precision.",
    skills: ["React", "Node.js", "System Design", "Leadership"],
    imageUrl: "https://lh3.googleusercontent.com/a/ACg8ocLAHeo_eskSlNluIeVhhsHz9Y_nsUEHePd98lZHbbG6J9oa0FmT1Q=s576-c-no",
    color: "#7C3AED",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Navya Pandey",
    role: "UI/UX Designer & Frontend Dev",
    bio: "Crafting pixel-perfect interfaces that tell compelling stories under extreme time pressure.",
    skills: ["Figma", "React", "CSS", "Motion Design"],
    imageUrl: "https://res.cloudinary.com/ddyqtrozr/image/upload/v1776164527/669619778_18098241095081095_7557225678232371301_n_g5qrej.jpg",
    color: "#DB2777",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Sushant Kumar",
    role: "Backend Engineer",
    bio: "Building robust APIs and database architectures that keep running even when the coffee runs out.",
    skills: ["Python", "PostgreSQL", "Docker", "FastAPI"],
    imageUrl: "https://res.cloudinary.com/ddyqtrozr/image/upload/v1776164527/656513698_18042567035759427_3217782346034976655_n_gkmel9.jpg",
    color: "#0891B2",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Saumil Taragi",
    role: "ML & Data Engineer",
    bio: "Turning raw data into intelligent systems that give the team an unfair advantage in hackathons.",
    skills: ["PyTorch", "scikit-learn", "Pandas", "LLMs"],
    imageUrl: "https://res.cloudinary.com/ddyqtrozr/image/upload/v1776164527/640398929_17880704628470762_7423979341466807403_n_njsetk.jpg",
    color: "#059669",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: 5,
    name: "Dhairya Panwar",
    role: "DevOps & Cloud Architect",
    bio: "Keeping deployments smooth and infrastructure bulletproof when it matters most.",
    skills: ["AWS", "Kubernetes", "CI/CD", "Linux"],
    imageUrl: "https://res.cloudinary.com/ddyqtrozr/image/upload/v1776164527/658080579_17975595809991544_8633499326915011487_n_on03mo.jpg",
    color: "#D97706",
    social: { github: "#", linkedin: "#" },
  },
];

const HACKATHONS_DEFAULT = [
  {
    id: 1,
    name: "36-Hour National Hackathon",
    result: "🏆 Winners",
    year: "2026",
    description: "Built an AI-powered platform in 36 hours, got into top5 winning teams against 200+ teams.",
    tags: ["AI/ML", "Full Stack"],
    highlight: true,
  },
  {
    id: 3,
    name: "We Make Devs",
    result: "⭐ Top 20",
    year: "2025",
    description: "Ranked in top 20 teams across europe aws campus challenge beating 2000+.",
    tags: ["IoT", "Edge", "Top 20"],
    highlight: false,
  },
];

function AvatarImage({ src, alt, children }) {
  const [error, setError] = useState(false);
  useEffect(() => setError(false), [src]);
  if (src && !error) return <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setError(true)} />;
  return children;
}

const ADMIN_PASS = "aurenith2024";

export default function App() {
  const [page, setPage] = useState("home"); // home | admin | login
  const [members, setMembers] = useState(TEAM_MEMBERS_DEFAULT);
  const [hackathons, setHackathons] = useState(HACKATHONS_DEFAULT);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [editingHack, setEditingHack] = useState(null);
  const [activeSection, setActiveSection] = useState("members");
  const [newMember, setNewMember] = useState(false);
  const [newHack, setNewHack] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASS) {
      setPage("admin");
      setAdminError("");
    } else {
      setAdminError("Invalid credentials. Access denied.");
    }
  };

  const saveMember = (member) => {
    if (member.id) {
      setMembers((prev) => prev.map((m) => (m.id === member.id ? member : m)));
    } else {
      setMembers((prev) => [...prev, { ...member, id: Date.now() }]);
    }
    setEditingMember(null);
    setNewMember(false);
  };

  const deleteMember = (id) => setMembers((prev) => prev.filter((m) => m.id !== id));
  const saveHack = (h) => {
    if (h.id) setHackathons((prev) => prev.map((x) => (x.id === h.id ? h : x)));
    else setHackathons((prev) => [...prev, { ...h, id: Date.now() }]);
    setEditingHack(null);
    setNewHack(false);
  };
  const deleteHack = (id) => setHackathons((prev) => prev.filter((h) => h.id !== id));

  if (page === "login") return <LoginPage adminPass={adminPass} setAdminPass={setAdminPass} onLogin={handleAdminLogin} error={adminError} onBack={() => setPage("home")} />;
  if (page === "admin") return <AdminPage members={members} hackathons={hackathons} onSaveMember={saveMember} onDeleteMember={deleteMember} onSaveHack={saveHack} onDeleteHack={deleteHack} editingMember={editingMember} setEditingMember={setEditingMember} editingHack={editingHack} setEditingHack={setEditingHack} activeSection={activeSection} setActiveSection={setActiveSection} newMember={newMember} setNewMember={setNewMember} newHack={newHack} setNewHack={setNewHack} onLogout={() => setPage("home")} />;

  return (
    <div style={{ background: "#050508", minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#fff", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: #7C3AED; border-radius: 4px; }
        .cursor { position: fixed; width: 12px; height: 12px; background: #7C3AED; border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: transform 0.1s; mix-blend-mode: screen; }
        .cursor-ring { position: fixed; width: 36px; height: 36px; border: 1px solid rgba(124,58,237,0.5); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: all 0.15s ease; }
        .nav-link { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; cursor: none; }
        .nav-link:hover { color: #fff; }
        .glow-btn { background: linear-gradient(135deg, #7C3AED, #DB2777); border: none; color: #fff; padding: 14px 32px; border-radius: 100px; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; cursor: none; transition: opacity 0.2s, transform 0.2s; font-family: inherit; }
        .glow-btn:hover { opacity: 0.85; transform: scale(1.03); }
        .ghost-btn { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); padding: 12px 28px; border-radius: 100px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: none; transition: all 0.2s; font-family: inherit; }
        .ghost-btn:hover { border-color: rgba(124,58,237,0.6); color: #fff; }
        .member-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 32px; transition: all 0.3s; cursor: none; position: relative; overflow: hidden; }
        .member-card::before { content: ''; position: absolute; inset: 0; border-radius: 20px; background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,58,237,0.06), transparent 40%); opacity: 0; transition: opacity 0.3s; }
        .member-card:hover::before { opacity: 1; }
        .member-card:hover { border-color: rgba(124,58,237,0.3); transform: translateY(-4px); }
        .hack-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; transition: all 0.3s; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 24px; }
        .hack-card.highlight { border-color: rgba(124,58,237,0.4); background: rgba(124,58,237,0.05); }
        .hack-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.12); }
        @media (max-width: 640px) {
          .hack-card { grid-template-columns: 1fr; gap: 16px; padding: 20px; }
          .hack-card > div:last-child { text-align: left !important; }
        }
        .skill-tag { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; padding: 4px 12px; font-size: 11px; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); }
        .grid-noise { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='rgba(255,255,255,0.03)' stroke-width='0.5'/%3E%3C/svg%3E"); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes pulse-ring { 0%{transform:scale(0.9);opacity:0.8} 100%{transform:scale(1.4);opacity:0} }
        @keyframes fade-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fade-up 0.7s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .trophy-glow { filter: drop-shadow(0 0 20px rgba(251,191,36,0.6)); animation: float 3s ease-in-out infinite; }
        .section-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #7C3AED; font-weight: 600; margin-bottom: 12px; }
        .nav-container { padding: 20px 48px; }
        .desktop-nav { display: flex; gap: 36px; align-items: center; }
        .mobile-nav-toggle { display: none; background: none; border: none; color: #fff; font-size: 24px; cursor: none; z-index: 101; padding: 4px; line-height: 1; }
        .mobile-menu { position: fixed; inset: 0; background: rgba(5,5,8,0.98); backdrop-filter: blur(20px); z-index: 99; display: flex; flex-direction: column; gap: 32px; transform: translateY(-100%); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); align-items: center; justify-content: center; opacity: 0; pointer-events: none; }
        .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .mobile-menu .nav-link { font-size: 28px; letter-spacing: 0.1em; color: rgba(255,255,255,0.7); }
        .mobile-menu .nav-link:hover { color: #fff; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block; }
          .nav-container { padding: 16px 24px !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="cursor" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-ring" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* Nav */}
      <nav className="nav-container" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", background: scrollY > 50 ? "rgba(5,5,8,0.8)" : "transparent", borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 101 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #DB2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "Syne, sans-serif", overflow: "hidden" }}>
            <img src="/aurenith.png" alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.02em" }}>aurenith<span style={{ color: "#7C3AED" }}>.team</span></span>
        </div>

        <div className="desktop-nav">
          {[["About", "about"], ["Team", "team"], ["Wins", "hackathons"]].map(([label, id]) => (
            <button key={id} className="nav-link" style={{ background: "none", border: "none", fontFamily: "inherit", cursor: "none" }}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>
              {label}
            </button>
          ))}
          <button className="ghost-btn" style={{ fontSize: 11, padding: "8px 20px" }} onClick={() => setPage("login")}>Admin ↗</button>
        </div>

        <button className="mobile-nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {[["About", "about"], ["Team", "team"], ["Wins", "hackathons"]].map(([label, id]) => (
          <button key={id} className="nav-link" style={{ background: "none", border: "none", fontFamily: "inherit", cursor: "none" }}
            onClick={() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenuOpen(false); }}>
            {label}
          </button>
        ))}
        <button className="glow-btn" style={{ fontSize: 14, padding: "14px 32px", marginTop: 24 }} onClick={() => { setPage("login"); setMobileMenuOpen(false); }}>Admin Access</button>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="grid-noise" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", top: "10%", left: "20%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,39,119,0.08) 0%, transparent 70%)", bottom: "20%", right: "15%", pointerEvents: "none" }} />

        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3AED", display: "inline-block" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A78BFA" }}>Active Hackathon Team</span>
        </div>

        <h1 className="fade-up delay-1" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 24 }}>
          We build at<br /><span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #DB2777 50%, #F59E0B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>full speed.</span>
        </h1>

        <p className="fade-up delay-2" style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", maxWidth: 520, lineHeight: 1.7, marginBottom: 48 }}>
          Five engineers. One mission. Turning ideas into working products in 36 hours or less. Recently crowned hackathon champions.
        </p>

        <div className="fade-up delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="glow-btn" onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}>Meet the Team</button>
          <button className="ghost-btn" onClick={() => document.getElementById("hackathons")?.scrollIntoView({ behavior: "smooth" })}>Our Wins</button>
        </div>

        {/* Trophy badge */}
        <div className="fade-up delay-4" style={{ marginTop: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div className="trophy-glow" style={{ fontSize: 56 }}>🏆</div>
          <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 100, padding: "8px 24px" }}>
            <span style={{ fontSize: 13, color: "#FCD34D", letterSpacing: "0.05em" }}>36-Hour Hackathon Champions</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.3 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
        </div>
      </section>

      {/* Stats */}
      <section id="about" style={{ padding: "80px 48px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {[
            { num: "5", label: "Elite Engineers" },
            { num: "36hrs", label: "Fastest Delivery" },
            { num: "3+", label: "Hackathons Won" },
            { num: "200+", label: "Teams Beaten" },
          ].map((s, i) => (
            <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.1}s`, textAlign: "center", padding: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16 }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 44, fontWeight: 800, background: "linear-gradient(135deg, #7C3AED, #DB2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" style={{ padding: "80px 48px", width: "100%" }}>
        <div style={{ marginBottom: 60 }}>
          <div className="section-label">The Team</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Built for speed,<br />wired for impact.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {members.map((m, i) => (
            <div key={m.id} className="member-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", flexShrink: 0, boxShadow: `0 0 20px ${m.color}50`, overflow: "hidden" }}>
                  <AvatarImage src={m.imageUrl} alt={m.name}>
                    <span>{m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</span>
                  </AvatarImage>
                </div>
                <div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{m.role}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>{m.bio}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(m.skills || []).map((s) => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hackathons */}
      <section id="hackathons" style={{ padding: "80px 48px", width: "100%" }}>
        <div style={{ marginBottom: 60 }}>
          <div className="section-label">Battle Record</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em" }}>We don't just<br />participate. We win.</h2>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {hackathons.map((h, i) => (
            <div key={h.id} className={`hack-card fade-up ${h.highlight ? "highlight" : ""}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>{h.name}</span>
                  {h.highlight && <span style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 100, padding: "2px 10px", fontSize: 10, color: "#FCD34D", letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured</span>}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 12 }}>{h.description}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(h.tags || []).map((t) => <span key={t} className="skill-tag">{t}</span>)}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{h.result}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{h.year}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px", textAlign: "center" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>aurenith<span style={{ color: "#7C3AED" }}>.team</span></div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>Built with ⚡ by five engineers who refuse to lose.</p>
      </footer>
    </div>
  );
}

function LoginPage({ adminPass, setAdminPass, onLogin, error, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#050508", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap'); * {box-sizing:border-box;}`}</style>
      <div style={{ width: "100%", maxWidth: 420, padding: 24 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 13, marginBottom: 32, fontFamily: "inherit" }}>← Back to site</button>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #DB2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 24 }}>🔐</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Admin Access</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>aurenith.team internal panel</p>
          <input
            type="password"
            placeholder="Enter access code"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 8 }}
          />
          {error && <p style={{ fontSize: 12, color: "#F87171", marginBottom: 16 }}>{error}</p>}
          <button onClick={onLogin} style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #DB2777)", border: "none", color: "#fff", padding: "14px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: error ? 0 : 8 }}>
            Sign In →
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 20 }}>Hint: aurenith2024</p>
        </div>
      </div>
    </div>
  );
}

function AdminPage({ members, hackathons, onSaveMember, onDeleteMember, onSaveHack, onDeleteHack, editingMember, setEditingMember, editingHack, setEditingHack, activeSection, setActiveSection, newMember, setNewMember, newHack, setNewHack, onLogout }) {
  const emptyMember = { name: "", role: "", bio: "", skills: [], imageUrl: "", color: "#7C3AED", social: { github: "", linkedin: "" } };
  const emptyHack = { name: "", result: "", year: new Date().getFullYear().toString(), description: "", tags: [], highlight: false };
  const [form, setForm] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const openMemberEdit = (m) => { setForm({ ...m, skills: [...(m.skills || [])] }); setEditingMember(m.id); setEditingHack(null); };
  const openNewMember = () => { setForm({ ...emptyMember, skills: [] }); setNewMember(true); setEditingMember(null); };
  const openHackEdit = (h) => { setForm({ ...h, tags: [...(h.tags || [])] }); setEditingHack(h.id); setEditingMember(null); };
  const openNewHack = () => { setForm({ ...emptyHack, tags: [] }); setNewHack(true); setEditingHack(null); };
  const cancelForm = () => { setForm(null); setEditingMember(null); setEditingHack(null); setNewMember(false); setNewHack(false); setSkillInput(""); setTagInput(""); };

  const sideItems = [
    { id: "members", label: "Team Members", icon: "👥" },
    { id: "hackathons", label: "Hackathons", icon: "🏆" },
  ];

  const inp = (style = {}) => ({ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none", width: "100%", ...style });

  return (
    <div style={{ minHeight: "100vh", background: "#050508", fontFamily: "'DM Sans', sans-serif", color: "#fff", display: "flex" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap'); * {box-sizing:border-box;} input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.2)}`}</style>

      {/* Sidebar */}
      <div style={{ width: 240, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "24px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 16 }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16 }}>aurenith<span style={{ color: "#7C3AED" }}>.team</span></div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Admin Dashboard</div>
        </div>
        {sideItems.map((s) => (
          <button key={s.id} onClick={() => { setActiveSection(s.id); cancelForm(); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", background: activeSection === s.id ? "rgba(124,58,237,0.15)" : "transparent", border: "none", color: activeSection === s.id ? "#A78BFA" : "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", textAlign: "left", fontFamily: "inherit", borderLeft: activeSection === s.id ? "2px solid #7C3AED" : "2px solid transparent", transition: "all 0.2s" }}>
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", padding: "0 20px" }}>
          <button onClick={onLogout} style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px", color: "rgba(255,255,255,0.3)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>← Back to Site</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
        {activeSection === "members" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28 }}>Team Members</h1>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{members.length} members</p>
              </div>
              <button onClick={openNewMember} style={{ background: "linear-gradient(135deg, #7C3AED, #DB2777)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>+ Add Member</button>
            </div>

            {(newMember || editingMember) && form && (
              <MemberForm form={form} setForm={setForm} skillInput={skillInput} setSkillInput={setSkillInput} inp={inp} onSave={() => onSaveMember(form)} onCancel={cancelForm} />
            )}

            <div style={{ display: "grid", gap: 12 }}>
              {members.map((m) => (
                <div key={m.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0, overflow: "hidden" }}>
                    <AvatarImage src={m.imageUrl} alt={m.name}>
                      {m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                    </AvatarImage>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{m.role}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => openMemberEdit(m)} style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A78BFA", padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                    <button onClick={() => onDeleteMember(m.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "hackathons" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28 }}>Hackathons</h1>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{hackathons.length} entries</p>
              </div>
              <button onClick={openNewHack} style={{ background: "linear-gradient(135deg, #7C3AED, #DB2777)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>+ Add Hackathon</button>
            </div>

            {(newHack || editingHack) && form && (
              <HackForm form={form} setForm={setForm} tagInput={tagInput} setTagInput={setTagInput} inp={inp} onSave={() => onSaveHack(form)} onCancel={cancelForm} />
            )}

            <div style={{ display: "grid", gap: 12 }}>
              {hackathons.map((h) => (
                <div key={h.id} style={{ background: h.highlight ? "rgba(124,58,237,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${h.highlight ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{h.highlight ? "🏆" : "⭐"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{h.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{h.result} · {h.year}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => openHackEdit(h)} style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A78BFA", padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                    <button onClick={() => onDeleteHack(h.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MemberForm({ form, setForm, skillInput, setSkillInput, inp, onSave, onCancel }) {
  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };
  const initials = form.name ? form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?";
  return (
    <div style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 28, marginBottom: 24 }}>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{form.id ? "Edit Member" : "New Member"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <input style={inp()} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input style={inp()} placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      </div>
      <textarea style={{ ...inp(), height: 80, resize: "vertical", marginBottom: 12 }} placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />

      {/* Image URL + preview */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: form.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#fff", flexShrink: 0, overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)" }}>
          <AvatarImage src={form.imageUrl} alt="preview">
            <span>{initials}</span>
          </AvatarImage>
        </div>
        <input style={inp({ flex: 1 })} placeholder="Profile image URL (optional)" value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input style={inp({ flex: 1 })} placeholder="Add skill & press Enter" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
        <button onClick={addSkill} style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.4)", color: "#A78BFA", padding: "0 16px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Add</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {form.skills.map((s) => (
          <span key={s} onClick={() => setForm({ ...form, skills: form.skills.filter((x) => x !== s) })} style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: 11, color: "#A78BFA", cursor: "pointer" }}>{s} ×</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <label style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Fallback color:</label>
        <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ width: 40, height: 32, border: "none", background: "none", cursor: "pointer" }} />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Used when no image is set</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onSave} style={{ background: "linear-gradient(135deg, #7C3AED, #DB2777)", border: "none", color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>Save</button>
        <button onClick={onCancel} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", padding: "10px 20px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
      </div>
    </div>
  );
}

function HackForm({ form, setForm, tagInput, setTagInput, inp, onSave, onCancel }) {
  const addTag = () => {
    if (tagInput.trim() && !(form.tags || []).includes(tagInput.trim())) {
      setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };
  return (
    <div style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 28, marginBottom: 24 }}>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{form.id ? "Edit Hackathon" : "New Hackathon"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
        <input style={inp()} placeholder="Hackathon name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input style={inp()} placeholder="Result (e.g. 🏆 Winners)" value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} />
        <input style={inp()} placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
      </div>
      <textarea style={{ ...inp(), height: 72, resize: "vertical", marginBottom: 12 }} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input style={inp({ flex: 1 })} placeholder="Add tag & press Enter" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
        <button onClick={addTag} style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.4)", color: "#A78BFA", padding: "0 16px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Add</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {(form.tags || []).map((t) => (
          <span key={t} onClick={() => setForm({ ...form, tags: form.tags.filter((x) => x !== t) })} style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: 11, color: "#A78BFA", cursor: "pointer" }}>{t} ×</span>
        ))}
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
        <input type="checkbox" checked={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.checked })} style={{ accentColor: "#7C3AED" }} />
        Feature this hackathon (golden highlight)
      </label>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onSave} style={{ background: "linear-gradient(135deg, #7C3AED, #DB2777)", border: "none", color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>Save</button>
        <button onClick={onCancel} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", padding: "10px 20px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
      </div>
    </div>
  );
}
