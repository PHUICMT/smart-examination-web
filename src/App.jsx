import "./App.scss";

import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header/header";

import LandingPage from "./pages/LandingPage/LandingPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import EnterPin from "./pages/EnterPin/EnterPin";
import CreateExam from "./pages/CreateExam/CreateExam";
import ExamPage from "./pages/ExamPage/ExamPage";
import ResultPage from "./pages/ResultPage/ResultPage";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/index" component={LandingPage} />

          <Route path="/student/enter-pin" component={EnterPin} />
          <Route path="/student/exampage" component={ExamPage} />
          <Route path="/teacher/dashboard" component={DashBoard} />
          <Route path="/teacher/create-exam" component={CreateExam} />
          <Route path="/resultpage" component={ResultPage} />
          <Route path="*" exact>
            <Redirect from="*" to="/index" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
