import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";  // 修改R
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Project from "./Components/Project/Project";
import CreateProject from "./Components/CreateProject/CreateProject";
import Download2 from "./Components/Download2/Download";
import Requirement from "./Components/Requirement/Requirement";
import Steppage from "./Components/Steppage/Steppage";
import CheckData from "./Components/CheckData/CheckData";
import CheckRequirement from "./Components/CheckRequirement/CheckRequirement";
import Training from "./Components/Training/Training";

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
          <Route path="/Requirement" element={<Requirement/>}></Route>
          <Route path="/Steppage" element={<Steppage/>}></Route>
          <Route path="/CheckData" element={<CheckData/>}></Route>
          <Route path="/CheckRequirement" element={<CheckRequirement/>}></Route>
          <Route path="/Training" element={<Training/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;