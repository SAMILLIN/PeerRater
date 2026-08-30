import { useState } from 'react';
import type { Page, Role } from '../App';
import AuthModal from '../components/AuthModal';

interface Props {
  onNavigate: (page: Page) => void;
  onEnterApp: (
    name: string,
    role: Role,
    teamCode: string
  ) => void;
}

const workflowSteps = [
  { num: '01', label: 'Create Tasks', sub: null },
  { num: '02', label: 'Claim & Complete Work', sub: null },
  { num: '03', label: 'Review Contributions', sub: null },
  { num: '04', label: 'Split Co-Contributions', sub: '← Innovation' },
  { num: '05', label: 'Generate Receipt', sub: null },
];

function ReceiptIllustration() {
  const members = [
    { name: 'Alex', pts: '42 pts', pct: 42, assist: '+12', color: '#0F766E' },
    { name: 'Sam', pts: '28 pts', pct: 28, assist: null, color: '#5EEAD4' },
    { name: 'Rahul', pts: '18 pts', pct: 18, assist: null, color: '#D4A853' },
    { name: 'Priya', pts: '12 pts', pct: 12, assist: null, color: '#C4764A' },
  ];

  return (
    <div className="relative select-none">
      <div className="bg-card border border-ink-20 rounded-2xl p-6 w-[300px] shadow-sm">
        <div className="text-center mb-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-50">
            ─── CONTRIBUTION RECEIPT ───
          </p>
        </div>

        <div className="mb-3">
          <p className="font-mono text-[9px] text-ink-50">
            Smart Campus Project
          </p>
          <p className="font-mono text-[8px] text-ink-50 mt-0.5">
            PR-2026-014 · 4 MEMBERS · 10 TASKS
          </p>
        </div>

        <div className="border-t border-dashed border-ink-20 my-3" />

        <div className="space-y-3 mb-4">
          {members.map((m) => (
            <div key={m.name}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: m.color }}
                  >
                    <span className="text-white font-mono text-[8px] font-bold">
                      {m.name[0]}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-ink">
                    {m.name}
                  </span>

                  {m.assist && (
                    <span className="font-mono text-[8px] text-teal bg-teal-muted px-1.5 py-0.5 rounded">
                      {m.assist}
                    </span>
                  )}
                </div>

                <span className="font-mono text-xs font-semibold text-ink">
                  {m.pts}
                </span>
              </div>

              <div className="h-1.5 bg-paper-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${m.pct}%`,
                    backgroundColor: m.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-ink-20 pt-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-50">
              Total Verified Points
            </span>

            <span className="font-mono text-sm font-bold text-ink">
              100 pts
            </span>
          </div>
        </div>

        <div className="border-2 border-teal rounded-lg py-2 px-3 text-center transform -rotate-1">
          <span className="font-mono text-[10px] text-teal font-bold uppercase tracking-[0.15em]">
            ✓ VERIFIED CONTRIBUTION RECORD
          </span>
        </div>

        <p className="font-mono text-[8px] text-ink-50 text-center mt-3">
          Generated: August 30, 2026
        </p>
      </div>

      {/* Co-contribution badge */}
      <div className="absolute -top-4 -right-5 bg-teal text-white rounded-xl px-3 py-2 shadow-lg">
        <p className="font-mono text-[9px] font-bold uppercase tracking-wide">
          🤝 Co-Contribution
        </p>
        <p className="font-mono text-[8px] opacity-80 mt-0.5">
          Alex assists Sam · +12 pts
        </p>
      </div>

      {/* Awaiting review badge */}
      <div className="absolute -bottom-3 -left-4 bg-card border border-ink-20 rounded-xl px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pending-bg border border-pending-border" />

          <p className="font-mono text-[9px] text-pending font-semibold uppercase tracking-wider">
            Awaiting Review
          </p>
        </div>

        <p className="font-mono text-[8px] text-ink-50 mt-0.5">
          PR-103 · 30 pts
        </p>
      </div>
    </div>
  );
}

export default function Landing({
  onNavigate,
  onEnterApp,
}: Props) {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="min-h-full bg-paper">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-ink-20 bg-card/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-mono text-xs font-bold">
                PR
              </span>
            </div>

            <span className="font-display text-xl text-ink">
              PeerRater
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how"
              className="text-sm text-ink-50 hover:text-ink transition-colors font-medium"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-sm text-ink-50 hover:text-ink transition-colors font-medium"
            >
              Features
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSignIn(true)}
              className="text-sm font-medium text-ink-50 hover:text-ink transition-colors px-3 py-2"
            >
              Sign In
            </button>

            <button
              onClick={() => setShowSignIn(true)}
              className="bg-teal text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-teal-dark transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-teal-muted border border-teal/20 rounded-full px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />

              <span className="font-mono text-[10px] text-teal uppercase tracking-widest">
                Fair Contribution Tracking
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl text-ink leading-[1.1] mb-6">
              Fair contribution
              <br />
              deserves a
              <br />
              <em>fair record.</em>
            </h1>

            <p className="text-lg text-ink-50 mb-10 leading-relaxed max-w-[420px]">
              PeerRater helps student teams track tasks, verify
              contributions, recognize collaboration, and generate a
              transparent contribution receipt.
            </p>

            <div className="flex items-center gap-5">
              <button
                onClick={() => setShowSignIn(true)}
                className="bg-teal text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-teal-dark transition-colors flex items-center gap-2 text-sm"
              >
                Create a Project
                <span className="text-base">→</span>
              </button>

              <a
                href="#how"
                className="text-sm font-medium text-ink-50 hover:text-ink transition-colors flex items-center gap-2"
              >
                <span className="w-9 h-9 rounded-full border border-ink-20 bg-card flex items-center justify-center text-xs shadow-sm">
                  ▶
                </span>

                See How It Works
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ReceiptIllustration />
          </div>

        </div>
      </section>

      {/* ================= WORKFLOW ================= */}

      <section
        id="how"
        className="border-y border-ink-20 bg-card py-14"
      >
        <div className="max-w-6xl mx-auto px-6">

          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-50 text-center mb-10">
            The PeerRater Workflow
          </p>

          <div className="flex flex-col md:flex-row items-start gap-0">
            {workflowSteps.map((step, i) => (
              <div
                key={step.num}
                className="flex md:flex-col items-center flex-1 relative"
              >
                {i < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-[-calc(50%-20px)] w-[calc(100%-40px)] border-t border-dashed border-ink-20" />
                )}

                <div className="flex md:flex-col items-center gap-4 md:gap-3 w-full md:text-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-mono text-[11px] font-bold ${
                      i === 4
                        ? 'bg-teal text-white border-2 border-teal'
                        : 'border-2 border-ink-20 bg-card text-teal'
                    }`}
                  >
                    {step.num}
                  </div>

                  <div className="md:px-2">
                    <p className="text-sm font-semibold text-ink leading-tight">
                      {step.label}
                    </p>

                    {step.sub && (
                      <p className="font-mono text-[9px] text-teal uppercase tracking-wider mt-1">
                        {step.sub}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE INNOVATION ================= */}

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-4">
              Core Innovation
            </p>

            <h2 className="font-display text-4xl lg:text-5xl text-ink mb-5 leading-tight">
              Not just task
              <br />
              completion.
            </h2>

            <p className="text-ink-50 leading-relaxed mb-5 text-[15px]">
              "Completing a task doesn't always mean completing it alone."
            </p>

            <p className="text-ink-50 leading-relaxed text-[15px]">
              PeerRater allows teams to recognize significant assistance,
              revisions, and collaborative work — instead of automatically
              giving all points to the original task owner.
            </p>

            <div className="mt-8 p-5 bg-card border border-ink-20 rounded-xl">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
                Core Principle
              </p>

              <blockquote className="font-display text-xl text-ink italic leading-relaxed">
                "Claiming a task is not the same as earning all the credit."
              </blockquote>
            </div>
          </div>

          <div className="space-y-4">

            <div className="bg-card border border-revision-border/50 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-revision-bg flex items-center justify-center shrink-0">
                  <span className="text-revision font-bold text-sm">
                    ✗
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-ink mb-1.5">
                    Traditional Task Managers
                  </p>

                  <p className="text-sm text-ink-50 leading-relaxed">
                    Track task ownership. If you claimed it, you get 100%
                    credit — even if a teammate had to fix or rewrite the
                    work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-teal-muted border border-teal/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                  <span className="text-teal font-bold text-sm">
                    ✓
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-ink mb-1.5">
                    PeerRater
                  </p>

                  <p className="text-sm text-ink-70 leading-relaxed">
                    Tracks verified contribution. Anyone who significantly
                    helps gets recognized before final points are awarded
                    through peer review.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-ink-20 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-paper flex items-center justify-center shrink-0 border border-ink-20">
                <span className="text-sm">🤝</span>
              </div>

              <div>
                <p className="font-semibold text-ink mb-1.5">
                  Co-Contribution Splits
                </p>

                <p className="text-sm text-ink-50 leading-relaxed">
                  When one teammate significantly helps another complete a
                  task, both contributors get recognized. Points are split
                  proportionally based on team review.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="border-t border-ink-20 bg-card py-16"
      >
        <div className="max-w-6xl mx-auto px-6">

          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-50 text-center mb-3">
            Features
          </p>

          <h2 className="font-display text-4xl text-ink text-center mb-12">
            Everything your team needs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: '📋',
                tag: 'Workflow',
                title: 'Structured Task Lifecycle',
                desc: 'Create → Claim → Submit → Review → Verify. Every task goes through a defined process that prevents contribution disputes.',
              },
              {
                icon: '⚖️',
                tag: 'Fairness',
                title: 'Contribution Split System',
                desc: 'When a teammate significantly helps, both contributors get credit. No more all-or-nothing credit that ignores real collaboration.',
              },
              {
                icon: '📄',
                tag: 'Transparency',
                title: 'Verified Receipt Export',
                desc: 'Generate a verified, shareable contribution record for your instructor — transparent, fair, and tamper-evident.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-paper border border-ink-20 rounded-xl p-6"
              >
                <div className="text-2xl mb-4">
                  {f.icon}
                </div>

                <span className="font-mono text-[9px] uppercase tracking-widest text-teal bg-teal-muted px-2 py-0.5 rounded mb-3 inline-block">
                  {f.tag}
                </span>

                <h3 className="font-semibold text-ink mb-2 mt-2">
                  {f.title}
                </h3>

                <p className="text-sm text-ink-50 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-5">
          Ready to build fairly?
        </p>

        <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4 max-w-2xl mx-auto leading-tight">
          PeerRater doesn't just ask who did a task.
        </h2>

        <p className="text-ink-50 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
          It recognizes how work was actually completed.
        </p>

        <button
          onClick={() => setShowSignIn(true)}
          className="bg-teal text-white font-semibold px-10 py-4 rounded-xl hover:bg-teal-dark transition-colors text-base"
        >
          Create a Project →
        </button>

        <p className="font-mono text-[10px] text-ink-50 mt-4 uppercase tracking-wider">
          Free for student teams · No credit card required
        </p>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-ink-20 bg-card py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-teal rounded flex items-center justify-center shrink-0">
              <span className="text-white font-mono text-[9px] font-bold">
                PR
              </span>
            </div>

            <span className="font-display text-base text-ink">
              PeerRater
            </span>
          </div>

          <p className="font-mono text-[9px] text-ink-50 text-center">
            © 2026 PeerRater · Hackathon Project · Fair Contribution for Everyone
          </p>

          <div className="flex items-center gap-1">
            <span className="font-mono text-[9px] text-ink-50 uppercase tracking-wider">
              Built with
            </span>

            <span className="text-sm ml-1">
              ♥
            </span>
          </div>

        </div>
      </footer>

      {/* ================= AUTH MODAL ================= */}

      {showSignIn && (
        <AuthModal
          onClose={() => setShowSignIn(false)}
          onComplete={(name, role, teamCode) => {
            setShowSignIn(false);
            onEnterApp(name, role, teamCode);
          }}
        />
      )}

    </div>
  );
}