import type { Page } from '../App';

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function IconHome() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="14" y2="14" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  );
}

function NavItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
        active
          ? 'bg-teal-muted text-teal'
          : 'text-ink-50 hover:text-ink hover:bg-paper-100'
      }`}
    >
      <span className={`shrink-0 ${active ? 'text-teal' : ''}`}>{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

export default function Sidebar({ currentPage, onNavigate }: Props) {
  const isOverview = currentPage === 'dashboard';
  const isBoard = currentPage === 'taskboard' || currentPage === 'review';
  const isAnalytics = currentPage === 'analytics';

  return (
    <aside className="w-60 min-h-full bg-card border-r border-ink-20 flex flex-col shrink-0">
      <div className="p-5 border-b border-ink-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-mono text-xs font-bold">PR</span>
          </div>
          <div>
            <p className="font-display text-[18px] leading-tight text-ink">PeerRater</p>
            <p className="font-mono text-[9px] text-ink-50 tracking-widest uppercase leading-tight">
              Fair Contribution
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-ink-20">
        <div className="bg-paper rounded-xl px-3 py-2.5 border border-ink-20">
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-0.5">
            Active Project
          </p>
          <p className="text-sm font-semibold text-ink leading-tight">Smart Campus Project</p>
          <p className="font-mono text-[9px] text-ink-50 mt-0.5">PR-2026-014</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-5">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-1.5 px-3">
            Workspace
          </p>
          <NavItem
            label="Overview"
            icon={<IconHome />}
            active={isOverview}
            onClick={() => onNavigate('dashboard')}
          />
          <NavItem
            label="Task Board"
            icon={<IconGrid />}
            active={isBoard}
            onClick={() => onNavigate('taskboard')}
          />
          <NavItem
            label="Team"
            icon={<IconUsers />}
            active={false}
            onClick={() => onNavigate('taskboard')}
          />
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50 mb-1.5 px-3">
            Reports
          </p>
          <NavItem
            label="Analytics"
            icon={<IconBarChart />}
            active={isAnalytics}
            onClick={() => onNavigate('analytics')}
          />
          <NavItem
            label="Contribution Receipt"
            icon={<IconReceipt />}
            active={isAnalytics}
            onClick={() => onNavigate('analytics')}
          />
        </div>
      </nav>

      <div className="p-3 border-t border-ink-20 space-y-1">
        <NavItem label="Settings" icon={<IconSettings />} active={false} onClick={() => {}} />
        <div className="flex items-center gap-2.5 px-3 py-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white font-bold text-xs shrink-0">
            AC
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">Alex Chen</p>
            <p className="font-mono text-[9px] text-ink-50">Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
