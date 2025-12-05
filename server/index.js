import express from 'express';
import cors from 'cors'
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import connectToDatabase from './db/db.js';
import salaryRouter from './routes/salary.js';
import settingRouter from './routes/setting.js'
import leaveRouter from './routes/leave.js';
import dashboardRouter from './routes/dashboard.js';
connectToDatabase()

const app = express()

app.use(cors({
  origin: 'https://prodigy-fs-02-jade.vercel.app',
  credentials: true
}));

app.get("/create-admin", async (req, res) => {
  try {
    const exists = await User.findOne({ email: "admin@gmail.com" });
    if (exists) return res.send("Admin already exists");

    const hash = await bcrypt.hash("admin", 10);
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hash,
      role: "admin",
    });

    res.send("Admin created");
  } catch (err) {
    res.send(err.message);
  }
});

app.use(express.json());
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
