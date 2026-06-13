import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const getLocations = async () => {
    try {
      const { data } = await api.get("/locations");

      setLocations(data.locations);
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

  const saveLocation = async () => {
    try {
      if (editId) {
        await api.put(`/locations/${editId}`, formData);

        toast.success("Location Updated");
      } else {
        await api.post("/locations", formData);

        toast.success("Location Added");
      }

      setFormData({
        name: "",
        code: "",
        address: "",
        city: "",
        state: "",
        country: "",
      });

      setEditId(null);

      getLocations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const deleteLocation = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete Location?");

      if (!confirmDelete) return;

      await api.delete(`/locations/${id}`);

      toast.success("Location Deleted");

      getLocations();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Locations</h1>

        {/* Form */}

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add Location</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Location Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="code"
              placeholder="Code"
              value={formData.code}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <button
            onClick={saveLocation}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {editId ? "Update Location" : "Add Location"}
          </button>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">City</th>

                <th className="p-3 text-left">State</th>

                <th className="p-3 text-left">Country</th>

                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {locations.map((loc) => (
                <tr key={loc._id} className="border-b">
                  <td className="p-3">{loc.name}</td>

                  <td className="p-3">{loc.city}</td>

                  <td className="p-3">{loc.state}</td>

                  <td className="p-3">{loc.country}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setEditId(loc._id);

                        setFormData({
                          name: loc.name,
                          code: loc.code,
                          address: loc.address || "",
                          city: loc.city || "",
                          state: loc.state || "",
                          country: loc.country || "",
                        });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteLocation(loc._id)}
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
          {locations.map((loc) => (
            <div key={loc._id} className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold">{loc.name}</h3>

              <p>
                <strong>City:</strong> {loc.city}
              </p>

              <p>
                <strong>State:</strong> {loc.state}
              </p>

              <p>
                <strong>Country:</strong> {loc.country}
              </p>
              <button
                onClick={() => {
                  setEditId(loc._id);

                  setFormData({
                    name: loc.name,
                    code: loc.code,
                    address: loc.address || "",
                    city: loc.city || "",
                    state: loc.state || "",
                    country: loc.country || "",
                  });
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full mb-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLocation(loc._id)}
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

export default Locations;
