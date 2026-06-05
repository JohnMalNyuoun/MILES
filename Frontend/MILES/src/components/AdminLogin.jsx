import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL || '';

function AdminLogin() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const navigate = useNavigate();
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!authForm.username || !authForm.password) {
      setError('Username and password are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      if (data.user?.role !== 'admin') {
        throw new Error('This account is not an admin account.');
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-auth-card">
        <h1>Admin Dashboard Login</h1>
        <p>Sign in with an admin account to manage projects and team members.</p>

        <form onSubmit={handleAuthSubmit} className="admin-form">
          <label>
            Username
            <input
              type="text"
              value={authForm.username}
              onChange={(event) =>
                setAuthForm((current) => ({ ...current, username: event.target.value }))
              }
              placeholder="admin_username"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={authForm.password}
              onChange={(event) =>
                setAuthForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="Enter password"
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {error && <p className="admin-alert admin-alert-error">{error}</p>}
      </div>
    </section>
  );
}

export default AdminLogin;
