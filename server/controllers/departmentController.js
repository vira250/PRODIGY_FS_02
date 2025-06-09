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

const getDepartment = async (req, res) =>{
    try{
      const {id} = req.params;
      const department = await Department.findById({_id: id});
      return res.status(200).json({success: true, department});
    } catch (error) {
      return res.status(500).json({ success: false, error: "Failed to edit department" });
    }
}

const updateDepartment = async (req, res) =>{
  try{
    const {id} = req.params;
    const {dep_name, description} = req.body;
    const updateDep = await Department.findByIdAndUpdate({_id: id}, {
      dep_name,
      description,
    })
    
    return res.status(200).json({success: true, updateDep});
  } catch (error) {
      return res.status(500).json({ success: false, error: "Failed to edit department" });
    }
}

const deleteDepartment = async (req, res) =>{
    try{
    const {id} = req.params;
    const deletedep = await Department.findByIdAndDelete({_id: id})
    
    return res.status(200).json({success: true, deletedep});
  } catch (error) {
      return res.status(500).json({ success: false, error: "Failed to delete department" });
    }
}



export { addDepartment , getDepartments, getDepartment, updateDepartment, deleteDepartment};