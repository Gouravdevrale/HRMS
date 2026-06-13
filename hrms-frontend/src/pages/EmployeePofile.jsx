import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployeeProfile = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  const loadData = async () => {
    try {
      const employeeRes = await api.get(`/employees/${id}`);

      const attendanceRes = await api.get(`/attendance/summary/${id}`);

      const leaveRes = await api.get(`/leaves/history/${id}`);

      const payrollRes = await api.get(`/payroll/history/${id}`);

      setEmployee(employeeRes.data.employee);
      setAttendance(attendanceRes.data);
      setLeaves(leaveRes.data.leaves || []);
      setPayrolls(payrollRes.data.payrolls || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!employee) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Employee Profile</h1>

        {/* Employee Details */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Employee Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> {employee.firstName} {employee.lastName}
            </p>

            <p>
              <strong>Employee ID:</strong> {employee.employeeId}
            </p>

            <p>
              <strong>Email:</strong> {employee.email}
            </p>

            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>

            <p>
              <strong>Department:</strong> {employee.departmentId?.name}
            </p>

            <p>
              <strong>Designation:</strong> {employee.designationId?.name}
            </p>

            <p>
              <strong>Location:</strong> {employee.locationId?.name}
            </p>

            <p>
              <strong>Joining Date:</strong>{" "}
              {new Date(employee.joiningDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Attendance Summary */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-gray-600">Total Days</p>

              <h3 className="text-2xl font-bold">
                {attendance?.totalDays || 0}
              </h3>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-gray-600">Total Hours</p>

              <h3 className="text-2xl font-bold">
                {attendance?.totalHours || 0}
              </h3>
            </div>
          </div>
        </div>

        {/* Leave History */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Leave History</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left">Leave Type</th>

                  <th className="p-3 text-left">Start Date</th>

                  <th className="p-3 text-left">End Date</th>

                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id} className="border-b">
                    <td className="p-3">{leave.leaveTypeId?.name}</td>

                    <td className="p-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">{leave.status}</td>
                  </tr>
                ))}
                {leaves.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No Leave Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payroll History */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Payroll History</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left">Month</th>

                  <th className="p-3 text-left">Year</th>

                  <th className="p-3 text-left">Net Salary</th>

                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {payrolls.map((payroll) => (
                  <tr key={payroll._id} className="border-b">
                    <td className="p-3">{payroll.month}</td>

                    <td className="p-3">{payroll.year}</td>

                    <td className="p-3">₹{payroll.netSalary}</td>

                    <td className="p-3">{payroll.status}</td>
                  </tr>
                ))}

                <tbody>
  {payrolls.map((payroll) => (
    <tr
      key={payroll._id}
      className="border-b"
    >
      <td className="p-3">
        {payroll.month}
      </td>

      <td className="p-3">
        {payroll.year}
      </td>

      <td className="p-3">
        ₹{payroll.netSalary}
      </td>

      <td className="p-3">
        {payroll.status}
      </td>
    </tr>
  ))}

  {payrolls.length === 0 && (
    <tr>
      <td
        colSpan="4"
        className="p-4 text-center text-gray-500"
      >
        No Payroll Records Found
      </td>
    </tr>
  )}
</tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
