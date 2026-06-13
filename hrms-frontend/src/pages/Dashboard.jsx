import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [recentLeaves, setRecentLeaves] = useState([]);

  const getStats = async () => {
    try {
      const [statsRes, recentRes, leavesRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/recent-employees"),
        api.get("/dashboard/recent-leaves"),
      ]);

      setStats(statsRes.data.stats);

      setDepartmentStats(statsRes.data.departmentStats || []);

      setRecentEmployees(recentRes.data.employees || []);
      setRecentLeaves(leavesRes.data.leaves || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Total Employees</h3>

          <p className="text-3xl font-bold mt-2">
            {stats?.totalEmployees || 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Departments</h3>

          <p className="text-3xl font-bold mt-2">
            {stats?.totalDepartments || 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Present Today</h3>

          <p className="text-3xl font-bold mt-2">{stats?.presentToday || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Payroll Cost</h3>

          <p className="text-3xl font-bold mt-2">
            ₹{stats?.monthlyPayrollCost || 0}
          </p>
        </div>
      </div>
      <div className="bg-white shadow rounded-xl p-5 mt-6">
        <h2 className="text-xl font-bold mb-5">Employees By Department</h2>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentStats}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white shadow rounded-xl p-5 mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Employees</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Employee ID</th>

                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">Email</th>
              </tr>
            </thead>

            <tbody>
              {recentEmployees.map((employee) => (
                <tr key={employee._id} className="border-b">
                  <td className="p-3">{employee.employeeId}</td>

                  <td className="p-3">
                    {employee.firstName} {employee.lastName}
                  </td>

                  <td className="p-3">{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-5 mt-6">
  <h2 className="text-xl font-bold mb-4">
    Recent Leave Requests
  </h2>

  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-3 text-left">
            Employee
          </th>

          <th className="p-3 text-left">
            Leave Type
          </th>

          <th className="p-3 text-left">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {recentLeaves.map((leave) => (
          <tr
            key={leave._id}
            className="border-b"
          >
            <td className="p-3">
              {leave.employeeId?.firstName}{" "}
              {leave.employeeId?.lastName}
            </td>

            <td className="p-3">
              {leave.leaveTypeId?.name}
            </td>

            <td className="p-3">
              {leave.status}
            </td>
          </tr>
        ))}

        {recentLeaves.length === 0 && (
          <tr>
            <td
              colSpan="3"
              className="p-4 text-center"
            >
              No Leave Requests
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </DashboardLayout>
  );
};

export default Dashboard;
