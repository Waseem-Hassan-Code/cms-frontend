// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";

import Layout from "../layout/app-layout";
import Classes from "../pages/classes";
import Attendance from "../pages/attendance";
import StudentPage from "../pages/students";

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
