import LeaveBalance from '../components/leave/LeaveBalance';
import LeaveHistory from '../components/leave/LeaveHistory';
import LeaveRequestForm from '../components/leave/LeaveRequestForm';
import ManagerView from '../components/manager/ManagerView';
import { Role } from '../constants/role';
import { useAuthContext } from '../contexts/AuthContext';
import { logout } from '../services/authService';
import type { User } from '../types/user';

interface HomePageProps {
  user: User;
}

function HomePage({ user }: HomePageProps) {
  const { clearAuth } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuth();
    }
  };

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1>Leave Management System</h1>
        <div>
          <span className="me-3">
            Welcome, {user.name} ({user.role})
          </span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main>
        {user.role === Role.EMPLOYEE ? (
          <>
            <LeaveBalance />
            <LeaveRequestForm />
            <LeaveHistory />
          </>
        ) : (
          <ManagerView />
        )}
      </main>
    </div>
  );
}

export default HomePage;
