import type { Page } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
}

// ─── data ────────────────────────────────────────────────────────────────────

const teamMembers = [
  { initials: 'AC', name: 'Alex', color: '#0F766E' },
  { initials: 'SL', name: 'Sam', color: '#5EEAD4', textColor: '#0A5C56' },
  { initials: 'RM', name: 'Rahul', color: '#D4A853', textColor: '#7C5E20' },
  { initials: 'PK', name: 'Priya', color: '#C4764A', textColor: '#7C3D1E' },
];

type TaskStatus = 'verified' | 'under-review' | 'available' | 'in-progress' | 'claimed' | 'submitted';

interface Task {
  id: string;
  title: string;
  points: number;
  assignee: (typeof teamMembers)[number] | null;
  status: TaskStatus;
  isReviewable?: boolean;
  claimedDate?: string;
  submittedDate?: string;
}

const tasks: Task[] = [
  {
    id: 'PR-102',
    title: 'Research Competitor Platforms',
    points: 15,
    assignee: teamMembers[0],
    status: 'verified',
    claimedDate: 'Aug 20',
  },
  {
    id: 'PR-103',
    title: 'Build Authentication System',
    points: 30,
    assignee: teamMembers[1],
    status: 'under-review',
    isReviewable: true,
    claimedDate: 'Aug 28',
    submittedDate: 'Aug 30',
  },
  {
    id: 'PR-104',
    title: 'Design Presentation Slides',
    points: 20,
    assignee: null,
    status: 'available',
  },
  {
    id: 'PR-105',
    title: 'Database Architecture',
    points: 25,
    assignee: teamMembers[2],
    status: 'in-progress',
    claimedDate: 'Aug 29',
  },
];

const workflowStages: { label: string; status: TaskStatus | null; count: number }[] = [
  { label: 'AVAILABLE', status: 'available', count: 1 },
  { label: 'CLAIMED', status: 'claimed', count: 0 },
  { label: 'IN PROGRESS', status: 'in-progress', count: 1 },
  { label: 'SUBMITTED', status: 'submitted', count: 0 },
  { label: 'UNDER REVIEW', status: 'under-review', count: 1 },
  { label: 'VERIFIED', status: 'verified', count: 1 },
];

// ─── sub-components ───────────────────────────────────────────────────────────

const statusConfig: Record<
  TaskStatus,
  { label: string; pill: string; dot: string }
> = {
  verified: {
    label: '✓ VERIFIED',
    pill: 'bg-verified-bg text-verified border-verified-border',
    dot: 'bg-verified',
  },
  'under-review': {
    label: '○ UNDER REVIEW',
    pill: 'bg-pending-bg text-pending border-pending-border',
    dot: 'bg-pending',
  },
  available: {
    label: '◌ AVAILABLE',
    pill: 'bg-paper-100 text-ink-50 border-ink-20',
    dot: 'bg-ink-20',
  },
  'in-progress': {
    label: '◎ IN PROGRESS',
    pill: 'bg-cobalt-bg text-cobalt border-cobalt-border',
    dot: 'bg-cobalt',
  },
  claimed: {
    label: '● CLAIMED',
    pill: 'bg-cobalt-bg text-cobalt border-cobalt-border',
    dot: 'bg-cobalt',
  },
  submitted: {
    label: '◉ SUBMITTED',
    pill: 'bg-pending-bg/50 text-pending border-pending-border/50',
    dot: 'bg-pending/50',
  },
};

function StatusBadge({ status }: { status: TaskStatus }) {
  const { label, pill } = statusConfig[status];
  return (
    <span
      className={`font-mono text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded border ${pill}`}
    >
      {label}
    </span>
  );
}

