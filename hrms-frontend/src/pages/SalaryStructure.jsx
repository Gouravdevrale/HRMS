import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const SalaryStructure = () => {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    basicSalary: "",
    hra: "",
    bonus: "",
    deductions: "",
  });

  const [structures, setStructures] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loadEmployees = async () => {
    try {
      const { data } = await api.get("/employees");
      setEmployees(data.employees || []);
    } catch (error) {
      console.log(error);
    }
  };

  const createStructure = async () => {
    try {
      await api.post("/payroll/salary-structure", formData);

      toast.success("Salary Structure Created");

      setFormData({
        employeeId: "",
        basicSalary: "",
        hra: "",
        bonus: "",
        deductions: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Salary Structure</h1>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">
            Create Salary Structure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <input
              type="number"
              name="basicSalary"
              placeholder="Basic Salary"
              value={formData.basicSalary}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              type="number"
              name="hra"
              placeholder="HRA"
              value={formData.hra}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              type="number"
              name="bonus"
              placeholder="Bonus"
              value={formData.bonus}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              type="number"
              name="deductions"
              placeholder="Deductions"
              value={formData.deductions}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>

          <button
            onClick={createStructure}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Create Structure
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalaryStructure;
