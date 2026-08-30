import { useState } from 'react';
import type { Page } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
}

type ReviewChoice = 'verified' | 'co-contribution' | 'revision' | null;

// ─── contribution split bar ───────────────────────────────────────────────────

function ContributorBar({
  name,
  initials,
  avatarBg,
  avatarText,
  pct,
  pts,
  label,
  barColor,
  isLive,
  liveValue,
  onLiveChange,
}: {
  name: string;
  initials: string;
  avatarBg: string;
  avatarText?: string;
  pct: number;
  pts: number;
  label: string;
  barColor: string;
  isLive?: boolean;
  liveValue?: number;
  onLiveChange?: (v: number) => void;
}) {
  const displayPct = isLive && liveValue !== undefined ? liveValue : pct;
  const displayPts = isLive && liveValue !== undefined ? Math.round((liveValue / 100) * 30) : pts;

  return (
    <div className="flex items-center gap-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-2.5 w-36 shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0"
          style={{ backgroundColor: avatarBg, color: avatarText ?? '#FFFFFF' }}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-ink text-sm leading-tight">{name}</p>
          <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider">{label}</p>
        </div>
      </div>

      {/* Bar */}
      <div className="flex-1 relative">
        <div className="h-4 bg-paper-100 rounded-full overflow-hidden border border-ink-20">
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{ width: `${displayPct}%`, backgroundColor: barColor }}
          />
        </div>
        {isLive && onLiveChange && (
          <input
            type="range"
            min={10}
            max={90}
            value={liveValue}
            onChange={(e) => onLiveChange(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
          />
        )}
      </div>

      {/* Stats */}
      <div className="text-right w-24 shrink-0">
        <span className="font-mono text-lg font-bold text-ink leading-none">{displayPct}%</span>
        <p className="font-mono text-[10px] text-ink-50">{displayPts} pts</p>
      </div>
    </div>
  );
}

// ─── review option card ────────────────────────────────────────────────────────

function OptionCard({
  id,
  icon,
  label,
  sublabel,
  desc,
  featured,
  selected,
  onClick,
  accentClass,
  selectedClass,
  iconBg,
}: {
  id: ReviewChoice;
  icon: string;
  label: string;
  sublabel?: string;
  desc: string;
  featured?: boolean;
  selected: boolean;
  onClick: () => void;
  accentClass: string;
  selectedClass: string;
  iconBg: string;
}) {
  const baseCard = selected
    ? `border-2 ${selectedClass}`
    : featured
      ? `border-2 border-teal bg-teal-muted/30 hover:bg-teal-muted/50`
      : `border-2 border-ink-20 bg-card hover:border-ink-50 hover:bg-paper/60`;

  return (
    <button
      onClick={onClick}
      className={`relative text-left rounded-2xl p-5 transition-all flex flex-col gap-3 h-full ${baseCard}`}
    >
      {featured && !selected && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[8px] uppercase tracking-widest bg-teal text-white px-2.5 py-1 rounded-full font-bold">
            PeerRater Innovation
          </span>
        </div>
      )}

      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg}`}>
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex items-start gap-2 mb-1.5 flex-wrap">
          <p className={`font-mono text-[10px] font-bold uppercase tracking-wider leading-tight ${accentClass}`}>
            {label}
          </p>
        </div>
        {sublabel && (
          <p className="font-mono text-[9px] text-teal uppercase tracking-wider mb-1.5">
            {sublabel}
          </p>
        )}
        <p className="text-xs text-ink-70 leading-relaxed">{desc}</p>
      </div>

      {/* Radio indicator */}
      <div
        className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected ? selectedClass.replace('bg-', 'border-').split(' ')[0] + ' ' + selectedClass.split(' ').find(c => c.startsWith('bg-')) : 'border-ink-20'
        }`}
      >
        {selected && <span className="text-white text-[9px] font-bold leading-none">✓</span>}
      </div>
    </button>
  );
}

// ─── main component ────────────────────────────────────────────────────────────

