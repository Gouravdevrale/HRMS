import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    departmentId: "",
    name: "",
    code: "",
    description: "",
  });

  const getDesignations = async () => {
    try {
      const { data } = await api.get("/designations");
      setDesignations(data.designations);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load designations");
    }
  };

  const getDepartments = async () => {
    try {
      const { data } = await api.get("/departments");
      setDepartments(data.departments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveDesignation = async () => {
    try {
      if (editId) {
        await api.put(`/designations/${editId}`, formData);

        toast.success("Designation Updated");
      } else {
        await api.post("/designations", formData);

        toast.success("Designation Added");
      }

      setFormData({
        departmentId: "",
        name: "",
        code: "",
        description: "",
      });

      setEditId(null);

      getDesignations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const deleteDesignation = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete Designation?");

      if (!confirmDelete) return;

      await api.delete(`/designations/${id}`);

      toast.success("Designation Deleted");

      getDesignations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  useEffect(() => {
    getDesignations();
    getDepartments();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Designations</h1>

        {/* Form */}

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Add Designation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              placeholder="Designation Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              type="text"
              name="code"
              placeholder="Code"
              value={formData.code}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>

          <button
            onClick={saveDesignation}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {editId ? "Update Designation" : "Add Designation"}
          </button>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">Code</th>

                <th className="p-3 text-left">Description</th>

                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {designations.map((designation) => (
                <tr key={designation._id} className="border-b">
                  <td className="p-3">{designation.name}</td>

                  <td className="p-3">{designation.code}</td>

                  <td className="p-3">{designation.description}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setEditId(designation._id);

                        setFormData({
                          departmentId: designation.departmentId?._id || "",
                          name: designation.name,
                          code: designation.code,
                          description: designation.description || "",
                        });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteDesignation(designation._id)}
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
          {designations.map((designation) => (
            <div
              key={designation._id}
              className="bg-white rounded-xl shadow p-4"
            >
              <h3 className="font-bold text-lg">{designation.name}</h3>

              <p>
                <strong>Code:</strong> {designation.code}
              </p>

              <p>
                <strong>Description:</strong> {designation.description}
              </p>
              <button
                onClick={() => {
                  setEditId(designation._id);

                  setFormData({
                    departmentId: designation.departmentId?._id || "",
                    name: designation.name,
                    code: designation.code,
                    description: designation.description || "",
                  });
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full mb-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteDesignation(designation._id)}
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

export default Designations;
