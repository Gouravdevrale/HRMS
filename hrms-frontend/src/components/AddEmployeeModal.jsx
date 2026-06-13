import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AddEmployeeModal = ({
  isOpen,
  onClose,
  getEmployees,
  departments,
  designations,
  locations,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    departmentId: "",
    designationId: "",
    locationId: "",
    joiningDate: "",
    employmentType: "full-time",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/employees", formData);

      toast.success("Employee Created");

      getEmployees();

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-5">Add Employee</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="departmentId"
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            name="designationId"
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Designation</option>

            {designations.map((des) => (
              <option key={des._id} value={des._id}>
                {des.name}
              </option>
            ))}
          </select>

          <select
            name="locationId"
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Location</option>

            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="joiningDate"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button type="submit" className="bg-blue-600 text-white py-2 rounded">
            Create Employee
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
