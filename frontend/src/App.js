import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CatgeoryServicesTemplate from "./pages/ServicesListByCategoryPage";
import ServicesTemplate from "./pages/SingleServicePage.js"
import Search from "./components/Forms/Search";
import AppointmentSchedulingPage from "./pages/AppointmentScheduling/AppointmentSchedulingPage";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Search />
          <Routes>
          <Route path='/' element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories/:slug" element={<CatgeoryServicesTemplate />} />
            <Route path="/services/:slug" element={<ServicesTemplate />} />
            <Route path="/appointments/schedule-appointment" element={<AppointmentSchedulingPage />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
