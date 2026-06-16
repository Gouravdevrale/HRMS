import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  //employeeId, punchIn, punchOut, workingHours
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const getAttendance = async () => {
    try {
      const { data } = await api.get("/attendance/today");
// console.log(data.attendance);
      setAttendance(data.attendance || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load attendance");
    }
  };

  // Fetch employees for dropdown
  const loadEmployees = async () => {
    try {
      const { data } = await api.get("/employees");
      // console.log(data);

      setEmployees(data.employees || []);
    } catch (error) {
      console.log(error);
    }
  };

  // punch in/out handler
  const punchIn = async () => {
    if (!employeeId) {
      return toast.error("Select Employee First");
    }
    try {
      await api.post("/attendance/punch-in", {
        employeeId,
      });

      toast.success("Punch In Success");

      getAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  //puvch out handler
  const punchOut = async () => {
    try {
      await api.post("/attendance/punch-out", {
        employeeId,
      });

      toast.success("Punch Out Success");

      getAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAttendance();
    loadEmployees();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold">Attendance</h1>
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold mb-4">Attendance Actions</h2>
            {/* <p>Total Employees: {employees.length}</p> */}
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="border p-2 rounded-lg flex-1"
              >
                <option value="">Select Employee</option>

                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>

              <button
                onClick={punchIn}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Punch In
              </button>

              <button
                onClick={punchOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Punch Out
              </button>
            </div>
          </div>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Present Today: {attendance.length}
          </div>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Employee ID</th>

                <th className="p-3 text-left">Employee</th>
                

                <th className="p-3 text-left">Punch In</th>

                <th className="p-3 text-left">Punch Out</th>

                <th className="p-3 text-left">Hours</th>
              </tr>
            </thead>

            <tbody>
              
              {attendance.map((item) => (
                  
                <tr key={item._id} className="border-b">

            <td className="p-3">
  {new Date(item.date).toDateString()}
</td>
                  <td className="p-3">{item.employeeId?.employeeId}</td>

                  <td className="p-3">
                    {item.employeeId?.firstName} {item.employeeId?.lastName}
                  </td>
                  

                  <td className="p-3">
                    {item.punchIn
                      ? new Date(item.punchIn).toLocaleTimeString("en-IN")
                      : "-"}
                  </td>

                  <td className="p-3">
                    {item.punchOut
                      ? new Date(item.punchOut).toLocaleTimeString("en-IN")
                      : "-"}
                  </td>

                  <td className="p-3">{item.workingHours || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4">
          {attendance.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow p-4">
              {/* <th className="p-3 text-left">Date</th> */}
              
              <h3 className="font-bold text-lg">
                {item.employeeId?.firstName} {item.employeeId?.lastName}
              </h3>
               <p >
                <strong>Date:</strong>
  {new Date(item.date).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
  })}
</p>
              <p>
                <strong>ID:</strong> {item.employeeId?.employeeId}
              </p>

              <p>
                <strong>Punch In:</strong>{" "}
                {item.punchIn
                  ? new Date(item.punchIn).toLocaleTimeString()
                  : "-"}
              </p>

              <p>
                <strong>Punch Out:</strong>{" "}
                {item.punchOut
                  ? new Date(item.punchOut).toLocaleTimeString()
                  : "-"}
              </p>

              <p>
                <strong>Hours:</strong> {item.workingHours || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
