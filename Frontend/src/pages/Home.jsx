import { useState } from 'react';
import Register from '../components/hooks/Register.jsx';
import Students from '../components/Students.jsx';

const Home = () => {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  return (
    <main className="demo-page">
      <Register />
      <section className="demo-section" aria-label="Counter demo">
        <p>Count: {count}</p>
        <div className="demo-actions">
          <button type="button" onClick={() => setCount((value) => value + 1)}>Increase</button>
          <button className="demo-reset" type="button" onClick={() => setCount(0)}>reset</button>
        </div>
        <button type="button" onClick={() => setShowMessage((visible) => !visible)}>Toggle</button>
        {showMessage && (
          <p className="demo-copy">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi dolores minus omnis et tempore.
          </p>
        )}
        <div className="demo-button-row" aria-label="Button styles">
          <button className="demo-delete" type="button">Delete</button>
          <button className="demo-outline" type="button">Outline</button>
          <button className="demo-secondary" type="button">secondary</button>
          <button className="demo-ghost" type="button">Ghost</button>
        </div>
        <p>This is test</p>
        <Students name="user" age={20} />
      </section>
    </main>
  );
};

export default Home
