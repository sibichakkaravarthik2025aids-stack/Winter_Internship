import Icon from './Icon.jsx';

function Navbar({ search, onSearchChange, onAddTask }) {
  return (
    <header className="topbar">
      <div className="breadcrumbs"><span>Workspace</span><Icon name="chevron" size={14} /><strong>Overview</strong></div>
      <div className="topbar-actions">
        <label className="search-box">
          <Icon name="search" size={17} />
          <input
            aria-label="Search tasks"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search anything..."
            type="search"
            value={search}
          />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button notification-button" type="button" aria-label="Notifications">
          <Icon name="bell" size={19} /><span className="notification-dot" />
        </button>
        <button className="button button-primary topbar-add" type="button" onClick={onAddTask}>
          <Icon name="plus" size={17} /><span>New task</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
