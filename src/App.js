import NavBar from "./components/NavBar";
import Result from "./components/Result";
import Welcome from "./components/Welcome";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Result />
    </div>
  );
}

export default App;
