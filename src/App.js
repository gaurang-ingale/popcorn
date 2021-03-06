import { useState } from "react";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import ResultContainer from "./containers/ResultContainer";
import About from "./components/About";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";

function App() {
  const [searchName, setSearchName] = useState("");

  const navSearchHandler = () => {
    setSearchName(document.getElementById("search").value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar onChange={navSearchHandler} />
      </header>
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path={"/search/:name"}>
          <ResultContainer name={searchName} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
