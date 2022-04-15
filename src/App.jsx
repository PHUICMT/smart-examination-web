import "./App.scss";

import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header/header";

import LandingPage from "./pages/LandingPage/LandingPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import EnterPin from "./pages/EnterPin/EnterPin";
import CreateExam from "./pages/CreateExam/CreateExam";
import ExamPage from "./pages/ExamPage/ExamPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import SelectSubject from "./pages/SelectSubject/SelectSubject";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const RouteOnLogin = () => {
  const [status, setStatus] = useState("not-login");

  useEffect(() => {
    let isStudentData = window.sessionStorage.getItem("isStudent");
    if (isStudentData !== null) {
      if (isStudentData === "true") {
        setStatus("student");
      } else {
        setStatus("teacher");
      }
    } else {
      setStatus("not-login");
    }
  }, [status]);

  switch (
    status //ถ้าจะ Dev ให้เปลี่ยน status เป็น null -> switch (null)
  ) {
    case "student":
      return <StudentRoute />;
    case "teacher":
      return <TeacherRoute />;
    case "not-login":
      return <DefaultRoute />;
    default:
      return <AllRoute />;
  }
};

const AllRoute = () => {
  return (
    <Switch>
      <Route path="/index" component={LandingPage} />
      <Route
        path="/student/enter-pin"
        render={(props) => (
          <EnterPin
            {...props}
            isStudent={true}
            title={"กรุณากรอกรหัสเพื่อเข้าสอบ"}
          />
        )}
      />
      <Route path="/student/exampage" component={ExamPage} />
      <Route
        path="/teacher/enter-pin"
        render={(props) => (
          <EnterPin
            {...props}
            isStudent={false}
            title={"กรุณากรอกรหัสเพื่อดูผลลัพธ์ข้อสอบ"}
          />
        )}
      />
      <Route path="/teacher/dashboard" component={DashBoard} />
      <Route path="/teacher/select-subject" component={SelectSubject} />
      <Route path="/teacher/create-exam" component={CreateExam} />
      <Route path="/teacher/result-page" component={ResultPage} />
      <Route path="*" exact>
        <Redirect from="*" to="/index" />
      </Route>
    </Switch>
  );
};

const DefaultRoute = () => {
  return (
    <Switch>
      <Route path="/index" component={LandingPage} />
      <Route path="*" exact>
        <Redirect from="*" to="/index" />
      </Route>
    </Switch>
  );
};

const StudentRoute = () => {
  return (
    <Switch>
      <Route path="/index" component={LandingPage} />
      <Route
        path="/student/enter-pin"
        render={(props) => (
          <EnterPin
            {...props}
            isStudent={true}
            title={"กรุณากรอกรหัสเพื่อเข้าสอบ"}
          />
        )}
      />
      <Route path="/student/exampage" component={ExamPage} />
      <Route path="*" exact>
        <Redirect from="*" to="/index" />
      </Route>
    </Switch>
  );
};

const TeacherRoute = () => {
  return (
    <Switch>
      <Route path="/index" component={LandingPage} />
      <Route
        path="/teacher/enter-pin"
        render={(props) => (
          <EnterPin
            {...props}
            isStudent={false}
            title={"กรุณากรอกรหัสเพื่อดูผลลัพธ์ข้อสอบ"}
          />
        )}
      />
      <Route path="/teacher/dashboard" component={DashBoard} />
      <Route path="/teacher/select-subject" component={SelectSubject} />
      <Route path="/teacher/create-exam" component={CreateExam} />
      <Route path="/teacher/result-page" component={ResultPage} />
      <Route path="*" exact>
        <Redirect from="*" to="/index" />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <RouteOnLogin />
      </Router>
    </div>
  );
}

export default App;
