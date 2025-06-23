import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import FormGroup from '../components/common/FormGroup';
import { useAuthContext } from '../contexts/AuthContext';
import { ErrorMessage } from '../constants/errorMessages';
import { useMutation } from '../hooks/useMutation';
import { login } from '../services/authService';
import type { ApiErrorResponse } from '../types/api';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuth } = useAuthContext();
  const { mutate: doLogin, loading, error: loginError, data: user } = useMutation(login);

  useEffect(() => {
    if (loginError) {
      let msg = 'Login failed';
      if (loginError instanceof AxiosError && loginError.response) {
        const data = loginError.response.data as ApiErrorResponse;
        msg = ErrorMessage[data.errorCode] || data.message;
      }
      setErrorMessage(msg);
    }
  }, [loginError]);

  useEffect(() => {
    if (user) {
      setAuth(user);
    }
  }, [user, setAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    doLogin(username);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <FormGroup
                  label="Username"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
              <div className="mt-3">
                <p className="mb-0">Use 'employee1/employee2' or 'manager1/manager2' to log in.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
