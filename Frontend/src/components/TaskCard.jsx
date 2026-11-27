import Icon from './Icon.jsx';

function formatDueDate(value) {
  if (!value) return 'No due date';
  const date = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function TaskCard({ task, onToggle }) {
  const isComplete = task.status === 'done';
  return (
    <article className={`task-card ${isComplete ? 'task-card-complete' : ''}`}>
      <div className="task-card-top">
        <span className={`task-project project-tag-${task.color}`}>{task.project}</span>
        <button
          className={`task-complete ${isComplete ? 'is-complete' : ''}`}
          type="button"
          onClick={onToggle}
          aria-label={isComplete ? `Reopen ${task.title}` : `Complete ${task.title}`}
          aria-pressed={isComplete}
        >
          {isComplete && <Icon name="check" size={13} />}
        </button>
      </div>
      <h4>{task.title}</h4>
      <p className="task-description">{task.description}</p>
      <div className="task-card-bottom">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          <span />{task.priority}
        </span>
        <div className="task-meta">
          <span className="task-due"><Icon name="calendar" size={14} />{formatDueDate(task.dueDate)}</span>
          <span className={`assignee-avatar avatar-${task.color}`} title={task.assignee}>{task.initials}</span>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
