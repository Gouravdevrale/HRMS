import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const Payroll = () => {
  
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    year: "",
  });

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

  const getPayrolls = async () => {
    try {
      const { data } = await api.get("/payroll");

      setPayrolls(data.payrolls || []);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePayroll = async () => {
    const month = Number(formData.month);
    const year = Number(formData.year);

    if (month < 1 || month > 12) {
      toast.error("Month must be between 1 and 12");
      return;
    }

    if (year < 2025 || year > 2100) {
      toast.error("Enter valid year");
      return;
    }
    try {
      await api.post("/payroll/generate", formData);

      toast.success("Payroll Generated");

      getPayrolls();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const markPaid = async (id) => {
    try {
      await api.put(`/payroll/pay/${id}`);

      toast.success("Payroll Paid");

      getPayrolls();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  //pdf generation can be added later as enhancement
  const downloadPayslip = (payroll) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Payslip", 20, 20);

    doc.setFontSize(12);

    doc.text(`Employee ID: ${payroll.employeeId?.employeeId || "-"}`, 20, 40);

    doc.text(
      `Employee Name: ${payroll.employeeId?.firstName || ""} ${
        payroll.employeeId?.lastName || ""
      }`,
      20,
      50,
    );

    doc.text(`Month: ${payroll.month}`, 20, 65);

    doc.text(`Year: ${payroll.year}`, 20, 75);

    doc.text(`Gross Salary: Rs. ${payroll.grossSalary}`, 20, 100);

    doc.text(`Deductions: Rs. ${payroll.deductions}`, 20, 110);

    doc.text(`Net Salary: Rs. ${payroll.netSalary}`, 20, 120);
    doc.line(20, 130, 180, 130);

    doc.text(`Status: ${payroll.status}`, 20, 145);

    doc.save(`Payslip_${payroll.month}_${payroll.year}.pdf`);
  };

  // Function to export payrolls to Excel
  const exportPayrollExcel = () => {
    const data = payrolls.map((payroll) => ({
      Employee: `${payroll.employeeId?.firstName || ""} ${
        payroll.employeeId?.lastName || ""
      }`,
      Month: payroll.month,
      Year: payroll.year,
      GrossSalary: payroll.grossSalary,
      Deductions: payroll.deductions,
      NetSalary: payroll.netSalary,
      Status: payroll.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll");

    XLSX.writeFile(workbook, "Payroll_Report.xlsx");
  };

  useEffect(() => {
    loadEmployees();
    getPayrolls();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Payroll</h1>

          <button
            onClick={exportPayrollExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Export Excel
          </button>
        </div>

        {/* Form */}

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Generate Payroll</h2>

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

            <input
              type="number"
              name="month"
              min="1"
              max="12"
              placeholder="Month"
              value={formData.month}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              type="number"
              name="year"
              min="2025"
              max="2100"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>

          <button
            onClick={generatePayroll}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Generate Payroll
          </button>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Employee</th>

                <th className="p-3 text-left">Month</th>

                <th className="p-3 text-left">Year</th>

                <th className="p-3 text-left">Gross</th>

                <th className="p-3 text-left">Net</th>

                <th className="p-3 text-left">Status</th>

                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {payrolls.map((payroll) => (
                <tr key={payroll._id} className="border-b">
                  <td className="p-3">
                    {payroll.employeeId?.firstName}{" "}
                    {payroll.employeeId?.lastName}
                  </td>

                  <td className="p-3">{payroll.month}</td>

                  <td className="p-3">{payroll.year}</td>

                  <td className="p-3">₹{payroll.grossSalary}</td>

                  <td className="p-3">₹{payroll.netSalary}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        payroll.status === "paid"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {payroll.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => downloadPayslip(payroll)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      PDF
                    </button>

                    {payroll.status !== "paid" && (
                      <button
                        onClick={() => {
                          const ok = window.confirm(
                            "Mark this payroll as paid?",
                          );

                          if (ok) {
                            markPaid(payroll._id);
                          }
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4">
          {payrolls.map((payroll) => (
            <div key={payroll._id} className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold">
                {payroll.employeeId?.firstName} {payroll.employeeId?.lastName}
              </h3>

              <p>
                <strong>Month:</strong> {payroll.month}
              </p>

              <p>
                <strong>Year:</strong> {payroll.year}
              </p>

              <p>
                <strong>Gross:</strong> ₹{payroll.grossSalary}
              </p>

              <p>
                <strong>Net:</strong> ₹{payroll.netSalary}
              </p>

              <p>
                <strong>Status:</strong> {payroll.status}
              </p>

              <button
                onClick={() => downloadPayslip(payroll)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Download PDF
              </button>

              {payroll.status !== "paid" && (
                <button
                  onClick={() => markPaid(payroll._id)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Mark Paid
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
