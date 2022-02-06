import "./App.scss";

import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage';
import Header from "./components/header/header";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/index" component={LandingPage} />
          <Route path="/student" component={LandingPage} /> // TODO add student component here
          <Route path="/teacher" component={LandingPage} /> // TODO add teacher component here
          <Route path='*' exact >
            <Redirect from='*' to='/index' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
