import type {
  Page,
  TeamMember,
  UserData,
} from '../App';

interface Props {
  onNavigate: (page: Page) => void;
  user: UserData | null;
  teamMembers: TeamMember[];
  onLogout: () => void;
}

type TaskStatus =
  | 'verified'
  | 'under-review'
  | 'available'
  | 'in-progress';

interface Task {
  id: string;
  title: string;
  points: number;
  assignee: TeamMember | null;
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  verified: {
    label: '✓ VERIFIED',
    className:
      'bg-verified-bg text-verified border-verified-border',
  },
  'under-review': {
    label: 'UNDER REVIEW',
    className:
      'bg-pending-bg text-pending border-pending-border',
  },
  available: {
    label: 'AVAILABLE',
    className:
      'bg-paper text-ink-50 border-ink-20',
  },
  'in-progress': {
    label: 'IN PROGRESS',
    className:
      'bg-cobalt-bg text-cobalt border-cobalt-border',
  },
};

function Avatar({ member }: { member: TeamMember }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0"
      style={{
        backgroundColor: member.color,
        color: '#FFFFFF',
      }}
    >
      {member.initials}
    </div>
  );
}

export default function ProjectDashboard({
  onNavigate,
  user,
  teamMembers,
  onLogout,
}: Props) {
  const currentUserMember: TeamMember | null = user
    ? {
        id: 'current-user',
        name: user.name,
        initials: user.name
          .split(' ')
          .map((word) => word[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        color: '#6366F1',
        role: user.role,
      }
    : null;

  const tasks: Task[] = [
    {
      id: 'PR-102',
      title: 'Research Competitor Platforms',
      points: 15,
      assignee: teamMembers[0] || currentUserMember,
      status: 'verified',
    },
    {
      id: 'PR-103',
      title: 'Build Authentication System',
      points: 30,
      assignee: teamMembers[1] || currentUserMember,
      status: 'under-review',
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
      assignee: teamMembers[2] || currentUserMember,
      status: 'in-progress',
    },
  ];

  const displayName = user?.name || 'Guest';
  const teamCode = user?.teamCode || 'PR-DEMO';

  const leader =
    teamMembers.find((member) => member.role === 'leader') ||
    null;

  const totalPoints = tasks.reduce(
    (total, task) => total + task.points,
    0
  );

  const verifiedTasks = tasks.filter(
    (task) => task.status === 'verified'
  ).length;

  return (
    <div className="p-8 max-w-[1100px]">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-8">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-2">
            Team Workspace · {teamCode}
          </p>

          <h1 className="font-display text-4xl text-ink">
            Welcome back, {displayName}.
          </h1>

          <p className="text-ink-50 mt-2 text-sm">
            Track your team's work and make every contribution count.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('analytics')}
            className="border border-ink-20 bg-card px-4 py-2.5 rounded-xl text-sm text-ink-50 hover:text-teal transition-colors"
          >
            View Receipt
          </button>

          <button
            onClick={onLogout}
            className="border border-ink-20 bg-card px-4 py-2.5 rounded-xl text-sm text-ink-50 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= TEAM PASS ================= */}

      <div className="bg-teal-muted border border-teal/20 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-teal mb-2">
              Your Team Workspace
            </p>

            <h2 className="font-semibold text-xl text-ink">
              Team Pass: {teamCode}
            </h2>

            <p className="text-sm text-ink-50 mt-1">
              Share this pass code with your teammates so they can join.
            </p>

            <p className="text-xs text-ink-50 mt-2">
              {leader
                ? `Led by ${leader.name}`
                : 'No leader assigned'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="border-2 border-teal-muted rounded-full"
                  title={`${member.name} (${member.role})`}
                >
                  <Avatar member={member} />
                </div>
              ))}
            </div>

            <span className="text-sm text-ink-50 ml-2">
              {teamMembers.length} member
              {teamMembers.length !== 1 ? 's' : ''}
            </span>
          </div>

        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Team Members
          </p>

          <p className="font-mono text-3xl font-bold text-ink">
            {teamMembers.length}
          </p>

          <p className="font-mono text-[9px] text-ink-50 mt-2">
            Working together
          </p>
        </div>

        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Total Tasks
          </p>

          <p className="font-mono text-3xl font-bold text-ink">
            {tasks.length}
          </p>

          <p className="font-mono text-[9px] text-ink-50 mt-2">
            Across your project
          </p>
        </div>

        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Verified
          </p>

          <p className="font-mono text-3xl font-bold text-teal">
            {verifiedTasks}
          </p>

          <p className="font-mono text-[9px] text-ink-50 mt-2">
            Tasks completed
          </p>
        </div>

        <div className="bg-card border border-ink-20 rounded-2xl p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-3">
            Total Points
          </p>

          <p className="font-mono text-3xl font-bold text-ink">
            {totalPoints}
          </p>

          <p className="font-mono text-[9px] text-ink-50 mt-2">
            Available project points
          </p>
        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="flex flex-wrap gap-3 mb-8">

        <button
          onClick={() => onNavigate('taskboard')}
          className="bg-teal text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-teal-dark transition-colors"
        >
          View Task Board →
        </button>

        <button
          onClick={() => onNavigate('review')}
          className="border border-ink-20 bg-card text-ink font-medium text-sm px-5 py-3 rounded-xl hover:border-teal hover:text-teal transition-colors"
        >
          Review Contributions
        </button>

        <button
          onClick={() => onNavigate('analytics')}
          className="border border-ink-20 bg-card text-ink font-medium text-sm px-5 py-3 rounded-xl hover:border-teal hover:text-teal transition-colors"
        >
          Contribution Analytics
        </button>

      </div>

      {/* ================= ACTIVE TASKS ================= */}

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50">
            Active Tasks
          </p>

          <h2 className="font-semibold text-lg text-ink mt-1">
            Project Activity
          </h2>
        </div>

        <button
          onClick={() => onNavigate('taskboard')}
          className="font-mono text-[9px] uppercase tracking-wider text-teal hover:underline"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {tasks.map((task) => {
          const status = statusConfig[task.status];

          return (
            <div
              key={task.id}
              className="bg-card border border-ink-20 rounded-2xl overflow-hidden hover:border-teal/40 transition-colors"
            >
              <div className="p-5">

                <div className="flex items-start justify-between gap-4 mb-5">

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-2">
                      Task #{task.id}
                    </p>

                    <h3 className="font-semibold text-ink">
                      {task.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-mono text-xl font-bold text-ink">
                      {task.points}
                    </p>

                    <p className="font-mono text-[8px] uppercase tracking-wider text-ink-50">
                      Points
                    </p>
                  </div>

                </div>

                <div className="flex items-center justify-between gap-3">

                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar member={task.assignee} />

                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {task.assignee.name}
                        </p>

                        <p className="font-mono text-[8px] uppercase tracking-wider text-ink-50">
                          {task.assignee.role}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-ink-50 italic">
                      Unassigned
                    </span>
                  )}

                  <span
                    className={`font-mono text-[8px] px-2 py-1 rounded border ${status.className}`}
                  >
                    {status.label}
                  </span>

                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* ================= CONTRIBUTION INFO ================= */}

      <div className="mt-8 bg-teal-muted border border-teal/20 rounded-xl p-5">

        <p className="font-semibold text-ink mb-1">
          Fair contribution matters.
        </p>

        <p className="text-sm text-ink-50">
          Task ownership alone doesn't determine credit.
          Contributions are reviewed and verified by the team
          before final points are awarded.
        </p>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-8 border-t border-ink-20 pt-6">

        <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center">
          PeerRater · {user?.teamCode || 'Team Dashboard'} · Fair Contribution Tracking
        </p>

      </div>

    </div>
  );
}