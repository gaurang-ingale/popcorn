import NavBar from "./components/NavBar";
import Result from "./components/Result";
import Welcome from "./components/Welcome";
import ResultContainer from "./containers/ResultContainer";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <ResultContainer name="looper" />
    </div>
  );
}

export default App;
