import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  const getAttendance = async () => {
    try {
      const { data } = await api.get("/attendance/today");

      setAttendance(data.attendance || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load attendance");
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold">Attendance</h1>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Present Today: {attendance.length}
          </div>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
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
                  <td className="p-3">{item.employeeId?.employeeId}</td>

                  <td className="p-3">
                    {item.employeeId?.firstName} {item.employeeId?.lastName}
                  </td>

                  <td className="p-3">
                    {item.punchIn
                      ? new Date(item.punchIn).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    {item.punchOut
                      ? new Date(item.punchOut).toLocaleTimeString()
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
              <h3 className="font-bold text-lg">
                {item.employeeId?.firstName} {item.employeeId?.lastName}
              </h3>

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
