import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL || '';

const initialForgotForm = {
  username: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
};

function AdminLogin() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [forgotStage, setForgotStage] = useState('request');
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [forgotForm, setForgotForm] = useState(initialForgotForm);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [codeExpiresIn, setCodeExpiresIn] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForgotFlow = () => {
    setForgotForm(initialForgotForm);
    setForgotStage('request');
    setMaskedEmail('');
  };

  const parseResponse = async (response) => {
    let data = {};
    try {
      data = await response.json();
    } catch (_parseError) {
      throw new Error(
        response.ok
          ? 'Server returned an unexpected response. Please try again.'
          : `Server error (${response.status}). Please check the backend is running.`
      );
    }
    return data;
  };

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

      const data = await parseResponse(response);
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

  const handleRequestCode = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!forgotForm.username) {
      setError('Please enter your username.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: forgotForm.username }),
      });

      const data = await parseResponse(response);
      if (!response.ok) {
        throw new Error(data.message || 'Unable to send reset code.');
      }

      setMaskedEmail(data.maskedEmail || '');
      setCodeExpiresIn(data.expiresInMinutes || 15);
      setForgotStage('verify');
      setSuccess(
        data.maskedEmail
          ? `A 6-digit code was sent to ${data.maskedEmail}. It expires in ${data.expiresInMinutes || 15} minutes.`
          : 'If an account exists, a verification code was sent to its email.'
      );
    } catch (err) {
      setError(err.message || 'Unable to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!forgotForm.code) {
      setError('Please enter the 6-digit code from your email.');
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
      const response = await fetch(`${apiBaseUrl}/api/auth/forgot-password/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: forgotForm.username,
          code: forgotForm.code.trim(),
          newPassword: forgotForm.newPassword,
        }),
      });

      const data = await parseResponse(response);
      if (!response.ok) {
        throw new Error(data.message || 'Unable to reset password.');
      }

      setSuccess(data.message || 'Password reset successful.');
      setAuthForm((current) => ({ ...current, username: forgotForm.username, password: '' }));
      resetForgotFlow();
      setMode('login');
    } catch (err) {
      setError(err.message || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const headerTitle = mode === 'login'
    ? 'Admin Dashboard Login'
    : forgotStage === 'request'
      ? 'Forgot Password'
      : 'Enter Verification Code';

  const headerSubtitle = mode === 'login'
    ? 'Sign in with an admin account to manage projects and team members.'
    : forgotStage === 'request'
      ? 'Enter your admin username and we will email you a 6-digit verification code.'
      : `Enter the 6-digit code we sent${maskedEmail ? ` to ${maskedEmail}` : ' to your email'} and choose a new password.`;

  return (
    <section className="admin-page">
      <div className="admin-auth-card">
        <h1>{headerTitle}</h1>
        <p>{headerSubtitle}</p>

        {mode === 'login' && (
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
        )}

        {mode === 'forgot' && forgotStage === 'request' && (
          <form onSubmit={handleRequestCode} className="admin-form">
            <label>
              Username
              <input
                type="text"
                value={forgotForm.username}
                onChange={(event) =>
                  setForgotForm((current) => ({ ...current, username: event.target.value }))
                }
                placeholder="admin_username"
                autoFocus
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? 'Sending code...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {mode === 'forgot' && forgotStage === 'verify' && (
          <form onSubmit={handleVerifyCode} className="admin-form">
            <label>
              Verification Code
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={forgotForm.code}
                onChange={(event) =>
                  setForgotForm((current) => ({
                    ...current,
                    code: event.target.value.replace(/\D/g, '').slice(0, 6),
                  }))
                }
                placeholder="6-digit code"
                autoFocus
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
                placeholder="New password (min 6 characters)"
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
              {loading ? 'Verifying...' : 'Reset Password'}
            </button>

            <button
              type="button"
              className="admin-link-btn"
              onClick={() => {
                setForgotStage('request');
                setError('');
                setSuccess('');
              }}
              disabled={loading}
            >
              Use a different username / resend code
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
                resetForgotFlow();
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
                resetForgotFlow();
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