export default function ContributionReview({ onNavigate }: Props) {
  const [choice, setChoice] = useState<ReviewChoice>(null);
  const [samPct, setSamPct] = useState(60);
  const [confirmed, setConfirmed] = useState(false);

  const alexPct = 100 - samPct;
  const samPts = Math.round((samPct / 100) * 30);
  const alexPts = 30 - samPts;

  function handleConfirm() {
    setConfirmed(true);
    setTimeout(() => onNavigate('analytics'), 1400);
  }

  return (
    <div className="p-8 max-w-[800px]">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2.5 mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-sm text-ink-50 hover:text-ink transition-colors font-medium flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>
        <span className="text-ink-20">·</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-50">
          Task Review
        </span>
      </div>

      {/* Task identity block */}
      <div className="mb-8">
        <h1 className="font-display text-[42px] text-ink leading-tight mb-3">
          Build Authentication System
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] text-ink-50 uppercase tracking-widest">
            TASK #PR-103
          </span>
          <span className="text-ink-20">·</span>
          <span className="font-mono text-[11px] font-bold text-ink">30 CONTRIBUTION POINTS</span>
          <span className="text-ink-20">·</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-pending-bg text-pending border border-pending-border px-2 py-0.5 rounded-md uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-pending" />
            UNDER REVIEW
          </span>
          <span className="text-ink-20">·</span>
          <span className="font-mono text-[10px] text-ink-50">Submitted Aug 30, 2026</span>
        </div>
      </div>

      {/* Primary contributor card */}
      <div className="bg-card border border-ink-20 rounded-2xl p-6 mb-8">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-50 mb-4">
          Primary Contributor
        </p>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#5EEAD4] flex items-center justify-center text-[#0A5C56] font-bold text-lg font-mono">
              S
            </div>
            <div>
              <p className="font-semibold text-ink text-lg leading-tight">Sam</p>
              <p className="font-mono text-[10px] text-ink-50 mt-0.5">
                Claimed: Aug 28 · Submitted: Aug 30
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg bg-pending-bg text-pending border border-pending-border">
              <span className="w-1.5 h-1.5 rounded-full bg-pending" />
              PENDING VERIFICATION
            </span>
            <p className="font-mono text-[9px] text-ink-50 mt-2">30 pts at stake</p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-ink-20 grid grid-cols-3 gap-4">
          {[
            { label: 'Time Logged', value: '6.5 hrs' },
            { label: 'Commits', value: '12' },
            { label: 'Files Changed', value: '8' },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider mb-0.5">
                {m.label}
              </p>
              <p className="font-mono text-sm font-semibold text-ink">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review decision */}
      <div className="mb-8">
        <h2 className="font-display text-2xl text-ink mb-1">Review Contribution</h2>
        <p className="text-sm text-ink-50 mb-8">
          Was this work completed independently, or did another team member significantly contribute?
        </p>

        {/* Three-column option cards — CO-CONTRIBUTION featured center */}
        <div className="grid grid-cols-3 gap-4 relative">
          {/* VERIFIED */}
          <div
            className={`rounded-2xl border-2 p-5 text-left transition-all cursor-pointer flex flex-col gap-3 ${
              choice === 'verified'
                ? 'border-verified bg-verified-bg'
                : 'border-ink-20 bg-card hover:border-verified/40 hover:bg-verified-bg/20'
            }`}
            onClick={() => setChoice('verified')}
          >
            <div className="w-10 h-10 rounded-xl bg-verified-bg border border-verified-border flex items-center justify-center text-verified font-bold text-lg">
              ✓
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-verified mb-1.5">
                Verified — Full Credit
              </p>
              <p className="text-xs text-ink-70 leading-relaxed">
                The work meets requirements. Sam receives all 30 contribution points.
              </p>
            </div>
            <div
              className={`mt-auto w-5 h-5 rounded-full border-2 flex items-center justify-center self-end ${
                choice === 'verified' ? 'border-verified bg-verified' : 'border-ink-20'
              }`}
            >
              {choice === 'verified' && <span className="text-white text-[9px] font-bold">✓</span>}
            </div>
          </div>

          {/* CO-CONTRIBUTION — featured */}
          <div
            className={`rounded-2xl border-2 p-5 text-left transition-all cursor-pointer flex flex-col gap-3 relative ${
              choice === 'co-contribution'
                ? 'border-teal bg-teal-muted shadow-sm'
                : 'border-teal bg-teal-muted/40 hover:bg-teal-muted/70 shadow-sm'
            }`}
            onClick={() => setChoice('co-contribution')}
          >
            {/* Innovation badge */}
            <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
              <span className="font-mono text-[8px] uppercase tracking-widest bg-teal text-white px-3 py-1 rounded-full font-bold">
                PeerRater Innovation
              </span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-xl">
              🤝
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-teal mb-1.5">
                Co-Contribution
              </p>
              <p className="font-mono text-[8px] text-teal/80 uppercase tracking-wider mb-2">
                — Key Feature
              </p>
              <p className="text-xs text-ink-70 leading-relaxed">
                Another teammate significantly helped complete, fix, improve, or rewrite this work.
                Split points fairly between contributors.
              </p>
            </div>
            <div
              className={`mt-auto w-5 h-5 rounded-full border-2 flex items-center justify-center self-end ${
                choice === 'co-contribution' ? 'border-teal bg-teal' : 'border-teal/30'
              }`}
            >
              {choice === 'co-contribution' && (
                <span className="text-white text-[9px] font-bold">✓</span>
              )}
            </div>
          </div>

          {/* REVISION */}
          <div
            className={`rounded-2xl border-2 p-5 text-left transition-all cursor-pointer flex flex-col gap-3 ${
              choice === 'revision'
                ? 'border-revision bg-revision-bg'
                : 'border-ink-20 bg-card hover:border-revision/40 hover:bg-revision-bg/20'
            }`}
            onClick={() => setChoice('revision')}
          >
            <div className="w-10 h-10 rounded-xl bg-revision-bg border border-revision-border flex items-center justify-center text-revision font-bold text-lg">
              ↻
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-revision mb-1.5">
                Revision Required
              </p>
              <p className="text-xs text-ink-70 leading-relaxed">
                Return the task. Sam will need to make changes before points can be awarded.
              </p>
            </div>
            <div
              className={`mt-auto w-5 h-5 rounded-full border-2 flex items-center justify-center self-end ${
                choice === 'revision' ? 'border-revision bg-revision' : 'border-ink-20'
              }`}
            >
              {choice === 'revision' && (
                <span className="text-white text-[9px] font-bold">✓</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CO-CONTRIBUTION SPLIT ── */}
      {choice === 'co-contribution' && (
        <div className="bg-card border border-teal/30 rounded-2xl overflow-hidden mb-6 slide-in">
          {/* Section header */}
          <div className="bg-teal/5 border-b border-teal/20 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-teal mb-0.5">
                Contribution Split
              </p>
              <p className="font-semibold text-ink text-base">Distribute the 30 points</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50">
                Task Value
              </p>
              <p className="font-mono text-2xl font-bold text-ink">30 PTS</p>
            </div>
          </div>

          <div className="p-6">
            {/* Contributor bars */}
            <div className="space-y-5 mb-6">
              {/* Sam bar */}
              <ContributorBar
                name="Sam"
                initials="S"
                avatarBg="#5EEAD4"
                avatarText="#0A5C56"
                pct={60}
                pts={18}
                label="Primary Contributor"
                barColor="#5EEAD4"
                isLive
                liveValue={samPct}
                onLiveChange={setSamPct}
              />

              {/* Alex bar */}
              <ContributorBar
                name="Alex"
                initials="A"
                avatarBg="#0F766E"
                pct={40}
                pts={12}
                label="Assisting Contributor"
                barColor="#0F766E"
                isLive
                liveValue={alexPct}
              />
            </div>

            {/* Drag hint */}
            <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center mb-5">
              ← drag Sam's bar to adjust the split →
            </p>

            {/* Combined 100% bar */}
            <div className="mb-2">
              <div className="flex h-6 rounded-lg overflow-hidden border border-ink-20">
                <div
                  className="h-full flex items-center justify-end pr-2 transition-all duration-150"
                  style={{ width: `${samPct}%`, backgroundColor: '#5EEAD4' }}
                >
                  {samPct > 18 && (
                    <span className="font-mono text-[9px] font-bold text-[#0A5C56]">
                      Sam {samPct}%
                    </span>
                  )}
                </div>
                <div
                  className="h-full flex items-center justify-start pl-2 transition-all duration-150"
                  style={{ width: `${alexPct}%`, backgroundColor: '#0F766E' }}
                >
                  {alexPct > 18 && (
                    <span className="font-mono text-[9px] font-bold text-white">
                      Alex {alexPct}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 100% indicator */}
            <div className="flex items-center justify-center gap-2 py-2.5 mb-5">
              <span className="font-mono text-[10px] text-ink-50">{samPct}%</span>
              <span className="font-mono text-[10px] text-ink-20">+</span>
              <span className="font-mono text-[10px] text-ink-50">{alexPct}%</span>
              <span className="font-mono text-[10px] text-ink-20">=</span>
              <span className="font-mono text-[11px] font-bold text-verified">100%</span>
              <span className="text-verified text-sm">✓</span>
            </div>

            {/* Point breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#F0FEFA] border border-[#5EEAD4]/30 rounded-xl p-4 text-center">
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-1">
                  Sam receives
                </p>
                <p className="font-mono text-3xl font-bold text-ink">{samPts}</p>
                <p className="font-mono text-[9px] text-ink-50 uppercase">points</p>
              </div>
              <div className="bg-teal-muted/50 border border-teal/20 rounded-xl p-4 text-center">
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-1">
                  Alex receives
                </p>
                <p className="font-mono text-3xl font-bold text-ink">{alexPts}</p>
                <p className="font-mono text-[9px] text-ink-50 uppercase">points</p>
              </div>
            </div>

            {/* Principle quote */}
            <div className="bg-paper border border-ink-20 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-teal-muted flex items-center justify-center shrink-0">
                <span className="text-teal font-bold text-xs">PR</span>
              </div>
              <blockquote className="font-display italic text-[15px] text-ink leading-snug">
                "Claiming a task is not the same as earning all the credit."
              </blockquote>
            </div>

            {/* Confirm / stamp */}
            {confirmed ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="stamp-in border-2 border-teal rounded-xl px-10 py-4 bg-teal-muted/50 inline-block">
                  <p className="font-mono text-[12px] text-teal font-bold uppercase tracking-[0.2em] text-center">
                    ✓ CO-CONTRIBUTION VERIFIED
                  </p>
                  <p className="font-mono text-[9px] text-teal/70 text-center mt-1 uppercase tracking-wider">
                    Sam {samPct}% · Alex {alexPct}% · Aug 30, 2026
                  </p>
                </div>
                <p className="font-mono text-[10px] text-ink-50 uppercase tracking-wider">
                  Updating contribution receipt…
                </p>
              </div>
            ) : (
              <button
                onClick={handleConfirm}
                className="w-full bg-teal text-white font-bold py-4 rounded-xl hover:bg-teal-dark transition-colors text-sm tracking-wide uppercase font-mono"
              >
                Confirm Verified Split · Sam {samPct}% / Alex {alexPct}%
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── FULL CREDIT confirm ── */}
      {choice === 'verified' && (
        <div className="bg-verified-bg border border-verified-border rounded-2xl p-6 mb-6 slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-verified/10 border border-verified-border flex items-center justify-center">
              <span className="text-verified font-bold text-lg">✓</span>
            </div>
            <div>
              <p className="font-semibold text-ink">Approve Full Credit</p>
              <p className="text-xs text-ink-50 mt-0.5">
                Sam will receive all 30 contribution points for Build Authentication System.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('analytics')}
            className="w-full bg-verified text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Confirm Full Credit — 30 pts awarded to Sam
          </button>
        </div>
      )}

      {/* ── REVISION confirm ── */}
      {choice === 'revision' && (
        <div className="bg-revision-bg border border-revision-border rounded-2xl p-6 mb-6 slide-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-revision/10 border border-revision-border flex items-center justify-center">
              <span className="text-revision font-bold text-lg">↻</span>
            </div>
            <div>
              <p className="font-semibold text-ink">Return for Revision</p>
              <p className="text-xs text-ink-50 mt-0.5">
                Sam will be notified. No points awarded until resubmission is verified.
              </p>
            </div>
          </div>
          <textarea
            className="w-full bg-white border border-revision-border/50 rounded-lg p-3 text-sm text-ink mb-3 resize-none focus:outline-none focus:ring-1 focus:ring-revision/30"
            rows={3}
            placeholder="Describe what needs to be revised before points can be awarded…"
          />
          <button className="w-full bg-revision text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm">
            Return Task for Revision
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-ink-20 pt-6 mt-2">
        <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center">
          PeerRater · Contribution Review · TASK #PR-103 · August 30, 2026
        </p>
      </div>
    </div>
  );
}
