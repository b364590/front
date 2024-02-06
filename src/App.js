import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";  // 修改R
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Project from "./Components/Project/Project";
import CreateProject from "./Components/CreateProject/CreateProject";
import Download2 from "./Components/Download2/Download";

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Project" element={<Project/>}></Route>
          <Route path="/CreateProject" element={<CreateProject/>}></Route>
          <Route path="/Download2" element={<Download2/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;