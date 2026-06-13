// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Locations from "./pages/Locations";
import Designations from "./pages/Designations";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import LeaveBalance from "./pages/LeaveBalance";
import SalaryStructure from "./pages/SalaryStructure";
import Payroll from "./pages/Payroll";
import EmployeeProfile from "./pages/EmployeePofile";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/locations"
          element={
            <ProtectedRoute>
              <Locations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/designations"
          element={
            <ProtectedRoute>
              <Designations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-balance"
          element={
            <ProtectedRoute>
              <LeaveBalance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salary-structure"
          element={
            <ProtectedRoute>
              <SalaryStructure />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
