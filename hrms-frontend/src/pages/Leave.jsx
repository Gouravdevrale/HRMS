import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const Leave = () => {
  const [employees, setEmployees] =
    useState([]);

  const [leaveTypes, setLeaveTypes] =
    useState([]);

  const [leaves, setLeaves] =
    useState([]);

  const [formData, setFormData] =
    useState({
      employeeId: "",
      leaveTypeId: "",
      startDate: "",
      endDate: "",
      reason: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const loadData = async () => {
    try {

      const emp =
        await api.get(
          "/employees"
        );
     console.log("Employees API:", emp.data);
     console.log(employees);
      const types =
        await api.get(
          "/leaves/types"
        );

      setEmployees(
        emp.data.employees || []
      );

      setLeaveTypes(
        types.data.leaveTypes || []
      );

    } catch (error) {
      console.log(error);
    }
  };

  const getLeaves = async () => {
    try {

      if (
        !formData.employeeId
      )
        return;

      const { data } =
        await api.get(
          `/leaves/history/${formData.employeeId}`
        );

      setLeaves(
        data.leaves || []
      );

    } catch (error) {
      console.log(error);
    }
  };

  const applyLeave =
    async () => {
      try {

        await api.post(
          "/leaves/apply",
          formData
        );

        toast.success(
          "Leave Applied"
        );

        getLeaves();

        setFormData({
          employeeId: "",
          leaveTypeId: "",
          startDate: "",
          endDate: "",
          reason: "",
        });

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );
      }
    };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    getLeaves();
  }, [formData.employeeId]);

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Leave Management
        </h1>

        {/* Form */}

        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="text-xl font-semibold mb-4">
            Apply Leave
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            >
              <option value="">
                Select Employee
              </option>

              {employees.map(
                (emp) => (
                  <option
                    key={emp._id}
                    value={emp._id}
                  >
                    {emp.firstName}{" "}
                    {emp.lastName}
                  </option>
                )
              )}
            </select>

            <select
              name="leaveTypeId"
              value={
                formData.leaveTypeId
              }
              onChange={handleChange}
              className="border p-2 rounded-lg"
            >
              <option value="">
                Select Leave Type
              </option>

              {leaveTypes.map(
                (type) => (
                  <option
                    key={type._id}
                    value={type._id}
                  >
                    {type.name}
                  </option>
                )
              )}
            </select>

            <input
              type="date"
              name="startDate"
              value={
                formData.startDate
              }
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              type="date"
              name="endDate"
              value={
                formData.endDate
              }
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <textarea
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              className="border p-2 rounded-lg md:col-span-2"
            />

          </div>

          <button
            onClick={applyLeave}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Apply Leave
          </button>

        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-3 text-left">
                  Leave Type
                </th>

                <th className="p-3 text-left">
                  Start
                </th>

                <th className="p-3 text-left">
                  End
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Reason
                </th>

              </tr>

            </thead>

            <tbody>

              {leaves.map(
                (leave) => (
                  <tr
                    key={leave._id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        leave
                          .leaveTypeId
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {new Date(
                        leave.startDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(
                        leave.endDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {leave.status}
                    </td>

                    <td className="p-3">
                      {leave.reason}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4">

          {leaves.map(
            (leave) => (
              <div
                key={leave._id}
                className="bg-white rounded-xl shadow p-4"
              >
                <h3 className="font-bold">
                  {
                    leave
                      .leaveTypeId
                      ?.name
                  }
                </h3>

                <p>
                  <strong>
                    Start:
                  </strong>{" "}
                  {new Date(
                    leave.startDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>
                    End:
                  </strong>{" "}
                  {new Date(
                    leave.endDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {leave.status}
                </p>

                <p>
                  <strong>
                    Reason:
                  </strong>{" "}
                  {leave.reason}
                </p>

              </div>
            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Leave;