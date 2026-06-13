import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import api from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await api.post(
          "/auth/login",
          formData
        );

   localStorage.setItem(
  "token",
  data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

      dispatch(
        loginSuccess({
          token: data.token,
        })
      );

      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          HRMS
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;