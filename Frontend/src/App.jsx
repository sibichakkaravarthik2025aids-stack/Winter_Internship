import { useState } from 'react';
import './App.css';
import Students from './components/Students';
import Register from './components/hooks/Register';
import Users from './components/hooks/users';

function App() {
  const [count, setCount] = useState(0);
  const [showLorem, setShowLorem] = useState(true);

  return (
    <div className="app-shell">
      <header className="app-header">App</header>
      <main className="app-content">
        <Register />

        <section className="demo-section" aria-label="Interactive examples">
          <p>Count:{count}</p>
          <div className="control-row">
            <button type="button" className="button button-primary" onClick={() => setCount((currentCount) => currentCount + 1)}>
              Increase
            </button>
            <button type="button" className="button button-reset" onClick={() => setCount(0)}>
              reset
            </button>
          </div>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setShowLorem((isVisible) => !isVisible)}
          >
            Toggle
          </button>
        </section>

        {showLorem && (
          <p className="sample-copy">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi dolores minus omnis et tempore
            et, quaerat minima nobis voluptatibus esse atque eaque sed sapiente recusandae.
          </p>
        )}

        <div className="button-examples" aria-label="Button styles">
          <button type="button" className="button button-delete">Delete</button>
          <button type="button" className="button button-outline">Outline</button>
          <button type="button" className="button button-secondary">secondary</button>
          <button type="button" className="button button-ghost">Ghost</button>
        </div>

        <p className="app-message">This is test</p>
        <Users />
        <Students name="user" age={20} />
      </main>
    </div>
  );
}

export default App;
