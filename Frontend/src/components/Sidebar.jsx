import Icon from './Icon.jsx';

function Sidebar({ activeView, myTaskCount, onViewChange }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" aria-label="PulseWorks AI home">
        <span className="brand-mark"><span /><span /><span /><span /></span>
        <span className="brand-name">pulseworks<span>AI</span></span>
      </a>

      <div className="workspace-switcher">
        <span className="workspace-avatar">P</span>
        <span className="workspace-info"><strong>PulseWorks</strong><small>Free workspace</small></span>
        <Icon name="chevron" size={16} className="workspace-chevron" />
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <p className="nav-label">WORKSPACE</p>
        <button
          className={`nav-item ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => onViewChange('overview')}
          type="button"
        >
          <Icon name="dashboard" size={18} /><span>Overview</span>
        </button>
        <button
          className={`nav-item ${activeView === 'myTasks' ? 'active' : ''}`}
          onClick={() => onViewChange('myTasks')}
          type="button"
        >
          <Icon name="checklist" size={18} /><span>My tasks</span><span className="nav-count">{myTaskCount}</span>
        </button>
        <div className="sidebar-projects">
          <p className="nav-label">YOUR PROJECTS <button type="button" aria-label="Add project">+</button></p>
          <div className="project-link"><span className="project-mark project-mark-violet" />Product launch</div>
          <div className="project-link"><span className="project-mark project-mark-peach" />Website redesign</div>
          <div className="project-link"><span className="project-mark project-mark-mint" />Growth</div>
          <button type="button" className="all-projects"><Icon name="plus" size={15} />Add a project</button>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="team-card">
          <div className="team-avatars" aria-hidden="true">
            <span className="team-avatar team-avatar-violet">A</span>
            <span className="team-avatar team-avatar-peach">J</span>
            <span className="team-avatar team-avatar-mint">S</span>
            <span className="team-avatar team-avatar-more">+2</span>
          </div>
          <strong>Your team</strong>
          <small>5 members collaborating</small>
          <button type="button" aria-label="Invite a teammate" className="team-invite"><Icon name="plus" size={16} /></button>
        </div>
        <button type="button" className="profile-button">
          <span className="profile-avatar">AM</span>
          <span className="profile-info"><strong>Alex Morgan</strong><small>Workspace admin</small></span>
          <Icon name="chevron" size={15} className="profile-chevron" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
