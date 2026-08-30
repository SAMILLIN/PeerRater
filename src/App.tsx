import { useState } from 'react';

import Landing from './pages/Landing';
import ProjectDashboard from './pages/ProjectDashboard';
import TaskBoard from './pages/TaskBoard';
import ContributionReview from './pages/ContributionReview';
import AnalyticsReceipt from './pages/AnalyticsReceipt';
import Sidebar from './components/Sidebar';

export type Page =
  | 'landing'
  | 'dashboard'
  | 'taskboard'
  | 'review'
  | 'analytics';

export type Role = 'leader' | 'member';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  color: string;
  role: Role;
}

export interface UserData {
  name: string;
  role: Role;
  teamCode: string;
}

export default function App() {
  const [page, setPage] = useState<Page>('landing');

  const [user, setUser] = useState<UserData | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Alex',
      initials: 'AL',
      color: '#0F766E',
      role: 'leader',
    },
    {
      id: '2',
      name: 'Sam',
      initials: 'SA',
      color: '#5EEAD4',
      role: 'member',
    },
    {
      id: '3',
      name: 'Rahul',
      initials: 'RA',
      color: '#D4A853',
      role: 'member',
    },
    {
      id: '4',
      name: 'Priya',
      initials: 'PR',
      color: '#C4764A',
      role: 'member',
    },
  ]);

  const handleEnterApp = (
    name: string,
    role: Role,
    teamCode: string
  ) => {
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newUser: UserData = {
      name,
      role,
      teamCode,
    };

    setUser(newUser);

    const exists = teamMembers.some(
      (member) =>
        member.name.toLowerCase() === name.toLowerCase()
    );

    if (!exists) {
      setTeamMembers((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name,
          initials,
          color: '#6366F1',
          role,
        },
      ]);
    }

    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('landing');
  };

  if (page === 'landing') {
    return (
      <Landing
        onNavigate={setPage}
        onEnterApp={handleEnterApp}
      />
    );
  }

  return (
    <div className="flex h-screen bg-paper">

      <Sidebar
        currentPage={page}
        onNavigate={setPage}
      />

      <main className="flex-1 overflow-y-auto">

        {page === 'dashboard' && (
          <ProjectDashboard
            onNavigate={setPage}
            user={user}
            teamMembers={teamMembers}
            onLogout={handleLogout}
          />
        )}

        {page === 'taskboard' && (
          <TaskBoard
            onNavigate={setPage}
          />
        )}

        {page === 'review' && (
          <ContributionReview
            onNavigate={setPage}
          />
        )}

        {page === 'analytics' && (
          <AnalyticsReceipt
            onNavigate={setPage}
          />
        )}

      </main>
    </div>
  );
}