import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'
import path from 'path';
const addLeave = async (req, res) =>{
     try{
        const {userId, leaveType , startDate, endDate, reason} = req.body;
        const employee = await Employee.findOne({userId});
        console.log("Leave")
        const newLeave = new Leave({
           employeeId: employee._id, leaveType , startDate, endDate, reason

        })
        await newLeave.save();
        return res.status(201).json({ success : true, message : "Leave Added Successfully" });
    } catch(error){
        console.log(error.message)
        return res.status(500).json({message: "Error Occured", error: error.message})
    }
}

const getLeaves  = async (req, res) =>{
    try{
        const {id,role} = req.params;
        let leaves 
        if (role === "admin"){
            leaves = await Leave.find({employeeId: id})
        }else{
            const employee = await Employee.findOne({userId: id});
            leaves = await Leave.find({employeeId: employee._id});
        }
        return res.status(200).json({success: true, leaves});
    } catch(error){
        console.log(error.message)
        return res.status(500).json({message: "Error Occured", error: error.message})
    }
}

const getLeave  = async (req, res) =>{
    try{
        const leaves = await Leave.find().populate({
            path: 'employeeId',
            populate: [
                { 
                    path : "department",
                    select: 'dep_name'
                },
                {
                    path : "userId",
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({success: true, leaves});
    } catch(error){
        console.log(error.message)
        return res.status(500).json({message: "Error Occured", error: error.message})
    }
}

 const getLeaveDetail = async (req, res) =>{
    try{
        const {id} = req.params;
        const leave = await Leave.findById({_id:id}).populate({
            path: 'employeeId',
            populate: [
                { 
                    path : "department",
                    select: 'dep_name'
                },
                {
                    path : "userId",
                    select: 'name profileImage'
                }
            ]
        })
        return res.status(200).json({success: true, leave});
    } catch(error){
        console.log(error.message)
        return res.status(500).json({message: "Error Occured", error: error.message})
    }
 }

 const updateLeave = async (req, res) =>{
    try{
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status});
        if(!leave){
            return res.status(404).json({ success: false, message: "Leave not found" });
        }
        return res.status(200).json({success: true, leave});
    } catch(error){
        console.log(error.message)
        return res.status(500).json({message: "Error Occured", error: error.message})
    }
 }
export { addLeave , getLeaves, getLeave, getLeaveDetail, updateLeave};