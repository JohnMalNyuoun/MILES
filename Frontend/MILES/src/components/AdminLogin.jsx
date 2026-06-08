import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL || '';

function AdminLogin() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [forgotForm, setForgotForm] = useState({
    username: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

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

      let data = {};
      try {
        data = await response.json();
      } catch (_parseError) {
        throw new Error(
          response.ok
            ? 'Server returned an unexpected response. Please try again.'
            : `Server error (${response.status}). Please check the backend is running on port 5000.`
        );
      }
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

  const handleForgotSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!forgotForm.username || !forgotForm.email || !forgotForm.newPassword) {
      setError('Username, email and new password are required.');
      return;
    }

    if (forgotForm.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (forgotForm.newPassword !== forgotForm.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: forgotForm.username,
          email: forgotForm.email,
          newPassword: forgotForm.newPassword,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch (_parseError) {
        throw new Error(
          response.ok
            ? 'Server returned an unexpected response. Please try again.'
            : `Server error (${response.status}). Please check the backend is running on port 5000.`
        );
      }
      if (!response.ok) {
        throw new Error(data.message || 'Unable to reset password.');
      }

      setSuccess(data.message || 'Password reset successful.');
      setMode('login');
      setAuthForm((current) => ({ ...current, username: forgotForm.username, password: '' }));
      setForgotForm({ username: '', email: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-auth-card">
        <h1>{mode === 'login' ? 'Admin Dashboard Login' : 'Forgot Password'}</h1>
        <p>
          {mode === 'login'
            ? 'Sign in with an admin account to manage projects and team members.'
            : 'Provide your username and email to reset your password.'}
        </p>

        {mode === 'login' ? (
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
        ) : (
          <form onSubmit={handleForgotSubmit} className="admin-form">
            <label>
              Username
              <input
                type="text"
                value={forgotForm.username}
                onChange={(event) =>
                  setForgotForm((current) => ({ ...current, username: event.target.value }))
                }
                placeholder="admin_username"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={forgotForm.email}
                onChange={(event) =>
                  setForgotForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="admin@example.com"
              />
            </label>

            <label>
              New Password
              <input
                type="password"
                value={forgotForm.newPassword}
                onChange={(event) =>
                  setForgotForm((current) => ({ ...current, newPassword: event.target.value }))
                }
                placeholder="New password"
              />
            </label>

            <label>
              Confirm New Password
              <input
                type="password"
                value={forgotForm.confirmPassword}
                onChange={(event) =>
                  setForgotForm((current) => ({ ...current, confirmPassword: event.target.value }))
                }
                placeholder="Confirm new password"
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="admin-auth-switch">
          {mode === 'login' ? (
            <button
              type="button"
              className="admin-link-btn"
              onClick={() => {
                setMode('forgot');
                setError('');
                setSuccess('');
              }}
            >
              Forgot password?
            </button>
          ) : (
            <button
              type="button"
              className="admin-link-btn"
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
            >
              Back to login
            </button>
          )}
        </div>

        {error && <p className="admin-alert admin-alert-error">{error}</p>}
        {success && <p className="admin-alert admin-alert-success">{success}</p>}
      </div>
    </section>
  );
}

export default AdminLogin;
