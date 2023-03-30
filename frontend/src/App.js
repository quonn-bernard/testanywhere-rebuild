import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
          <Route path='/' element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
