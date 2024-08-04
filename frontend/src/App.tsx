import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import AppointmentComponent from "./Appointments";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import SignUp from "./SignUp";
import Request from "./components/Request";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Urgence from "./components/Urgence";
import SurPlacePage from "./components/SurPlacePage";
import EnLignePage from "./components/EnLignePage";
import ADomicilePage from "./components/ADomicilePage";

const PrivateRoute: React.FC<{ children: JSX.Element; isAdmin?: boolean }> = ({
  children,
  isAdmin,
}) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/apointements"
          element={
            <PrivateRoute>
              <Layout>
                <AppointmentComponent />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/urgence" element={<Urgence />} />
                <Route path="/sur-place" element={<SurPlacePage />} />
                <Route path="/en-ligne" element={<EnLignePage />} />
                <Route path="/a-domicile" element={<ADomicilePage />} />
                <Route
                  path="/apointements"
                  element={<AppointmentComponent />}
                />
                <Route path="/request" element={<Request />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
