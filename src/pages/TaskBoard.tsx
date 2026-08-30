import { useState } from 'react';
import type { Page } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
}

type TaskStatus =
  | 'available'
  | 'claimed'
  | 'in-progress'
  | 'submitted'
  | 'verified'
  | 'co-contribution'
  | 'revision';

interface Task {
  id: string;
  title: string;
  points: number;
  assignee: string | null;
  avatarColor: string;
  status: TaskStatus;
  isReviewable?: boolean;
}

const initialTasks: Task[] = [
  {
    id: 'PR-102',
    title: 'Research Competitor Platforms',
    points: 15,
    assignee: 'Alex',
    avatarColor: '#0F766E',
    status: 'submitted',
  },
  {
    id: 'PR-103',
    title: 'Build Authentication System',
    points: 30,
    assignee: 'Sam',
    avatarColor: '#5EEAD4',
    status: 'submitted',
    isReviewable: true,
  },
  {
    id: 'PR-104',
    title: 'Design Presentation Slides',
    points: 20,
    assignee: 'Priya',
    avatarColor: '#C4764A',
    status: 'in-progress',
  },
  {
    id: 'PR-105',
    title: 'Write Project Report',
    points: 25,
    assignee: 'Rahul',
    avatarColor: '#D4A853',
    status: 'co-contribution',
  },
  {
    id: 'PR-106',
    title: 'Set Up Database Schema',
    points: 15,
    assignee: 'Sam',
    avatarColor: '#5EEAD4',
    status: 'verified',
  },
  {
    id: 'PR-107',
    title: 'Create API Documentation',
    points: 10,
    assignee: null,
    avatarColor: '',
    status: 'available',
  },
  {
    id: 'PR-108',
    title: 'Build Dashboard UI',
    points: 20,
    assignee: 'Alex',
    avatarColor: '#0F766E',
    status: 'in-progress',
  },
  {
    id: 'PR-109',
    title: 'Configure Deployment Environment',
    points: 15,
    assignee: 'Rahul',
    avatarColor: '#D4A853',
    status: 'revision',
  },
];

function StatusBadge({ status }: { status: TaskStatus }) {
  const config: Record<TaskStatus, { label: string; classes: string }> = {
    available: {
      label: '◌ AVAILABLE',
      classes: 'bg-paper-100 text-ink-50 border-ink-20',
    },
    claimed: {
      label: '● CLAIMED',
      classes: 'bg-cobalt-bg text-cobalt border-cobalt-border',
    },
    'in-progress': {
      label: '◎ IN PROGRESS',
      classes: 'bg-cobalt-bg text-cobalt border-cobalt-border',
    },
    submitted: {
      label: '○ UNDER REVIEW',
      classes: 'bg-pending-bg text-pending border-pending-border',
    },
    verified: {
      label: '✓ VERIFIED',
      classes: 'bg-verified-bg text-verified border-verified-border',
    },
    'co-contribution': {
      label: '⊕ CO-CONTRIBUTION',
      classes: 'bg-teal-muted text-teal border-teal/30',
    },
    revision: {
      label: '↻ REVISION REQUIRED',
      classes: 'bg-revision-bg text-revision border-revision-border',
    },
  };

  const { label, classes } = config[status];

  return (
    <span
      className={`font-mono text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded border ${classes}`}
    >
      {label}
    </span>
  );
}

