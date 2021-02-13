import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Welcome />
    </div>
  );
}

export default App;
