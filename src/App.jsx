import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login/login.jsx";
import Signup from "./components/SignUp/signup.jsx";
import Head_AdminDashboard from "./components/User/HeadAdmin/Dashboard.jsx";
import ManageUser from "@/components/User/HeadAdmin/ManageUser";
import Amount from "@/components/User/HeadAdmin/Amount.jsx";
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Head_AdminDashboard />} />
         <Route path="/manage-user" element={<ManageUser />} />
         <Route path="/amount" element={<Amount />} />
      </Routes>
    </Router>
  )
}

export default App
