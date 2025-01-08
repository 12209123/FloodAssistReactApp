import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "react-bootstrap";
import Discover from "./pages/Discover";
import CurrentTask from "./pages/CurrentTask";
import Coupons from "./pages/Coupons";
import CreateTask from "./pages/CreateTask";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import CustomNavbar from "./CustomNavbar";
import Emergency from "./pages/Emergency";
import CouponDetail from "./pages/CouponDetail";

function App() {
  return (
    <Router>
      <CustomNavbar>
        <Routes>
          <Route path="/" element={<Discover onPositionSelect={() => {}} />} />
          <Route path="/currentTask" element={<CurrentTask />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/couponDetail" element={<CouponDetail />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="emergency/:id" element={<Emergency />} />
        </Routes>
      </CustomNavbar>
    </Router>
  );
}

export default App;
