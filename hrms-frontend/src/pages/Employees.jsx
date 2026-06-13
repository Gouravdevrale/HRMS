import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import api from "../api/axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [departments, setDepartments] = useState([]);

  const [designations, setDesignations] = useState([]);

  const [locations, setLocations] = useState([]);

  const getEmployees = async () => {
    try {
      const { data } = await api.get(`/employees?search=${search}`);

      setEmployees(data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  //delete

  const deleteEmployee = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete Employee?");

      if (!confirmDelete) return;

      await api.delete(`/employees/${id}`);

      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  //fetch
  const loadDropdowns = async () => {
    const dept = await api.get("/departments");

    const des = await api.get("/designations");

    const loc = await api.get("/locations");

    setDepartments(dept.data.departments);

    setDesignations(des.data.designations);

    setLocations(loc.data.locations);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getEmployees();
      loadDropdowns();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg mb-5 w-full md:w-80"
          />

          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Employee ID</th>

              <th className="p-3 text-left">Name</th>

              <th className="p-3 text-left">Email</th>

              <th className="p-3 text-left">Phone</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees?.map((employee) => (
              <tr key={employee._id} className="border-b">
                <td className="p-3">{employee.employeeId}</td>

                <td className="p-3">
                  {employee.firstName} {employee.lastName}
                </td>

                <td className="p-3">{employee.email}</td>

                <td className="p-3">{employee.phone}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      employee.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {employee.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setEditOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <td className="p-3">
                    <Link
                      to={`/employees/${employee._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </Link>
                  </td>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteEmployee(employee._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddEmployeeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        getEmployees={getEmployees}
        departments={departments}
        designations={designations}
        locations={locations}
      />

      <EditEmployeeModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        employee={selectedEmployee}
        getEmployees={getEmployees}
        departments={departments}
        designations={designations}
        locations={locations}
      />
    </DashboardLayout>
  );
};

export default Employees;