function Avatar({
  member,
  size = 'md',
}: {
  member: (typeof teamMembers)[number];
  size?: 'sm' | 'md';
}) {
  const dim = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-[11px]';
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-mono font-bold shrink-0`}
      style={{
        backgroundColor: member.color,
        color: member.textColor ?? '#FFFFFF',
      }}
    >
      {member.initials[0]}
    </div>
  );
}

function TaskCard({ task, onNavigate }: { task: Task; onNavigate: (page: Page) => void }) {
  const isReviewable = task.isReviewable;
  const isVerified = task.status === 'verified';
  const isAvailable = task.status === 'available';

  return (
    <div
      className={`bg-card rounded-2xl border flex flex-col gap-0 overflow-hidden transition-all hover:shadow-sm ${
        isReviewable
          ? 'border-pending/40 ring-1 ring-pending/10'
          : isVerified
            ? 'border-verified/30'
            : 'border-ink-20 hover:border-ink-50'
      }`}
    >
      {/* Card top accent strip */}
      {isReviewable && (
        <div className="h-0.5 w-full bg-pending/60" />
      )}
      {isVerified && (
        <div className="h-0.5 w-full bg-verified/40" />
      )}

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-1.5">
              TASK #{task.id}
            </p>
            <h3 className="font-semibold text-ink text-[14px] leading-snug">{task.title}</h3>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono text-2xl font-bold text-ink leading-none">{task.points}</p>
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-50 mt-0.5">
              POINTS
            </p>
          </div>
        </div>

        {/* Assignee + status */}
        <div className="flex items-center justify-between gap-3">
          {task.assignee ? (
            <div className="flex items-center gap-2">
              <Avatar member={task.assignee} />
              <div>
                <p className="text-xs font-semibold text-ink">{task.assignee.name}</p>
                {task.submittedDate && (
                  <p className="font-mono text-[9px] text-ink-50">
                    Submitted {task.submittedDate}
                  </p>
                )}
                {!task.submittedDate && task.claimedDate && (
                  <p className="font-mono text-[9px] text-ink-50">
                    Claimed {task.claimedDate}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <span className="text-xs text-ink-50 italic font-medium">Unassigned</span>
          )}
          <StatusBadge status={task.status} />
        </div>

        {/* Verified stamp */}
        {isVerified && (
          <div className="flex items-center gap-2 bg-verified-bg border border-verified-border rounded-lg px-3 py-2">
            <span className="text-verified font-bold text-sm">✓</span>
            <div>
              <p className="font-mono text-[9px] text-verified uppercase tracking-wider font-semibold">
                Contribution Verified
              </p>
              <p className="font-mono text-[8px] text-ink-50">Full credit awarded · {task.points} pts</p>
            </div>
          </div>
        )}

        {/* Under-review note */}
        {isReviewable && (
          <div className="flex items-center gap-2 bg-pending-bg border border-pending-border rounded-lg px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pending shrink-0" />
            <p className="font-mono text-[9px] text-pending uppercase tracking-wider font-semibold">
              Awaiting Team Review · {task.points} pts pending
            </p>
          </div>
        )}

        {/* In-progress indicator */}
        {task.status === 'in-progress' && (
          <div className="flex items-center gap-2 bg-cobalt-bg border border-cobalt-border rounded-lg px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt shrink-0 animate-pulse" />
            <p className="font-mono text-[9px] text-cobalt uppercase tracking-wider font-semibold">
              Work in progress
            </p>
          </div>
        )}
      </div>

      {/* Card footer / action */}
      <div className="border-t border-ink-20 px-5 py-3 flex items-center justify-between bg-paper/30">
        {isReviewable ? (
          <button
            onClick={() => onNavigate('review')}
            className="flex-1 bg-teal text-white font-semibold text-xs py-2.5 px-4 rounded-lg hover:bg-teal-dark transition-colors flex items-center justify-center gap-1.5"
          >
            Review Contribution
            <span className="font-normal">→</span>
          </button>
        ) : isAvailable ? (
          <button className="flex-1 border border-teal/40 text-teal bg-teal-muted font-semibold text-xs py-2.5 px-4 rounded-lg hover:bg-teal/10 transition-colors">
            Claim Task →
          </button>
        ) : (
          <button className="text-xs font-medium text-ink-50 hover:text-teal transition-colors">
            View Details →
          </button>
        )}
        <span className="font-mono text-[8px] text-ink-20 ml-3 uppercase tracking-wider">
          #{task.id}
        </span>
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function ProjectDashboard({ onNavigate }: Props) {
  const completionPct = 62;

  return (
    <div className="p-8 max-w-[960px]">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-1">
            Smart Campus Project · PR-2026-014
          </p>
          <h1 className="font-display text-4xl text-ink leading-tight">Project Dashboard</h1>
          <p className="text-ink-50 mt-1.5 text-sm">
            Track work. Verify contribution. Build fairly.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('analytics')}
            className="border border-ink-20 bg-card text-ink-50 text-sm font-medium px-4 py-2.5 rounded-xl hover:border-teal hover:text-teal transition-colors"
          >
            View Receipt
          </button>
          <button className="bg-teal text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-teal-dark transition-colors flex items-center gap-2">
            <span className="text-base font-light leading-none">+</span> Add Task
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Tasks */}
        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Total Tasks
          </p>
          <p className="font-mono text-3xl font-bold text-ink leading-none mb-3">10</p>
          <div className="flex gap-1.5 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <div key={`v-${i}`} className="w-2.5 h-2.5 rounded-sm bg-verified/70" />
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={`p-${i}`} className="w-2.5 h-2.5 rounded-sm bg-ink-20" />
            ))}
          </div>
          <p className="font-mono text-[9px] text-ink-50 mt-2">6 complete · 4 remaining</p>
        </div>

        {/* Team */}
        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Team Members
          </p>
          <p className="font-mono text-3xl font-bold text-ink leading-none mb-3">4</p>
          <div className="flex -space-x-1.5">
            {teamMembers.map((m) => (
              <div
                key={m.name}
                className="w-7 h-7 rounded-full border-2 border-card flex items-center justify-center font-mono text-[9px] font-bold"
                style={{ backgroundColor: m.color, color: m.textColor ?? '#fff' }}
                title={m.name}
              >
                {m.initials[0]}
              </div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-ink-50 mt-2">Alex · Sam · Rahul · Priya</p>
        </div>

        {/* Completion */}
        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Completion
          </p>
          <p className="font-mono text-3xl font-bold text-teal leading-none mb-3">
            {completionPct}%
          </p>
          <div className="h-2 bg-paper-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal rounded-full transition-all"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <p className="font-mono text-[9px] text-ink-50 mt-2">6 of 10 tasks verified</p>
        </div>

        {/* Points */}
        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Total Points
          </p>
          <p className="font-mono text-3xl font-bold text-ink leading-none mb-3">100</p>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-verified font-semibold">62 verified</span>
            <span className="text-ink-20">·</span>
            <span className="font-mono text-[9px] text-ink-50">38 pending</span>
          </div>
          <p className="font-mono text-[9px] text-ink-50 mt-1">across 4 contributors</p>
        </div>
      </div>

      {/* Workflow pipeline strip */}
      <div className="bg-card border border-ink-20 rounded-2xl px-6 py-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50">
            Task Workflow Pipeline
          </p>
          <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider">
            ◉ Points awarded only after verification
          </p>
        </div>

        <div className="flex items-center gap-0">
          {workflowStages.map((stage, i) => {
            const isActive = stage.count > 0;
            const isLast = i === workflowStages.length - 1;
            const stageColors: Record<string, string> = {
              AVAILABLE: 'text-ink-50 border-ink-20 bg-paper',
              CLAIMED: 'text-cobalt border-cobalt-border bg-cobalt-bg',
              'IN PROGRESS': 'text-cobalt border-cobalt-border bg-cobalt-bg',
              SUBMITTED: 'text-pending border-pending-border bg-pending-bg',
              'UNDER REVIEW': 'text-pending border-pending-border bg-pending-bg',
              VERIFIED: 'text-verified border-verified-border bg-verified-bg',
            };
            const activeClass = isActive
              ? stageColors[stage.label] ?? 'text-ink-50 border-ink-20 bg-paper'
              : 'text-ink-20 border-ink-20/50 bg-paper/50';

            return (
              <div key={stage.label} className="flex items-center flex-1 min-w-0">
                <div className={`flex-1 min-w-0 border rounded-lg px-2 py-2 text-center ${activeClass}`}>
                  <p className={`font-mono text-[8px] uppercase tracking-wider font-semibold truncate ${isActive ? '' : 'opacity-40'}`}>
                    {stage.label}
                  </p>
                  {isActive && (
                    <p className="font-mono text-[10px] font-bold mt-0.5">{stage.count}</p>
                  )}
                </div>
                {!isLast && (
                  <span className="font-mono text-[10px] text-ink-20 px-1 shrink-0">→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contribution banner */}
      <div className="flex items-center gap-3 bg-teal-muted border border-teal/20 rounded-xl px-5 py-3.5 mb-6">
        <div className="w-7 h-7 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
          <span className="text-teal font-bold text-sm">ℹ</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink">
            Points are awarded after contribution verification.
          </p>
          <p className="text-xs text-ink-50 mt-0.5">
            Submitting a task does not award points. The team verifies contributions — and can
            split credit when multiple people helped.
          </p>
        </div>
        <button
          onClick={() => onNavigate('review')}
          className="shrink-0 font-mono text-[10px] text-teal uppercase tracking-wider font-semibold hover:underline"
        >
          1 task needs review →
        </button>
      </div>

      {/* Task cards */}
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50">
          Active Tasks · Showing 4 of 10
        </p>
        <button
          onClick={() => onNavigate('taskboard')}
          className="font-mono text-[9px] uppercase tracking-wider text-teal hover:underline"
        >
          View All Tasks →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onNavigate={onNavigate} />
        ))}
      </div>

      {/* Team contribution quick-view */}
      <div className="bg-card border border-ink-20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-0.5">
              Team Contribution
            </p>
            <p className="text-sm font-semibold text-ink">Verified points to date</p>
          </div>
          <button
            onClick={() => onNavigate('analytics')}
            className="font-mono text-[9px] uppercase tracking-wider text-teal hover:underline"
          >
            Full Receipt →
          </button>
        </div>

        <div className="space-y-4">
          {[
            { member: teamMembers[0], pts: 42, pct: 42, note: 'incl. +12 assist' },
            { member: teamMembers[1], pts: 28, pct: 28, note: null },
            { member: teamMembers[2], pts: 18, pct: 18, note: null },
            { member: { ...teamMembers[3], initials: 'PK' }, pts: 12, pct: 12, note: null },
          ].map(({ member, pts, pct, note }) => (
            <div key={member.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Avatar member={member} size="sm" />
                  <span className="text-sm font-semibold text-ink">{member.name}</span>
                  {note && (
                    <span className="font-mono text-[8px] text-teal bg-teal-muted px-1.5 py-0.5 rounded">
                      {note}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-sm font-bold text-ink">{pts} pts</span>
                  <span className="font-mono text-[10px] text-ink-50">{pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-paper-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: member.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-dashed border-ink-20 flex items-center justify-between">
          <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider">
            Total Verified Points
          </p>
          <p className="font-mono text-lg font-bold text-ink">100 pts</p>
        </div>

        {/* Core principle callout */}
        <div className="mt-4 px-4 py-3 bg-paper border border-ink-20 rounded-xl">
          <p className="font-display italic text-[13px] text-ink-70 leading-snug text-center">
            "Claiming a task is not the same as earning all the credit."
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-ink-20 pt-6">
        <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center">
          PeerRater · Project Dashboard · Smart Campus Project · PR-2026-014
        </p>
      </div>
    </div>
  );
}
