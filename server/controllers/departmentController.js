import Department from '../models/Department.js';
const addDepartment = async (req, res) =>{
    try{
        const {dep_name, description} = req.body;
        const newDep = await Department.create({
            dep_name,
            description
        });

        await newDep.save();
        res.status(201).json({success: true, department: newDep, pamessage: 'Department created successfully'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error : " add department failed" });
        
    }
}

export { addDepartment };