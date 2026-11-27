import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

function getElapsedLabel(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
}

function SystemBanner() {
  const [lastChecked, setLastChecked] = useState(() => Date.now());
  const [elapsedLabel, setElapsedLabel] = useState('just now');

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setElapsedLabel(getElapsedLabel(lastChecked));
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [lastChecked]);

  function refreshStatus() {
    const now = Date.now();
    setLastChecked(now);
    setElapsedLabel('just now');
  }

  return (
    <section className="system-banner" aria-label="Workspace status">
      <div className="system-status">
        <span className="system-status-icon"><Icon name="sparkle" size={16} /></span>
        <span className="system-pulse" />
        <strong>Workspace ready</strong>
        <span className="system-divider" />
        <span className="system-detail">Your team is all caught up</span>
      </div>
      <button className="system-refresh" type="button" onClick={refreshStatus}>
        <Icon name="refresh" size={15} /><span>Updated {elapsedLabel}</span>
      </button>
    </section>
  );
}

export default SystemBanner;
