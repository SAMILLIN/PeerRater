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
  { num: '01', label: 'Create or Join a Team' },
  { num: '02', label: 'Create & Claim Tasks' },
  { num: '03', label: 'Complete & Submit Work' },
  { num: '04', label: 'Review Contributions' },
  { num: '05', label: 'Generate Fair Receipt' },
];

function ReceiptIllustration() {
  const members = [
    { name: 'Alex', pts: '42 pts', pct: 42, color: '#0F766E' },
    { name: 'Sam', pts: '28 pts', pct: 28, color: '#5EEAD4' },
    { name: 'Rahul', pts: '18 pts', pct: 18, color: '#D4A853' },
    { name: 'Priya', pts: '12 pts', pct: 12, color: '#C4764A' },
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
            TEAM CONTRIBUTION RECORD
          </p>
        </div>

        <div className="border-t border-dashed border-ink-20 my-3" />

        <div className="space-y-3">

          {members.map((member) => (

            <div key={member.name}>

              <div className="flex justify-between mb-1.5">

                <div className="flex items-center gap-2">

                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: member.color,
                    }}
                  >
                    <span className="text-white text-[8px] font-bold">
                      {member.name[0]}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-ink">
                    {member.name}
                  </span>

                </div>

                <span className="font-mono text-xs font-semibold">
                  {member.pts}
                </span>

              </div>

              <div className="h-1.5 bg-paper-100 rounded-full overflow-hidden">

                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${member.pct}%`,
                    backgroundColor: member.color,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        <div className="border-t border-ink-20 pt-3 mt-4">

          <div className="flex justify-between">

            <span className="font-mono text-[9px] uppercase text-ink-50">
              Verified Points
            </span>

            <span className="font-mono text-sm font-bold">
              100 pts
            </span>

          </div>

        </div>

        <div className="border-2 border-teal rounded-lg py-2 px-3 text-center mt-4">

          <span className="font-mono text-[9px] text-teal font-bold uppercase">
            ✓ VERIFIED CONTRIBUTION
          </span>

        </div>

      </div>

      <div className="absolute -top-4 -right-5 bg-teal text-white rounded-xl px-3 py-2 shadow-lg">

        <p className="font-mono text-[9px] font-bold">
          TEAM PASS
        </p>

        <p className="font-mono text-[8px] opacity-80">
          PR-TEAM01
        </p>

      </div>

    </div>
  );
}

export default function Landing({
  onNavigate,
  onEnterApp,
}: Props) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-paper">

      {/* NAVBAR */}

      <nav className="border-b border-ink-20 bg-card/90 backdrop-blur-sm sticky top-0 z-50">

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-2.5">

            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">

              <span className="text-white font-mono text-xs font-bold">
                PR
              </span>

            </div>

            <span className="font-display text-xl text-ink">
              PeerRater
            </span>

          </div>

          <div className="hidden md:flex gap-8">

            <a
              href="#how"
              className="text-sm text-ink-50 hover:text-ink"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-sm text-ink-50 hover:text-ink"
            >
              Features
            </a>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setShowAuth(true)}
              className="text-sm font-medium text-ink-50 px-3"
            >
              Sign In
            </button>

            <button
              onClick={() => setShowAuth(true)}
              className="bg-teal text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Get Started
            </button>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>

            <div className="inline-flex items-center gap-2 bg-teal-muted border border-teal/20 rounded-full px-3 py-1.5 mb-8">

              <span className="w-1.5 h-1.5 rounded-full bg-teal" />

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

            <p className="text-lg text-ink-50 mb-10 leading-relaxed max-w-[440px]">

              Build your team, manage tasks, track real contributions,
              review collaborative work, and generate a transparent
              contribution record.

            </p>

            <div className="flex items-center gap-5">

              <button
                onClick={() => setShowAuth(true)}
                className="bg-teal text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-teal-dark transition-colors"
              >
                Create or Join a Team →
              </button>

              <a
                href="#how"
                className="text-sm font-medium text-ink-50 hover:text-ink"
              >
                See How It Works
              </a>

            </div>

          </div>

          <div className="flex justify-center lg:justify-end">
            <ReceiptIllustration />
          </div>

        </div>

      </section>

      {/* WORKFLOW */}

      <section
        id="how"
        className="border-y border-ink-20 bg-card py-14"
      >

        <div className="max-w-6xl mx-auto px-6">

          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-50 text-center mb-10">
            The PeerRater Workflow
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            {workflowSteps.map((step) => (

              <div
                key={step.num}
                className="text-center"
              >

                <div className="w-10 h-10 mx-auto rounded-full border-2 border-teal flex items-center justify-center font-mono text-[10px] font-bold text-teal mb-3">

                  {step.num}

                </div>

                <p className="text-sm font-semibold text-ink">
                  {step.label}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* INNOVATION */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>

            <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-4">
              Core Innovation
            </p>

            <h2 className="font-display text-4xl lg:text-5xl text-ink mb-5">
              Not just task
              <br />
              completion.
            </h2>

            <p className="text-ink-50 leading-relaxed">

              Completing a task doesn't always mean completing it alone.
              PeerRater recognizes collaboration and ensures significant
              contributions are fairly acknowledged.

            </p>

            <div className="mt-8 p-5 bg-card border border-ink-20 rounded-xl">

              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
                Core Principle
              </p>

              <blockquote className="font-display text-xl text-ink italic">
                "Claiming a task is not the same as earning all the credit."
              </blockquote>

            </div>

          </div>

          <div className="space-y-4">

            <div className="bg-card border border-ink-20 rounded-xl p-5">

              <h3 className="font-semibold text-ink mb-2">
                👥 Team-Based Projects
              </h3>

              <p className="text-sm text-ink-50">
                Create teams using a unique team pass and allow members
                to join the same workspace.
              </p>

            </div>

            <div className="bg-teal-muted border border-teal/20 rounded-xl p-5">

              <h3 className="font-semibold text-ink mb-2">
                ⚖️ Fair Contribution Splits
              </h3>

              <p className="text-sm text-ink-50">
                Multiple contributors can receive credit when they
                significantly collaborate on a task.
              </p>

            </div>

            <div className="bg-card border border-ink-20 rounded-xl p-5">

              <h3 className="font-semibold text-ink mb-2">
                📄 Verified Contribution Receipt
              </h3>

              <p className="text-sm text-ink-50">
                Generate a transparent contribution record showing
                verified work across the entire team.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="border-t border-ink-20 bg-card py-16"
      >

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="font-display text-4xl text-ink text-center mb-12">
            Everything your team needs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-paper border border-ink-20 rounded-xl p-6">

              <div className="text-2xl mb-4">
                🔐
              </div>

              <h3 className="font-semibold text-ink mb-2">
                Team Pass System
              </h3>

              <p className="text-sm text-ink-50">
                Create or join teams securely using a unique project pass.
              </p>

            </div>

            <div className="bg-paper border border-ink-20 rounded-xl p-6">

              <div className="text-2xl mb-4">
                📋
              </div>

              <h3 className="font-semibold text-ink mb-2">
                Structured Tasks
              </h3>

              <p className="text-sm text-ink-50">
                Track tasks from creation and claiming through submission,
                review, and verification.
              </p>

            </div>

            <div className="bg-paper border border-ink-20 rounded-xl p-6">

              <div className="text-2xl mb-4">
                ⚖️
              </div>

              <h3 className="font-semibold text-ink mb-2">
                Fair Credit
              </h3>

              <p className="text-sm text-ink-50">
                Recognize the people who actually contributed to the work.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-5">
          Ready to build fairly?
        </p>

        <h2 className="font-display text-4xl lg:text-5xl text-ink mb-6">
          Build better teams.
          <br />
          Recognize real work.
        </h2>

        <button
          onClick={() => setShowAuth(true)}
          className="bg-teal text-white font-semibold px-10 py-4 rounded-xl"
        >
          Get Started →
        </button>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-ink-20 bg-card py-8 text-center">

        <p className="font-mono text-[9px] text-ink-50">
          © 2026 PeerRater · Fair Contribution for Everyone
        </p>

      </footer>

      {/* AUTH MODAL */}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onComplete={(
            name,
            role,
            teamCode
          ) => {
            setShowAuth(false);

            onEnterApp(
              name,
              role,
              teamCode
            );
          }}
        />
      )}

    </div>
  );
}