function TaskCard({
  task,
  onNavigate,
  onClaim,
  onSubmit,
}: {
  task: Task;
  onNavigate: (page: Page) => void;
  onClaim: (id: string) => void;
  onSubmit: (id: string) => void;
}) {
  return (
    <div className="bg-card border border-ink-20 rounded-xl p-5 hover:border-ink-50 hover:shadow-sm transition-all flex flex-col gap-4">
      <div className="flex justify-between items-start gap-3">
        <div>
          <p className="font-mono text-[9px] text-ink-50 uppercase tracking-widest mb-1.5">
            TASK #{task.id}
          </p>

          <h3 className="font-semibold text-ink text-[14px] leading-snug">
            {task.title}
          </h3>
        </div>

        <div className="shrink-0 text-right">
          <span className="font-mono text-lg font-bold text-ink leading-none">
            {task.points}
          </span>
          <span className="font-mono text-[9px] text-ink-50 block uppercase tracking-wider">
            PTS
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {task.assignee ? (
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white font-mono text-[10px] font-bold shrink-0"
              style={{ backgroundColor: task.avatarColor }}
            >
              {task.assignee[0]}
            </div>
            <span className="text-xs text-ink-50 font-medium">
              {task.assignee}
            </span>
          </div>
        ) : (
          <span className="text-xs text-ink-50 font-medium italic">
            Unassigned
          </span>
        )}

        <StatusBadge status={task.status} />
      </div>

      <div className="border-t border-ink-20 pt-3 flex gap-2">

        {/* AVAILABLE → CLAIM */}
        {task.status === 'available' && (
          <button
            onClick={() => onClaim(task.id)}
            className="flex-1 text-xs font-semibold text-teal border border-teal/30 bg-teal-muted px-3 py-1.5 rounded-lg hover:bg-teal/10 transition-colors"
          >
            Claim Task →
          </button>
        )}

        {/* IN PROGRESS → SUBMIT */}
        {task.status === 'in-progress' && task.assignee === 'You' && (
          <button
            onClick={() => onSubmit(task.id)}
            className="flex-1 text-xs font-semibold text-white bg-teal px-3 py-1.5 rounded-lg hover:bg-teal-dark transition-colors"
          >
            Submit for Review →
          </button>
        )}

        {/* REVIEW */}
        {task.status === 'submitted' && task.isReviewable && (
          <button
            onClick={() => onNavigate('review')}
            className="flex-1 text-xs font-semibold text-teal border border-teal/30 bg-teal-muted px-3 py-1.5 rounded-lg hover:bg-teal/10 transition-colors"
          >
            Review Contribution →
          </button>
        )}

        {/* DEFAULT */}
        {!(
          task.status === 'available' ||
          (task.status === 'in-progress' && task.assignee === 'You') ||
          (task.status === 'submitted' && task.isReviewable)
        ) && (
          <button className="text-xs font-medium text-ink-50 hover:text-teal transition-colors">
            View Details →
          </button>
        )}
      </div>
    </div>
  );
}

const stats = [
  { label: 'Total Tasks', value: '10' },
  { label: 'Completed', value: '6', valueClass: 'text-verified' },
  { label: 'Under Review', value: '2', valueClass: 'text-pending' },
  { label: 'Team Members', value: '4' },
];

export default function TaskBoard({ onNavigate }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const claimTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              assignee: 'You',
              avatarColor: '#0F766E',
              status: 'in-progress',
            }
          : task
      )
    );
  };

  const submitTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: 'submitted',
              isReviewable: true,
            }
          : task
      )
    );
  };

  const addTask = () => {
    const title = window.prompt('Enter task name:');

    if (!title) return;

    const pointsInput = window.prompt('Enter task points:', '10');
    const points = Number(pointsInput) || 10;

    const newTask: Task = {
      id: `PR-${110 + tasks.length}`,
      title,
      points,
      assignee: null,
      avatarColor: '',
      status: 'available',
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  return (
    <div className="p-8 max-w-[1000px]">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-1">
              Smart Campus Project · PR-2026-014
            </p>

            <h1 className="font-display text-4xl text-ink leading-tight">
              Task Board
            </h1>

            <p className="text-ink-50 mt-1.5 text-sm">
              Track work. Verify contribution. Build fairly.
            </p>
          </div>

          <button
            onClick={addTask}
            className="bg-teal text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-teal-dark transition-colors text-sm flex items-center gap-2 shrink-0"
          >
            <span className="text-base font-light">+</span>
            Add Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card border border-ink-20 rounded-xl p-4"
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-2">
              {s.label}
            </p>
            <p
              className={`font-mono text-3xl font-bold ${
                s.valueClass ?? 'text-ink'
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Status Flow */}
      <div className="bg-card border border-ink-20 rounded-xl px-5 py-3.5 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-teal" />
          <span className="text-xs font-semibold text-ink">
            Workflow Status
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-ink-50 flex-wrap">
          AVAILABLE → CLAIMED → IN PROGRESS → UNDER REVIEW → VERIFIED
        </div>

        <span className="font-mono text-[9px] text-pending uppercase tracking-wider">
          ◉ Points awarded after verification
        </span>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onNavigate={onNavigate}
            onClaim={claimTask}
            onSubmit={submitTask}
          />
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 border border-dashed border-ink-20 rounded-xl px-5 py-4 bg-card/50">
        <div className="flex items-start gap-3">
          <span className="text-lg mt-0.5">ℹ️</span>
          <div>
            <p className="text-sm font-semibold text-ink mb-1">
              Points are awarded after contribution verification.
            </p>
            <p className="text-xs text-ink-50 leading-relaxed">
              Submitting a task does not automatically award points. All
              completed work enters a peer review stage where the team verifies
              contributions and can recognize co-contributors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}