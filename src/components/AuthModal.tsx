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

type Step = 'details' | 'team';

export default function AuthModal({
  onClose,
  onComplete,
}: Props) {

  const [step, setStep] = useState<Step>('details');

  const [name, setName] = useState('');

  const [role, setRole] = useState<Role>('leader');

  const [teamName, setTeamName] = useState('');

  const [teamCode, setTeamCode] = useState('');

  const [generatedCode, setGeneratedCode] = useState('');

  const handleContinue = () => {
    if (!name.trim()) return;

    setStep('team');
  };

  const generateTeamCode = () => {
    const code =
      'PR-' +
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    setGeneratedCode(code);
  };

  const handleEnter = () => {

    if (role === 'leader') {

      if (!teamName.trim()) return;

      if (!generatedCode) {
        generateTeamCode();
        return;
      }

      onComplete(
        name.trim(),
        role,
        generatedCode
      );

    } else {

      if (!teamCode.trim()) return;

      onComplete(
        name.trim(),
        role,
        teamCode.toUpperCase()
      );
    }
  };

  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="relative w-full max-w-md bg-card border border-ink-20 rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-20">

          <div>

            <div className="flex items-center gap-2">

              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">

                <span className="text-white font-mono text-xs font-bold">
                  PR
                </span>

              </div>

              <div>

                <p className="font-display text-xl text-ink">
                  PeerRater
                </p>

                <p className="font-mono text-[8px] text-ink-50 uppercase tracking-widest">
                  Team Setup
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-paper flex items-center justify-center text-ink-50 hover:text-ink"
          >
            ✕
          </button>

        </div>

        {/* Progress */}

        <div className="px-6 pt-5">

          <div className="flex items-center gap-2">

            <div className={`h-1 flex-1 rounded-full ${
              step === 'details'
                ? 'bg-teal'
                : 'bg-teal'
            }`} />

            <div className={`h-1 flex-1 rounded-full ${
              step === 'team'
                ? 'bg-teal'
                : 'bg-ink-20'
            }`} />

          </div>

        </div>

        {/* ================= STEP 1 ================= */}

        {step === 'details' && (

          <div className="px-6 py-6">

            <div className="mb-6">

              <p className="font-mono text-[9px] uppercase tracking-widest text-teal mb-2">
                Step 1 of 2
              </p>

              <h2 className="font-display text-3xl text-ink">
                Who are you?
              </h2>

              <p className="text-sm text-ink-50 mt-2">
                Tell your team how you'll be participating.
              </p>

            </div>

            {/* Name */}

            <div className="mb-6">

              <label className="font-mono text-[9px] uppercase tracking-wider text-ink-50 mb-2 block">
                Your Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full bg-paper border border-ink-20 rounded-xl px-4 py-3 text-sm text-ink outline-none focus:border-teal transition-colors"
              />

            </div>

            {/* Role */}

            <div>

              <label className="font-mono text-[9px] uppercase tracking-wider text-ink-50 mb-3 block">
                Your Role
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Leader */}

                <button
                  onClick={() => setRole('leader')}
                  className={`text-left border rounded-xl p-4 transition-all ${
                    role === 'leader'
                      ? 'border-teal bg-teal-muted ring-1 ring-teal/20'
                      : 'border-ink-20 bg-paper hover:border-ink-50'
                  }`}
                >

                  <div className="flex items-center justify-between mb-3">

                    <span className="text-xl">
                      👑
                    </span>

                    {role === 'leader' && (
                      <span className="text-teal text-sm">
                        ✓
                      </span>
                    )}

                  </div>

                  <p className="font-semibold text-sm text-ink">
                    Team Leader
                  </p>

                  <p className="text-[11px] text-ink-50 mt-1 leading-relaxed">
                    Create a team, manage members and coordinate tasks.
                  </p>

                </button>

                {/* Member */}

                <button
                  onClick={() => setRole('member')}
                  className={`text-left border rounded-xl p-4 transition-all ${
                    role === 'member'
                      ? 'border-teal bg-teal-muted ring-1 ring-teal/20'
                      : 'border-ink-20 bg-paper hover:border-ink-50'
                  }`}
                >

                  <div className="flex items-center justify-between mb-3">

                    <span className="text-xl">
                      👤
                    </span>

                    {role === 'member' && (
                      <span className="text-teal text-sm">
                        ✓
                      </span>
                    )}

                  </div>

                  <p className="font-semibold text-sm text-ink">
                    Team Member
                  </p>

                  <p className="text-[11px] text-ink-50 mt-1 leading-relaxed">
                    Join an existing team using a team pass code.
                  </p>

                </button>

              </div>

            </div>

            {/* Continue */}

            <button
              onClick={handleContinue}
              disabled={!name.trim()}
              className="w-full mt-7 bg-teal text-white font-semibold py-3.5 rounded-xl hover:bg-teal-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Continue →
            </button>

          </div>

        )}

        {/* ================= STEP 2 ================= */}

        {step === 'team' && (

          <div className="px-6 py-6">

            <div className="mb-6">

              <button
                onClick={() => setStep('details')}
                className="font-mono text-[9px] uppercase tracking-wider text-teal hover:underline mb-4"
              >
                ← Back
              </button>

              <p className="font-mono text-[9px] uppercase tracking-widest text-teal mb-2">
                Step 2 of 2
              </p>

              <h2 className="font-display text-3xl text-ink">

                {role === 'leader'
                  ? 'Create your team'
                  : 'Join your team'}

              </h2>

              <p className="text-sm text-ink-50 mt-2">

                {role === 'leader'
                  ? 'Set up your project team and invite members.'
                  : 'Enter the pass code shared by your team leader.'}

              </p>

            </div>

            {/* ================= LEADER ================= */}

            {role === 'leader' && (

              <div>

                <div className="mb-5">

                  <label className="font-mono text-[9px] uppercase tracking-wider text-ink-50 mb-2 block">
                    Team / Project Name
                  </label>

                  <input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Smart Campus Project"
                    className="w-full bg-paper border border-ink-20 rounded-xl px-4 py-3 text-sm text-ink outline-none focus:border-teal transition-colors"
                  />

                </div>

                {/* Generated pass */}

                {generatedCode ? (

                  <div className="bg-teal-muted border border-teal/30 rounded-xl p-5 mb-5">

                    <p className="font-mono text-[9px] uppercase tracking-widest text-teal mb-2">
                      Your Team Pass Code
                    </p>

                    <p className="font-mono text-2xl font-bold tracking-[0.15em] text-ink">
                      {generatedCode}
                    </p>

                    <p className="text-xs text-ink-50 mt-3 leading-relaxed">
                      Share this code with your teammates so they can join
                      your project.
                    </p>

                  </div>

                ) : (

                  <div className="bg-paper border border-dashed border-ink-20 rounded-xl p-5 mb-5">

                    <p className="font-semibold text-sm text-ink">
                      Team Pass System
                    </p>

                    <p className="text-xs text-ink-50 mt-1.5 leading-relaxed">
                      PeerRater will generate a unique team pass code for
                      members to join your project.
                    </p>

                  </div>

                )}

              </div>

            )}

            {/* ================= MEMBER ================= */}

            {role === 'member' && (

              <div>

                <label className="font-mono text-[9px] uppercase tracking-wider text-ink-50 mb-2 block">
                  Team Pass Code
                </label>

                <input
                  value={teamCode}
                  onChange={(e) =>
                    setTeamCode(e.target.value.toUpperCase())
                  }
                  placeholder="PR-ABCDE"
                  className="w-full bg-paper border border-ink-20 rounded-xl px-4 py-3 font-mono text-sm tracking-widest text-ink uppercase outline-none focus:border-teal transition-colors"
                />

                <div className="flex items-start gap-2 mt-4 bg-paper border border-ink-20 rounded-xl p-4">

                  <span className="text-sm">
                    ℹ
                  </span>

                  <p className="text-xs text-ink-50 leading-relaxed">
                    Ask your team leader for the team pass code. Once entered,
                    you'll be added to the team workspace.
                  </p>

                </div>

              </div>

            )}

            {/* Action */}

            <button
              onClick={handleEnter}
              disabled={
                role === 'leader'
                  ? !teamName.trim()
                  : !teamCode.trim()
              }
              className="w-full mt-7 bg-teal text-white font-semibold py-3.5 rounded-xl hover:bg-teal-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >

              {role === 'leader'
                ? generatedCode
                  ? 'Enter Project Dashboard →'
                  : 'Generate Team Pass →'
                : 'Join Team →'}

            </button>

          </div>

        )}

      </div>

    </div>
  );
}