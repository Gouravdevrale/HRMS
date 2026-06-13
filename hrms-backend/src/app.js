import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import designationRoutes from "./routes/designation.routes.js";
import locationRoutes from "./routes/location.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-app.vercel.app",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/employees", employeeRoutes);

app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use(errorMiddleware);
export default app;
