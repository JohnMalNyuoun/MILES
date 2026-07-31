import React, { useCallback, useEffect, useState } from 'react';

const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL || '';

function PendingActionsReview({ currentUsername, authHeaders }) {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowStatus, setRowStatus] = useState({});

  const fetchPendingActions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiBaseUrl()}/api/admin/pending-actions`, {
        headers: authHeaders,
      });
      if (!response.ok) return;
      const data = await response.json();
      setActions(Array.isArray(data) ? data : []);
    } catch {
      // silently fail — dashboard renders without feed if API is unreachable
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    fetchPendingActions();
  }, [fetchPendingActions]);

  const handleApprove = async (actionId) => {
    setRowStatus((prev) => ({ ...prev, [actionId]: 'loading' }));
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/admin/process-approval`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ actionId, currentAdminUsername: currentUsername }),
      });
      const data = await response.json();
      if (!response.ok) {
        setRowStatus((prev) => ({ ...prev, [actionId]: { error: data.error || 'Approval failed.' } }));
        return;
      }
      setRowStatus((prev) => ({ ...prev, [actionId]: 'approved' }));
      setTimeout(() => {
        setActions((prev) => prev.filter((a) => a._id !== actionId));
        setRowStatus((prev) => {
          const next = { ...prev };
          delete next[actionId];
          return next;
        });
      }, 1200);
    } catch {
      setRowStatus((prev) => ({ ...prev, [actionId]: { error: 'Network error.' } }));
    }
  };

  const handleReject = async (actionId) => {
    setRowStatus((prev) => ({ ...prev, [actionId]: 'loading' }));
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/admin/reject-action`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ actionId, currentAdminUsername: currentUsername }),
      });
      const data = await response.json();
      if (!response.ok) {
        setRowStatus((prev) => ({ ...prev, [actionId]: { error: data.error || 'Rejection failed.' } }));
        return;
      }
      setRowStatus((prev) => ({ ...prev, [actionId]: 'rejected' }));
      setTimeout(() => {
        setActions((prev) => prev.filter((a) => a._id !== actionId));
        setRowStatus((prev) => {
          const next = { ...prev };
          delete next[actionId];
          return next;
        });
      }, 1200);
    } catch {
      setRowStatus((prev) => ({ ...prev, [actionId]: { error: 'Network error.' } }));
    }
  };

  if (loading) {
    return (
      <article className="par-panel">
        <h2 className="par-title">Dual-Authorization Review Feed</h2>
        <p className="par-empty">Loading pending actions…</p>
      </article>
    );
  }

  if (actions.length === 0) {
    return (
      <article className="par-panel">
        <h2 className="par-title">Dual-Authorization Review Feed</h2>
        <p className="par-empty">No pending actions require authorization.</p>
      </article>
    );
  }

  return (
    <article className="par-panel">
      <h2 className="par-title">Dual-Authorization Review Feed</h2>
      <p className="par-subtitle">
        All staged changes must be verified by the second administrator before going live.
      </p>

      <ul className="par-list">
        {actions.map((action) => {
          const isOwner = action.createdBy === currentUsername;
          const state = rowStatus[action._id];

          return (
            <li key={action._id} className={`par-row ${state === 'approved' ? 'par-row--approved' : ''} ${state === 'rejected' ? 'par-row--rejected' : ''}`}>
              <div className="par-row-body">
                <div className="par-row-header">
                  <span className="par-action-type">{action.actionType}</span>
                  <span className="par-collection">{action.targetCollection}</span>
                </div>
                <p className="par-proposed-label">
                  Proposed by <strong className="par-username">{action.createdBy}</strong>
                  {' · '}
                  {new Date(action.createdAt).toLocaleString()}
                </p>
                {action.proposedData && (
                  <p className="par-data-summary">
                    {Object.entries(action.proposedData)
                      .slice(0, 3)
                      .map(([key, val]) => `${key}: ${String(val).slice(0, 60)}`)
                      .join(' · ')}
                  </p>
                )}
                {state?.error && (
                  <p className="par-row-error">{state.error}</p>
                )}
              </div>

              <div className="par-row-controls">
                {isOwner ? (
                  <span className="par-awaiting-badge" aria-disabled="true">
                    Awaiting Co-Admin Validation
                  </span>
                ) : state === 'approved' ? (
                  <span className="par-flash-approved">✓ Deployed</span>
                ) : state === 'rejected' ? (
                  <span className="par-flash-rejected">✕ Rejected</span>
                ) : (
                  <>
                    <button
                      type="button"
                      className="par-btn-approve"
                      disabled={state === 'loading'}
                      onClick={() => handleApprove(action._id)}
                    >
                      {state === 'loading' ? '…' : 'Approve'}
                    </button>
                    <button
                      type="button"
                      className="par-btn-reject"
                      disabled={state === 'loading'}
                      onClick={() => handleReject(action._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default PendingActionsReview;
