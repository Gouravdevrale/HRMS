import {
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaClipboardList,
  FaChartBar,
  FaMapMarkerAlt,
  FaIdBadge,
  FaCalendarAlt,
  FaWallet,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const role = user?.role;
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-5 text-2xl font-bold border-b border-slate-700">
        HRMS
      </div>

      <nav className="p-4 space-y-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
        >
          <FaChartBar />
          Dashboard
        </Link>

       {["admin", "hr"].includes(role) && (
  <Link
    to="/employees"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaUsers />
    Employees
  </Link>
)}

        {role === "admin" && (
  <Link
    to="/departments"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaBuilding />
    Departments
  </Link>
)}

       {role === "admin" && (
  <Link
    to="/locations"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaMapMarkerAlt />
    Locations
  </Link>
)}

       {role === "admin" && (
  <Link
    to="/designations"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaIdBadge />
    Designations
  </Link>
)}

        {["admin", "hr"].includes(role) && (
  <Link
    to="/attendance"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaClipboardList />
    Attendance
  </Link>
)}

       {["admin", "hr"].includes(role) && (
  <Link
    to="/leaves"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaCalendarAlt />
    Leaves
  </Link>
)}

       {role === "admin" && (
  <Link
    to="/leave-balance"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaWallet />
    Leave Balance
  </Link>
)}

       {role === "admin" && (
  <Link
    to="/salary-structure"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaMoneyCheckAlt />
    Salary Structure
  </Link>
)}

       {["admin", "hr"].includes(role) && (
  <Link
    to="/payroll"
    className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded"
  >
    <FaMoneyBillWave />
    Payroll
  </Link>
)}
      </nav>
    </div>
  );
};

export default Sidebar;
