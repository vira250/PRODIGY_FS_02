import Department from '../models/Department.js';

const getDepartments = async (req, res) =>{
  try {
    console.log("Fetching departments..."); // 👈 add this line
    // const departments = await Department.find();
    let departments;
try {
  departments = await Department.find();
} catch (err) {
  console.log("Error in Department.find():", err);
  return res.status(500).json({ success: false, error: "Failed to query departments" });
}
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error("Fetch error:", error); // 👈 this should log any issue
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

const addDepartment = async (req, res) =>{
    try{
        const {dep_name, description} = req.body;
        const newDep = await Department.create({
            dep_name,
            description
        });

        await newDep.save();
        res.status(201).json({success: true, department: newDep, message: 'Department created successfully'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error : " add department failed" });
        
    }
}

export { addDepartment , getDepartments};