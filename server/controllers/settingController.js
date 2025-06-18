
import User from '../models/User.js'
import bcrypt from 'bcryptjs';
const changePassword = async (req, res) =>{

    try{
        const {userId, oldPassword, newPassword} = req.body;
        const user = await User.findById({_id: userId});

        if(!user){
            return res.status(404).json({success : false, error: "User not found"});
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({success : false, error: "Old password is incorrect"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const newUser = await User.findByIdAndUpdate({_id:userId}, {password: hashedPassword});
        return res.status(200).json({success : true, message: "Password changed successfully"})
    } catch(error){
        return res.status(500).json({success : false, message: error.message});
    }

}

export default changePassword;