import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,     
    });

    const savedEmployee = await newEmployee.save();

    return res.status(201).json({ success: true, alert: "Employee created successfully" });

  } catch (error) {
    console.error("Error in addEmployee:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error"
    });
  }
};

const getEmployees = async (req, res) =>{
    try{
          const employees = await Employee.find().populate("userId", {password: 0}).populate("department")
          return res.status(200).json({success: true, employees});
        } catch (error) {
          return res.status(500).json({ success: false, error: "Failed to get Employees" });
        }
}

const getEmployee = async (req, res) =>{
  const {id} = req.params;
    try{
          const employee = await Employee.findById(id).populate("userId", {password: 0}).populate("department")
          return res.status(200).json({success: true, employee});
        } catch (error) {
          console.log(error)
          return res.status(500).json({ success: false, error: "Failed to get Employees" });
        }
}

const updateEmployee = async (req, res) =>{
  const {id} = req.params;
  console.log(id)
      try{
             const {
                name,
                maritalStatus,
                designation,
                salary,
                department,
              } = req.body;

              const employee = await Employee.findById({_id:id})
              if(!employee){
                return res.status(404).json({success: false, error: "Employee not found" });
              }

               const user = await User.findById({_id:employee.userId})
               if(!user){
                return res.status(404).json({success: false, error: "User not found"})
               }
               const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
               const updateEmployee = await Employee.findByIdAndUpdate({_id:id}, {maritalStatus, designation, salary, department})
               if(!updateUser || !updateEmployee){
                return res.status(404).json({success: false, error: "Failed to update employe"})
               }
               return res.status(200).json({success: true, message: "Employee updated successfully"})
          }catch (error) {
              return res.status(500).json({ success: false, error: "Failed to get Employees" });
          }
}

const fetchEmployeesByDepId = async (req, res) =>{
  const {id} = req.params;
    try{
          const employees = await Employee.find({department:id})
          return res.status(200).json({success: true, employees});
        } catch (error) {
          console.log(error)
          return res.status(500).json({ success: false, error: "Failed to get EmployeesbyDepId" });
        }

}

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee , fetchEmployeesByDepId, };;