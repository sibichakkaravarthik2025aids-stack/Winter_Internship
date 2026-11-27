import { useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Icon from './components/Icon.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import SystemBanner from './components/SystemBanner.jsx';
import TaskCard from './components/TaskCard.jsx';
import TaskForm from './components/TaskForm.jsx';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Service from './pages/Service.jsx';

const today = new Date();
const addDays = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const initialTasks = [
  {
    id: 'task-1',
    title: 'Review Q3 product roadmap',
    description: 'Align the upcoming milestones with the product and engineering teams.',
    project: 'Product launch',
    priority: 'High',
    dueDate: addDays(0),
    status: 'inProgress',
    assignee: 'Alex Morgan',
    initials: 'AM',
    color: 'violet',
  },
  {
    id: 'task-2',
    title: 'Update customer onboarding flow',
    description: 'Simplify the first-run checklist and incorporate the latest feedback.',
    project: 'Growth',
    priority: 'Medium',
    dueDate: addDays(1),
    status: 'todo',
    assignee: 'Jordan Lee',
    initials: 'JL',
    color: 'peach',
  },
  {
    id: 'task-3',
    title: 'Prepare design handoff',
    description: 'Share final component specs and responsive states with engineering.',
    project: 'Website redesign',
    priority: 'Low',
    dueDate: addDays(2),
    status: 'todo',
    assignee: 'Alex Morgan',
    initials: 'AM',
    color: 'violet',
  },
  {
    id: 'task-4',
    title: 'Finalize launch announcement',
    description: 'Review copy, links, and launch-day distribution with the team.',
    project: 'Product launch',
    priority: 'High',
    dueDate: addDays(3),
    status: 'inProgress',
    assignee: 'Sam Rivera',
    initials: 'SR',
    color: 'mint',
  },
  {
    id: 'task-5',
    title: 'Collect beta user feedback',
    description: 'Summarize key themes from the latest round of customer interviews.',
    project: 'Research',
    priority: 'Medium',
    dueDate: addDays(-1),
    status: 'done',
    assignee: 'Alex Morgan',
    initials: 'AM',
    color: 'violet',
  },
  {
    id: 'task-6',
    title: 'Organize shared workspace',
    description: 'Archive outdated files and tidy up the team project folders.',
    project: 'Operations',
    priority: 'Low',
    dueDate: addDays(-2),
    status: 'done',
    assignee: 'Taylor Kim',
    initials: 'TK',
    color: 'blue',
  },
];

const columns = [
  { id: 'todo', label: 'To do', color: 'slate' },
  { id: 'inProgress', label: 'In progress', color: 'violet' },
  { id: 'done', label: 'Completed', color: 'green' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getDateLabel() {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date()).toUpperCase();
}

function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState('overview');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesView = activeView !== 'myTasks' || task.assignee === 'Alex Morgan';
      const matchesSearch =
        !query ||
        [task.title, task.description, task.project, task.assignee]
          .some((value) => value.toLowerCase().includes(query));
      return matchesView && matchesSearch;
    });
  }, [activeView, search, tasks]);

  const openCount = tasks.filter((task) => task.status !== 'done').length;
  const completedCount = tasks.length - openCount;
  const inProgressCount = tasks.filter((task) => task.status === 'inProgress').length;
  const myTaskCount = tasks.filter((task) => task.assignee === 'Alex Morgan').length;

  function addTask(taskDetails) {
    setTasks((currentTasks) => [
      {
        ...taskDetails,
        id: `task-${Date.now()}`,
        project: 'New tasks',
        status: 'todo',
        assignee: 'Alex Morgan',
        initials: 'AM',
        color: 'violet',
      },
      ...currentTasks,
    ]);
    setIsTaskFormOpen(false);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
          : task,
      ),
    );
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} myTaskCount={myTaskCount} onViewChange={setActiveView} />
      <div className="workspace">
        <Navbar search={search} onSearchChange={setSearch} onAddTask={() => setIsTaskFormOpen(true)} />
        <main className="dashboard">
          <SystemBanner />
          <section className="welcome-row">
            <div>
              <p className="eyebrow">{getDateLabel()}</p>
              <h1>{getGreeting()}, Alex <span aria-hidden="true">✦</span></h1>
              <p className="welcome-copy">Here&apos;s what&apos;s happening with your workspace today.</p>
            </div>
            <button className="button button-primary welcome-add" onClick={() => setIsTaskFormOpen(true)} type="button">
              <Icon name="plus" size={17} />
              <span>New task</span>
            </button>
          </section>

          <section className="stats-grid" aria-label="Task overview">
            <article className="stat-card">
              <div className="stat-icon stat-icon-lavender"><Icon name="checklist" /></div>
              <div className="stat-content"><span>Open tasks</span><strong>{openCount}</strong></div>
              <span className="stat-trend">On your plate</span>
            </article>
            <article className="stat-card">
              <div className="stat-icon stat-icon-peach"><Icon name="clock" /></div>
              <div className="stat-content"><span>In progress</span><strong>{inProgressCount}</strong></div>
              <span className="stat-trend">Moving along</span>
            </article>
            <article className="stat-card">
              <div className="stat-icon stat-icon-mint"><Icon name="sparkle" /></div>
              <div className="stat-content"><span>Completed</span><strong>{completedCount}</strong></div>
              <span className="stat-trend">Nice work!</span>
            </article>
            <article className="stat-card stat-card-projects">
              <div className="stat-icon stat-icon-blue"><Icon name="folder" /></div>
              <div className="stat-content"><span>Active projects</span><strong>4</strong></div>
              <span className="stat-trend">Across your team</span>
            </article>
          </section>

          <section className="task-section" aria-labelledby="task-board-heading">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR WORKSPACE</p>
                <h2 id="task-board-heading">{activeView === 'myTasks' ? 'My tasks' : 'Task overview'}</h2>
              </div>
              <div className="board-legend"><span className="legend-dot" /> Live task board</div>
            </div>
            <div className="task-board">
              {columns.map((column) => {
                const columnTasks = visibleTasks.filter((task) => task.status === column.id);
                return (
                  <section className="task-column" key={column.id} aria-label={`${column.label} tasks`}>
                    <div className="column-heading">
                      <div className="column-title">
                        <span className={`column-dot column-dot-${column.color}`} />
                        <h3>{column.label}</h3>
                        <span className="column-count">{columnTasks.length}</span>
                      </div>
                      <button
                        className="icon-button column-add"
                        type="button"
                        aria-label={`Add a ${column.label.toLowerCase()} task`}
                        onClick={() => setIsTaskFormOpen(true)}
                      >
                        <Icon name="plus" size={17} />
                      </button>
                    </div>
                    <div className="task-list">
                      {columnTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onToggle={() => toggleTask(task.id)} />
                      ))}
                      {columnTasks.length === 0 && (
                        <p className="empty-column">No tasks here yet.</p>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
          <footer className="dashboard-footer">A little progress adds up. You&apos;ve got this <span aria-hidden="true">✦</span></footer>
        </main>
      </div>
      {isTaskFormOpen && <TaskForm onClose={() => setIsTaskFormOpen(false)} onSubmit={addTask} />}
    </div>
  );
}

function App() {
  return (
    <>
      <header className="demo-header">
        <Link className="demo-brand" to="/">App</Link>
        <nav aria-label="Main navigation">
          <Link to="/">Register</Link>
          <Link to="/service">Users</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
