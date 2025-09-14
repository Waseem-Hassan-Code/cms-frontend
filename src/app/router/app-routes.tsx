// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Layout from "../layout/app-layout";
import Classes from "../pages/classes";
import Attendance from "../pages/attendance";
import StudentPage from "../pages/students";
import AdmissionPage from "../pages/student-admissions";
import AppSettings from "../pages/app-settings";
import Teachers from "../pages/teachers";
import FeeDetailsPage from "../pages/students/student-detail/fee-details/student-fee-details";
import StudentReportCardPage from "../pages/students/student-detail/report-card/report-card";
import StudentEvaluationDetail from "../pages/students/student-detail/student-evaluation/student-evaluaion";
import RequireAuth from "./require-auth";

// Optional stub if you want a public route now
const Login = () => <div>Login (public) — add your form here</div>;

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public (if any) */}
          <Route path="/login" element={<Login />} />

          {/* Protected group */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/settings" element={<AppSettings />} />
            <Route
              path="/students/:id/fee-details"
              element={<FeeDetailsPage />}
            />
            <Route
              path="/students/:id/report-card"
              element={<StudentReportCardPage />}
            />
            <Route
              path="/students/:id/evaluation"
              element={<StudentEvaluationDetail />}
            />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
