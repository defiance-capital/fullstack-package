import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { LeaveProvider } from './contexts/LeaveContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function MainApp() {
  const { user } = useAuthContext();

  return user ? (
    <LeaveProvider>
      <HomePage user={user} />
    </LeaveProvider>
  ) : (
    <LoginPage />
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
