import './App.css';
import Facultyhome from './components/Facultyhome';
import Home from './components/home';
import Login from "./components/Login";
import Studentcreate from './components/Studentcreate';
import Facultycreate from './components/Facultycreate';
import Rank from './components/Rank';
import Upload from './components/Upload';
import Chat from './components/chat';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/faculty" element={<Facultyhome />} />
          <Route path="/studentcreate" element={<Studentcreate />} />
          <Route path="/facultycreate" element={<Facultycreate />} />
          <Route path="/rank" element={<Rank/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/chat" element={<Chat/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
