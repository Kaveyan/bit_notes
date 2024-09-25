import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Facultyhome from './components/Facultyhome';
import Home from './components/home'; 
import Login from './components/Login';
import Studentcreate from './components/Studentcreate';
import Facultycreate from './components/Facultycreate';
import Rank from './components/Rank';
import Upload from './components/Upload';
import Chat from './components/chat'; 

import MainLayout from '../src/pages/MainLayout'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/faculty" element={<MainLayout><Facultyhome /></MainLayout>} />
        <Route path="/studentcreate" element={<Studentcreate />} />
        <Route path="/facultycreate" element={<Facultycreate />} />
        <Route path="/rank" element={<MainLayout><Rank /></MainLayout>} />
        <Route path="/upload" element={<MainLayout><Upload /></MainLayout>} />
        <Route path="/chat" element={<MainLayout><Chat /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
