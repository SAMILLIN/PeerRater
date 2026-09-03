import { useState } from 'react';
import type { Page, Task } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
  task: Task;
  onVerify: () => void;
  onSplit: (primaryPercent: number, assistingMember: string) => void;
  onRequestRevision: () => void;
}

type ReviewChoice =
  | 'verified'
  | 'co-contribution'
  | 'revision'
  | null;

export default function ContributionReview({
  onNavigate,
  task,
  onVerify,
  onSplit,
  onRequestRevision,
}: Props) {
  const [choice, setChoice] = useState<ReviewChoice>(null);
  const [samPct, setSamPct] = useState(60);

  const alexPct = 100 - samPct;

  const samPts = Math.round((samPct / 100) * task.points);
  const alexPts = task.points - samPts;

  // Confirm Co-Contribution
  function handleConfirm() {
    onSplit(samPct, 'Alex');
  }

  return (
    <div className="p-8 max-w-[1000px]">

      {/* BACK BUTTON */}
      <div className="flex items-center gap-3 mb-10">
        <button
          onClick={() => onNavigate('taskboard')}
          className="text-sm text-ink-50 hover:text-ink transition-colors"
        >
          ← Back to Task Board
        </button>

        <span className="text-ink-20">·</span>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-50">
          Contribution Review
        </span>
      </div>

      {/* TASK INFO */}
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-50 mb-3">
          Task #{task.id}
        </p>

        <h1 className="font-display text-4xl text-ink mb-4">
          {task.title}
        </h1>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-sm font-bold text-ink">
            {task.points} CONTRIBUTION POINTS
          </span>

          <span className="text-ink-20">·</span>

          <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg bg-pending-bg text-pending border border-pending-border">
            UNDER REVIEW
          </span>
        </div>
      </div>

      {/* PRIMARY CONTRIBUTOR */}
      <div className="bg-card border border-ink-20 rounded-2xl p-7 mb-12">

        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-50 mb-6">
          Primary Contributor
        </p>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
              style={{
                backgroundColor: task.avatarColor || '#5EEAD4',
                color: '#123',
              }}
            >
              {task.assignee?.[0] || 'S'}
            </div>

            <div>
              <p className="text-xl font-semibold text-ink">
                {task.assignee || 'Sam'}
              </p>

              <p className="text-sm text-ink-50">
                Task submitted for contribution verification
              </p>
            </div>

          </div>

          <div className="text-right">
            <p className="font-mono text-2xl font-bold text-ink">
              {task.points}
            </p>

            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50">
              Points at Stake
            </p>
          </div>

        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="mb-10">

        <h2 className="font-display text-3xl text-ink mb-3">
          Review Contribution
        </h2>

        <p className="text-ink-50 mb-8">
          Decide how contribution points should be awarded based on the actual
          work completed.
        </p>

        {/* OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* VERIFIED */}
          <button
            onClick={() => setChoice('verified')}
            className={`relative rounded-2xl border-2 p-6 text-left transition-all min-h-[210px] ${
              choice === 'verified'
                ? 'border-verified bg-verified-bg'
                : 'border-ink-20 bg-card hover:border-verified'
            }`}
          >
            <div className="text-3xl mb-5">✓</div>

            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-verified mb-3">
              Verified
            </p>

            <p className="text-sm text-ink-50 leading-relaxed">
              The contributor completed the work independently and receives full
              credit.
            </p>

            {choice === 'verified' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-verified text-white rounded-full flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </button>

          {/* CO-CONTRIBUTION */}
          <button
            onClick={() => setChoice('co-contribution')}
            className={`relative rounded-2xl border-2 p-6 text-left transition-all min-h-[210px] ${
              choice === 'co-contribution'
                ? 'border-teal bg-teal-muted'
                : 'border-teal bg-teal-muted/40 hover:bg-teal-muted'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-teal text-white font-mono text-[8px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                PeerRater Innovation
              </span>
            </div>

            <div className="text-3xl mb-5">🤝</div>

            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal mb-3">
              Co-Contribution
            </p>

            <p className="text-sm text-ink-50 leading-relaxed">
              Another teammate significantly helped. Split contribution points
              fairly.
            </p>

            {choice === 'co-contribution' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </button>

          {/* REVISION */}
          <button
            onClick={() => setChoice('revision')}
            className={`relative rounded-2xl border-2 p-6 text-left transition-all min-h-[210px] ${
              choice === 'revision'
                ? 'border-revision bg-revision-bg'
                : 'border-ink-20 bg-card hover:border-revision'
            }`}
          >
            <div className="text-3xl mb-5">↻</div>

            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-revision mb-3">
              Revision Required
            </p>

            <p className="text-sm text-ink-50 leading-relaxed">
              The work needs improvements before contribution points can be
              awarded.
            </p>

            {choice === 'revision' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-revision text-white rounded-full flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </button>

        </div>
      </div>

      {/* CO-CONTRIBUTION SPLIT */}
      {choice === 'co-contribution' && (
        <div className="border border-teal/30 rounded-2xl overflow-hidden mb-8">

          {/* HEADER */}
          <div className="bg-teal-muted px-7 py-6 border-b border-teal/20">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-teal mb-2">
              Contribution Split
            </p>

            <h2 className="text-2xl font-semibold text-ink">
              Distribute {task.points} points fairly
            </h2>
          </div>

          <div className="p-7 bg-card">

            {/* SAM */}
            <div className="flex items-center gap-5 mb-7">

              <div className="flex items-center gap-3 w-44">
                <div className="w-12 h-12 rounded-full bg-[#5EEAD4] flex items-center justify-center font-bold">
                  {task.assignee?.[0] || 'S'}
                </div>

                <div>
                  <p className="font-semibold text-ink">
                    {task.assignee || 'Sam'}
                  </p>

                  <p className="font-mono text-[8px] uppercase tracking-wider text-ink-50">
                    Primary Contributor
                  </p>
                </div>
              </div>

              {/* SLIDER */}
              <div className="flex-1">
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={samPct}
                  onChange={(e) => setSamPct(Number(e.target.value))}
                  className="w-full accent-teal cursor-pointer"
                />
              </div>

              <div className="w-20 text-right">
                <p className="font-mono text-xl font-bold">
                  {samPct}%
                </p>

                <p className="font-mono text-[10px] text-ink-50">
                  {samPts} pts
                </p>
              </div>

            </div>

            {/* ALEX */}
            <div className="flex items-center gap-5 mb-8">

              <div className="flex items-center gap-3 w-44">
                <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center text-white font-bold">
                  A
                </div>

                <div>
                  <p className="font-semibold text-ink">
                    Alex
                  </p>

                  <p className="font-mono text-[8px] uppercase tracking-wider text-ink-50">
                    Assisting Contributor
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div className="h-3 bg-paper-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal rounded-full transition-all"
                    style={{ width: `${alexPct}%` }}
                  />
                </div>
              </div>

              <div className="w-20 text-right">
                <p className="font-mono text-xl font-bold">
                  {alexPct}%
                </p>

                <p className="font-mono text-[10px] text-ink-50">
                  {alexPts} pts
                </p>
              </div>

            </div>

            {/* COMBINED BAR */}
            <div className="flex h-8 rounded-lg overflow-hidden mb-7">

              <div
                className="bg-[#5EEAD4] transition-all"
                style={{ width: `${samPct}%` }}
              />

              <div
                className="bg-teal transition-all"
                style={{ width: `${alexPct}%` }}
              />

            </div>

            {/* POINT CARDS */}
            <div className="grid grid-cols-2 gap-5 mb-7">

              <div className="border border-ink-20 rounded-xl p-5 text-center">
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-2">
                  {task.assignee || 'Sam'}
                </p>

                <p className="font-mono text-4xl font-bold text-ink">
                  {samPts}
                </p>

                <p className="font-mono text-[9px] uppercase text-ink-50">
                  Points
                </p>
              </div>

              <div className="border border-ink-20 rounded-xl p-5 text-center">
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-2">
                  Alex
                </p>

                <p className="font-mono text-4xl font-bold text-ink">
                  {alexPts}
                </p>

                <p className="font-mono text-[9px] uppercase text-ink-50">
                  Points
                </p>
              </div>

            </div>

            {/* IMPORTANT CONFIRM BUTTON */}
            <button
              onClick={handleConfirm}
              className="w-full bg-teal text-white font-bold py-5 rounded-xl hover:bg-teal-dark transition-colors text-lg"
            >
              Confirm Contribution Split · {samPct}% / {alexPct}%
            </button>

          </div>
        </div>
      )}

      {/* VERIFIED CONFIRM */}
      {choice === 'verified' && (
        <div className="bg-verified-bg border border-verified-border rounded-2xl p-6 mb-8">

          <h3 className="font-semibold text-lg text-ink mb-2">
            Approve Full Credit
          </h3>

          <p className="text-sm text-ink-50 mb-5">
            {task.assignee || 'Sam'} will receive all {task.points} contribution
            points.
          </p>

          <button
            onClick={onVerify}
            className="w-full bg-verified text-white font-bold py-4 rounded-xl"
          >
            Confirm Full Credit — {task.points} pts
          </button>

        </div>
      )}

      {/* REVISION CONFIRM */}
      {choice === 'revision' && (
        <div className="bg-revision-bg border border-revision-border rounded-2xl p-6 mb-8">

          <h3 className="font-semibold text-lg text-ink mb-2">
            Return for Revision
          </h3>

          <p className="text-sm text-ink-50 mb-5">
            No points will be awarded until the task is revised and submitted
            again.
          </p>

          <textarea
            placeholder="Describe what needs to be improved..."
            className="w-full p-4 rounded-xl border border-revision-border mb-4 bg-white text-sm"
            rows={3}
          />

          <button
            onClick={onRequestRevision}
            className="w-full bg-revision text-white font-bold py-4 rounded-xl"
          >
            Return Task for Revision
          </button>

        </div>
      )}

      {/* FOOTER */}
      <div className="border-t border-ink-20 pt-7 mt-8">
        <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center">
          PeerRater · Contribution Review · {task.id}
        </p>
      </div>

    </div>
  );
}