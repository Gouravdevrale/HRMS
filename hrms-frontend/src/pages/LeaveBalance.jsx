import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const LeaveBalance = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [balances, setBalances] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    leaveTypeId: "",
    balance: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loadData = async () => {
    try {
      const emp = await api.get("/employees");
      const types = await api.get("/leaves/types");

      setEmployees(emp.data.employees || []);
      setLeaveTypes(types.data.leaveTypes || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getBalances = async () => {
    try {
      const { data } = await api.get("/leaves/balances");

      setBalances(data.balances || []);
    } catch (error) {
      console.log(error);
    }
  };

  const assignBalance = async () => {
    try {
      await api.post("/leaves/balance", formData);

      toast.success("Leave Balance Assigned");

      setFormData({
        employeeId: "",
        leaveTypeId: "",
        balance: "",
      });

      getBalances();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadData();
    getBalances();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Leave Balance</h1>

        {/* Form */}

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Assign Leave Balance</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>

            <select
              name="leaveTypeId"
              value={formData.leaveTypeId}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            >
              <option value="">Select Leave Type</option>

              {leaveTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="balance"
              placeholder="Balance"
              value={formData.balance}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>

          <button
            onClick={assignBalance}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Assign Balance
          </button>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Leave Type</th>
                <th className="p-3 text-left">Balance</th>
              </tr>
            </thead>

            <tbody>
              {balances.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-3">
                    {item.employeeId?.firstName} {item.employeeId?.lastName}
                  </td>

                  <td className="p-3">{item.leaveTypeId?.name}</td>

                  <td className="p-3">{item.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4">
          {balances.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold">
                {item.employeeId?.firstName} {item.employeeId?.lastName}
              </h3>

              <p>
                <strong>Leave:</strong> {item.leaveTypeId?.name}
              </p>

              <p>
                <strong>Balance:</strong> {item.balance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaveBalance;
