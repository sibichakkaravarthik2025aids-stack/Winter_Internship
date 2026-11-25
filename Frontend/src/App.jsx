import Students from './components/Students';

function App() {
  let name = "test";
  return (
    <>
      <div>
        {/* 2. Removed <App/> to stop the infinite loop */}
      </div>
      <h1>This is {name}</h1> {/* 3. Changed (name) to {name} */}
      <Students name="user" age="20" />
    </>
  );
}

export default App;