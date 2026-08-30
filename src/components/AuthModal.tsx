import { useState } from 'react';
import type { Role } from '../App';

interface Props {
  onClose: () => void;
  onComplete: (
    name: string,
    role: Role,
    teamCode: string
  ) => void;
}

export default function AuthModal({
  onClose,
  onComplete,
}: Props) {
  const [step, setStep] = useState(1);

  const [name, setName] = useState('');

  const [role, setRole] = useState<Role>('member');

  const [teamMode, setTeamMode] = useState<
    'create' | 'join'
  >('create');

  const [teamCode, setTeamCode] = useState('');

  const generateTeamCode = () => {
    const code =
      'PR-' +
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    setTeamCode(code);
  };

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    }

    if (step === 2) {
      if (teamMode === 'create' && !teamCode) {
        generateTeamCode();
      }

      setStep(3);
    }
  };

  const handleComplete = () => {
    if (!name.trim()) return;

    if (!teamCode.trim()) {
      const fallbackCode = 'PR-DEMO';
      onComplete(name, role, fallbackCode);
      return;
    }

    onComplete(name, role, teamCode);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-ink-20 rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="border-b border-ink-20 px-6 py-5 flex items-center justify-between">

          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-teal mb-1">
              PeerRater Setup
            </p>

            <h2 className="font-display text-2xl text-ink">
              {step === 1 && 'Tell us about yourself'}
              {step === 2 && 'Choose your team'}
              {step === 3 && 'Confirm your setup'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-ink-20 text-ink-50 hover:text-ink hover:bg-paper transition-colors"
          >
            ✕
          </button>

        </div>

        {/* Progress */}
        <div className="px-6 pt-5">

          <div className="flex gap-2">

            {[1, 2, 3].map((number) => (
              <div
                key={number}
                className={`h-1 flex-1 rounded-full ${
                  number <= step
                    ? 'bg-teal'
                    : 'bg-ink-20'
                }`}
              />
            ))}

          </div>

        </div>

        <div className="p-6">

          {/* ================= STEP 1 ================= */}

          {step === 1 && (
            <div>

              <p className="text-sm text-ink-50 mb-6">
                Enter your name and select your role in the
                project team.
              </p>

              <label className="block mb-5">

                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-50">
                  Your Name
                </span>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-ink-20 bg-paper text-ink outline-none focus:border-teal transition-colors"
                />

              </label>

              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-50 mb-3">
                Your Role
              </p>

              <div className="grid grid-cols-2 gap-3">

                {/* Leader */}
                <button
                  onClick={() => setRole('leader')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    role === 'leader'
                      ? 'border-teal bg-teal-muted ring-1 ring-teal/20'
                      : 'border-ink-20 hover:border-ink-50'
                  }`}
                >

                  <div className="text-xl mb-2">
                    👑
                  </div>

                  <p className="font-semibold text-ink text-sm">
                    Team Leader
                  </p>

                  <p className="text-xs text-ink-50 mt-1">
                    Create and manage the project.
                  </p>

                </button>

                {/* Member */}
                <button
                  onClick={() => setRole('member')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    role === 'member'
                      ? 'border-teal bg-teal-muted ring-1 ring-teal/20'
                      : 'border-ink-20 hover:border-ink-50'
                  }`}
                >

                  <div className="text-xl mb-2">
                    👥
                  </div>

                  <p className="font-semibold text-ink text-sm">
                    Team Member
                  </p>

                  <p className="text-xs text-ink-50 mt-1">
                    Join and contribute to a project.
                  </p>

                </button>

              </div>

            </div>
          )}

          {/* ================= STEP 2 ================= */}

          {step === 2 && (
            <div>

              <p className="text-sm text-ink-50 mb-6">
                Create a new team or join an existing one using
                a team pass code.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">

                <button
                  onClick={() => setTeamMode('create')}
                  className={`p-4 rounded-xl border text-left ${
                    teamMode === 'create'
                      ? 'border-teal bg-teal-muted'
                      : 'border-ink-20'
                  }`}
                >

                  <p className="font-semibold text-sm text-ink">
                    Create Team
                  </p>

                  <p className="text-xs text-ink-50 mt-1">
                    Generate a new team pass.
                  </p>

                </button>

                <button
                  onClick={() => setTeamMode('join')}
                  className={`p-4 rounded-xl border text-left ${
                    teamMode === 'join'
                      ? 'border-teal bg-teal-muted'
                      : 'border-ink-20'
                  }`}
                >

                  <p className="font-semibold text-sm text-ink">
                    Join Team
                  </p>

                  <p className="text-xs text-ink-50 mt-1">
                    Enter a team pass code.
                  </p>

                </button>

              </div>

              {teamMode === 'create' && (

                <div className="bg-paper border border-ink-20 rounded-xl p-5">

                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-50 mb-3">
                    Your Team Pass
                  </p>

                  {teamCode ? (
                    <div className="flex items-center justify-between">

                      <span className="font-mono text-xl font-bold text-teal">
                        {teamCode}
                      </span>

                      <button
                        onClick={generateTeamCode}
                        className="text-xs text-teal font-semibold"
                      >
                        Regenerate
                      </button>

                    </div>
                  ) : (

                    <button
                      onClick={generateTeamCode}
                      className="w-full border border-teal text-teal py-3 rounded-lg text-sm font-semibold"
                    >
                      Generate Team Pass
                    </button>

                  )}

                </div>

              )}

              {teamMode === 'join' && (

                <div>

                  <label>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-50">
                      Team Pass Code
                    </span>

                    <input
                      value={teamCode}
                      onChange={(e) =>
                        setTeamCode(
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="Example: PR-ABC12"
                      className="mt-2 w-full px-4 py-3 rounded-xl border border-ink-20 bg-paper font-mono uppercase outline-none focus:border-teal"
                    />

                  </label>

                </div>

              )}

            </div>
          )}

          {/* ================= STEP 3 ================= */}

          {step === 3 && (
            <div>

              <p className="text-sm text-ink-50 mb-6">
                Everything looks good. Here's your project setup.
              </p>

              <div className="space-y-4">

                <div className="bg-paper border border-ink-20 rounded-xl p-4 flex justify-between">

                  <span className="text-sm text-ink-50">
                    Name
                  </span>

                  <span className="font-semibold text-ink">
                    {name}
                  </span>

                </div>

                <div className="bg-paper border border-ink-20 rounded-xl p-4 flex justify-between">

                  <span className="text-sm text-ink-50">
                    Role
                  </span>

                  <span className="font-semibold text-teal capitalize">
                    {role === 'leader'
                      ? 'Team Leader'
                      : 'Team Member'}
                  </span>

                </div>

                <div className="bg-paper border border-ink-20 rounded-xl p-4 flex justify-between">

                  <span className="text-sm text-ink-50">
                    Team Pass
                  </span>

                  <span className="font-mono font-bold text-ink">
                    {teamCode || 'PR-DEMO'}
                  </span>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="border-t border-ink-20 px-6 py-4 flex justify-between">

          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm font-medium text-ink-50 hover:text-ink"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !name.trim()}
              className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-dark disabled:opacity-40"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-dark"
            >
              Enter Dashboard →
            </button>
          )}

        </div>

      </div>
    </div>
  );
}