import { useState } from 'react';
import type { Page, Task } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
  task: Task;

  onVerify: (taskId: string) => void;

  onSplit: (
    taskId: string,
    primaryName: string,
    primaryPercentage: number,
    assistingName: string,
    assistingPercentage: number
  ) => void;

  onRequestRevision: (taskId: string) => void;
}

type ReviewChoice =
  | 'verified'
  | 'co-contribution'
  | 'revision'
  | null;

function ContributorBar({
  name,
  initials,
  avatarBg,
  avatarText,
  percentage,
  points,
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
  percentage: number;
  points: number;
  label: string;
  barColor: string;
  isLive?: boolean;
  liveValue?: number;
  onLiveChange?: (value: number) => void;
}) {
  const displayPercentage =
    isLive && liveValue !== undefined
      ? liveValue
      : percentage;

  const displayPoints =
    isLive && liveValue !== undefined
      ? Math.round((liveValue / 100) * points)
      : points;

  return (
    <div className="flex items-center gap-4">

      {/* Avatar + Name */}
      <div className="flex items-center gap-2.5 w-36 shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0"
          style={{
            backgroundColor: avatarBg,
            color: avatarText ?? '#FFFFFF',
          }}
        >
          {initials}
        </div>

        <div>
          <p className="font-semibold text-ink text-sm leading-tight">
            {name}
          </p>

          <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider">
            {label}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 relative">

        <div className="h-4 bg-paper-100 rounded-full overflow-hidden border border-ink-20">
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{
              width: `${displayPercentage}%`,
              backgroundColor: barColor,
            }}
          />
        </div>

        {isLive && onLiveChange && (
          <input
            type="range"
            min={10}
            max={90}
            value={liveValue}
            onChange={(event) =>
              onLiveChange(Number(event.target.value))
            }
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
          />
        )}

      </div>

      {/* Percentage + Points */}
      <div className="text-right w-24 shrink-0">
        <span className="font-mono text-lg font-bold text-ink leading-none">
          {displayPercentage}%
        </span>

        <p className="font-mono text-[10px] text-ink-50">
          {displayPoints} pts
        </p>
      </div>

    </div>
  );
}

