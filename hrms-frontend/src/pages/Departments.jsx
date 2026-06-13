import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  const getDepartments = async () => {
    try {
      const { data } = await api.get("/departments");

      setDepartments(data.departments);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load departments");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveDepartment = async () => {
    try {
      if (editId) {
        await api.put(`/departments/${editId}`, formData);

        toast.success("Department Updated");
      } else {
        await api.post("/departments", formData);

        toast.success("Department Added");
      }

      setFormData({
        name: "",
        code: "",
        description: "",
      });

      setEditId(null);

      getDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete Department?");

      if (!confirmDelete) return;

      await api.delete(`/departments/${id}`);

      toast.success("Department Deleted");

      getDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Departments</h1>

        {/* Add Department Form */}

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Add Department</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Department Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />

            <input
              type="text"
              name="code"
              placeholder="Department Code"
              value={formData.code}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />
          </div>

          <button
            onClick={saveDepartment}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {editId ? "Update Department" : "Add Department"}
          </button>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">Code</th>

                <th className="p-3 text-left">Description</th>

                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((dept) => (
                <tr key={dept._id} className="border-b">
                  <td className="p-3">{dept.name}</td>

                  <td className="p-3">{dept.code}</td>

                  <td className="p-3">{dept.description}</td>

                  <td className="p-3">
                    <button
                      onClick={() => {
                        setEditId(dept._id);

                        setFormData({
                          name: dept.name,
                          code: dept.code,
                          description: dept.description || "",
                        });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteDepartment(dept._id)}
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

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4">
          {departments.map((dept) => (
            <div key={dept._id} className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-lg">{dept.name}</h3>

              <p className="mt-1">
                <strong>Code:</strong> {dept.code}
              </p>

              <p className="mt-1">
                <strong>Description:</strong> {dept.description}
              </p>

              <button
                onClick={() => {
                  setEditId(dept._id);

                  setFormData({
                    name: dept.name,
                    code: dept.code,
                    description: dept.description || "",
                  });
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full mb-2"
              >
                Edit
              </button>

              <button
                onClick={() => deleteDepartment(dept._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
