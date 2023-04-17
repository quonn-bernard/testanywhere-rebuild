import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CatgeoryServicesTemplate from "./pages/ServicesListByCategoryPage";
import ServicesTemplate from "./pages/SingleServicePage.js"
import AppointmentSchedulingPage from "./pages/AppointmentScheduling/AppointmentSchedulingPage";
import Search from "./components/Forms/Search.js";

function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;
