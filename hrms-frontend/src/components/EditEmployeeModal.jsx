import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EditEmployeeModal = ({
  isOpen,
  onClose,
  employee,
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

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        departmentId: employee.departmentId?._id || "",
        designationId: employee.designationId?._id || "",
        locationId: employee.locationId?._id || "",
        joiningDate: employee.joiningDate
          ? employee.joiningDate.split("T")[0]
          : "",
        employmentType:
          employee.employmentType || "full-time",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/employees/${employee._id}`,
        formData
      );

      toast.success("Employee Updated");

      getEmployees();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Edit Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">
              Select Department
            </option>

            {departments.map((dept) => (
              <option
                key={dept._id}
                value={dept._id}
              >
                {dept.name}
              </option>
            ))}
          </select>

          <select
            name="designationId"
            value={formData.designationId}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">
              Select Designation
            </option>

            {designations.map((des) => (
              <option
                key={des._id}
                value={des._id}
              >
                {des.name}
              </option>
            ))}
          </select>

          <select
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">
              Select Location
            </option>

            {locations.map((loc) => (
              <option
                key={loc._id}
                value={loc._id}
              >
                {loc.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 rounded"
          >
            Update Employee
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;