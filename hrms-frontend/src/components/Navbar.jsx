const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