export default function ContributionReview({
  onNavigate,
  task,
  onVerify,
  onSplit,
  onRequestRevision,
}: Props) {
  const [choice, setChoice] =
    useState<ReviewChoice>(null);

  const [primaryPercentage, setPrimaryPercentage] =
    useState(60);

  const [revisionNote, setRevisionNote] =
    useState('');

  const primaryName =
    task.assignee || 'Primary Contributor';

  // Demo assisting contributor
  const assistingName =
    primaryName.toLowerCase() === 'alex'
      ? 'Sam'
      : 'Alex';

  const assistingPercentage =
    100 - primaryPercentage;

  const primaryPoints = Math.round(
    (primaryPercentage / 100) * task.points
  );

  const assistingPoints =
    task.points - primaryPoints;

  const handleVerify = () => {
    onVerify(task.id);
  };

  const handleSplit = () => {
    onSplit(
      task.id,
      primaryName,
      primaryPercentage,
      assistingName,
      assistingPercentage
    );
  };

  const handleRevision = () => {
    // Note is currently UI-only.
    // Later we can store revision notes in App state/database.
    console.log(
      `Revision requested for ${task.id}:`,
      revisionNote
    );

    onRequestRevision(task.id);
  };

  return (
    <div className="p-8 max-w-[850px]">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2.5 mb-8">

        <button
          onClick={() => onNavigate('taskboard')}
          className="text-sm text-ink-50 hover:text-ink transition-colors font-medium flex items-center gap-1"
        >
          ← Back to Task Board
        </button>

        <span className="text-ink-20">·</span>

        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-50">
          Contribution Review
        </span>

      </div>

      {/* Task Identity */}
      <div className="mb-8">

        <h1 className="font-display text-[42px] text-ink leading-tight mb-3">
          {task.title}
        </h1>

        <div className="flex items-center gap-3 flex-wrap">

          <span className="font-mono text-[10px] text-ink-50 uppercase tracking-widest">
            TASK #{task.id}
          </span>

          <span className="text-ink-20">·</span>

          <span className="font-mono text-[11px] font-bold text-ink">
            {task.points} CONTRIBUTION POINTS
          </span>

          <span className="text-ink-20">·</span>

          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-pending-bg text-pending border border-pending-border px-2 py-0.5 rounded-md uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-pending" />
            UNDER REVIEW
          </span>

        </div>

      </div>

      {/* Primary Contributor */}
      <div className="bg-card border border-ink-20 rounded-2xl p-6 mb-8">

        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-50 mb-4">
          Primary Contributor
        </p>

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg font-mono"
              style={{
                backgroundColor:
                  task.avatarColor || '#6366F1',
              }}
            >
              {primaryName[0]?.toUpperCase()}
            </div>

            <div>

              <p className="font-semibold text-ink text-lg leading-tight">
                {primaryName}
              </p>

              <p className="font-mono text-[10px] text-ink-50 mt-0.5">
                Submitted for peer verification
              </p>

            </div>

          </div>

          <div className="text-right">

            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg bg-pending-bg text-pending border border-pending-border">

              <span className="w-1.5 h-1.5 rounded-full bg-pending" />

              PENDING VERIFICATION

            </span>

            <p className="font-mono text-[9px] text-ink-50 mt-2">
              {task.points} pts at stake
            </p>

          </div>

        </div>

        {/* Contribution Evidence */}
        <div className="mt-5 pt-4 border-t border-ink-20 grid grid-cols-3 gap-4">

          {[
            {
              label: 'Contribution',
              value: 'Submitted',
            },
            {
              label: 'Task Points',
              value: `${task.points} pts`,
            },
            {
              label: 'Status',
              value: 'Pending',
            },
          ].map((metric) => (

            <div key={metric.label}>

              <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider mb-0.5">
                {metric.label}
              </p>

              <p className="font-mono text-sm font-semibold text-ink">
                {metric.value}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Review Decision */}
      <div className="mb-8">

        <h2 className="font-display text-2xl text-ink mb-1">
          Review Contribution
        </h2>

        <p className="text-sm text-ink-50 mb-8">
          Decide how contribution credit should be awarded
          for this task.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* VERIFIED */}
          <button
            onClick={() => setChoice('verified')}
            className={`rounded-2xl border-2 p-5 text-left transition-all flex flex-col gap-3 ${
              choice === 'verified'
                ? 'border-verified bg-verified-bg'
                : 'border-ink-20 bg-card hover:border-verified/40'
            }`}
          >

            <div className="w-10 h-10 rounded-xl bg-verified-bg border border-verified-border flex items-center justify-center text-verified font-bold text-lg">
              ✓
            </div>

            <div>

              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-verified mb-1.5">
                Verified
              </p>

              <p className="text-xs text-ink-70 leading-relaxed">
                The contribution is valid. Award all points
                to {primaryName}.
              </p>

            </div>

          </button>

          {/* CO-CONTRIBUTION */}
          <button
            onClick={() =>
              setChoice('co-contribution')
            }
            className={`relative rounded-2xl border-2 p-5 text-left transition-all flex flex-col gap-3 ${
              choice === 'co-contribution'
                ? 'border-teal bg-teal-muted'
                : 'border-teal bg-teal-muted/40 hover:bg-teal-muted/70'
            }`}
          >

            <div className="absolute -top-3 left-1/2 -translate-x-1/2">

              <span className="font-mono text-[8px] uppercase tracking-widest bg-teal text-white px-2.5 py-1 rounded-full font-bold">
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

              <p className="text-xs text-ink-70 leading-relaxed">
                Another team member significantly helped
                complete or improve this work. Split the
                points fairly.
              </p>

            </div>

          </button>

          {/* REVISION */}
          <button
            onClick={() => setChoice('revision')}
            className={`rounded-2xl border-2 p-5 text-left transition-all flex flex-col gap-3 ${
              choice === 'revision'
                ? 'border-revision bg-revision-bg'
                : 'border-ink-20 bg-card hover:border-revision/40'
            }`}
          >

            <div className="w-10 h-10 rounded-xl bg-revision-bg border border-revision-border flex items-center justify-center text-revision font-bold text-lg">
              ↻
            </div>

            <div>

              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-revision mb-1.5">
                Revision Required
              </p>

              <p className="text-xs text-ink-70 leading-relaxed">
                Return the task for changes before points
                can be awarded.
              </p>

            </div>

          </button>

        </div>

      </div>

      {/* CO-CONTRIBUTION SPLIT */}
      {choice === 'co-contribution' && (

        <div className="bg-card border border-teal/30 rounded-2xl overflow-hidden mb-6">

          {/* Header */}
          <div className="bg-teal/5 border-b border-teal/20 px-6 py-4 flex items-center justify-between">

            <div>

              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-teal mb-0.5">
                Contribution Split
              </p>

              <p className="font-semibold text-ink text-base">
                Distribute {task.points} points
              </p>

            </div>

            <div className="text-right">

              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50">
                Total
              </p>

              <p className="font-mono text-2xl font-bold text-ink">
                {task.points} PTS
              </p>

            </div>

          </div>

          <div className="p-6">

            <div className="space-y-5 mb-6">

              {/* Primary */}
              <ContributorBar
                name={primaryName}
                initials={primaryName[0]?.toUpperCase()}
                avatarBg={task.avatarColor || '#6366F1'}
                percentage={60}
                points={task.points}
                label="Primary Contributor"
                barColor={task.avatarColor || '#6366F1'}
                isLive
                liveValue={primaryPercentage}
                onLiveChange={setPrimaryPercentage}
              />

              {/* Assisting */}
              <ContributorBar
                name={assistingName}
                initials={assistingName[0]}
                avatarBg="#0F766E"
                percentage={40}
                points={task.points}
                label="Assisting Contributor"
                barColor="#0F766E"
                isLive
                liveValue={assistingPercentage}
              />

            </div>

            <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center mb-5">
              ← Drag the primary contributor bar to adjust →
            </p>

            {/* Combined Bar */}
            <div className="flex h-7 rounded-lg overflow-hidden border border-ink-20 mb-5">

              <div
                className="flex items-center justify-center transition-all duration-150"
                style={{
                  width: `${primaryPercentage}%`,
                  backgroundColor:
                    task.avatarColor || '#6366F1',
                }}
              >

                <span className="font-mono text-[9px] text-white font-bold">
                  {primaryName} {primaryPercentage}%
                </span>

              </div>

              <div
                className="flex items-center justify-center transition-all duration-150 bg-teal"
                style={{
                  width: `${assistingPercentage}%`,
                }}
              >

                <span className="font-mono text-[9px] text-white font-bold">
                  {assistingName} {assistingPercentage}%
                </span>

              </div>

            </div>

            {/* Point Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-6">

              <div className="bg-paper border border-ink-20 rounded-xl p-4 text-center">

                <p className="font-mono text-[9px] text-ink-50 uppercase tracking-widest mb-1">
                  {primaryName}
                </p>

                <p className="font-mono text-3xl font-bold text-ink">
                  {primaryPoints}
                </p>

                <p className="font-mono text-[9px] text-ink-50 uppercase">
                  Points
                </p>

              </div>

              <div className="bg-teal-muted/50 border border-teal/20 rounded-xl p-4 text-center">

                <p className="font-mono text-[9px] text-ink-50 uppercase tracking-widest mb-1">
                  {assistingName}
                </p>

                <p className="font-mono text-3xl font-bold text-ink">
                  {assistingPoints}
                </p>

                <p className="font-mono text-[9px] text-ink-50 uppercase">
                  Points
                </p>

              </div>

            </div>

            {/* Confirm Split */}
            <button
              onClick={handleSplit}
              className="w-full bg-teal text-white font-bold py-4 rounded-xl hover:bg-teal-dark transition-colors text-sm tracking-wide uppercase font-mono"
            >
              Confirm Contribution Split · {primaryName}{' '}
              {primaryPercentage}% / {assistingName}{' '}
              {assistingPercentage}%
            </button>

          </div>

        </div>
      )}

      {/* FULL CREDIT */}
      {choice === 'verified' && (

        <div className="bg-verified-bg border border-verified-border rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-card border border-verified-border">

              <span className="text-verified font-bold text-lg">
                ✓
              </span>

            </div>

            <div>

              <p className="font-semibold text-ink">
                Approve Full Credit
              </p>

              <p className="text-xs text-ink-50 mt-0.5">
                {primaryName} will receive all {task.points}{' '}
                contribution points.
              </p>

            </div>

          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-verified text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Confirm Full Credit — {task.points} pts
          </button>

        </div>
      )}

      {/* REVISION */}
      {choice === 'revision' && (

        <div className="bg-revision-bg border border-revision-border rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-full bg-card border border-revision-border flex items-center justify-center">

              <span className="text-revision font-bold text-lg">
                ↻
              </span>

            </div>

            <div>

              <p className="font-semibold text-ink">
                Return for Revision
              </p>

              <p className="text-xs text-ink-50 mt-0.5">
                Explain what needs to be changed before
                contribution points can be awarded.
              </p>

            </div>

          </div>

          <textarea
            value={revisionNote}
            onChange={(event) =>
              setRevisionNote(event.target.value)
            }
            className="w-full bg-white border border-revision-border/50 rounded-lg p-3 text-sm text-ink mb-3 resize-none focus:outline-none"
            rows={3}
            placeholder="Describe what needs to be revised..."
          />

          <button
            onClick={handleRevision}
            className="w-full bg-revision text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Return Task for Revision
          </button>

        </div>
      )}

      {/* Footer */}
      <div className="border-t border-ink-20 pt-6 mt-8">

        <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center">
          PeerRater · Contribution Review · TASK #{task.id}
        </p>

      </div>

    </div>
  );
}