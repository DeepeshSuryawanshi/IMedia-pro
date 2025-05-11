import mongoose, { model, Model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
// user interface
export interface IUser {
    _id?:mongoose.Types.ObjectId
    username:String,
    firstname:String,
    lastname:String,
    email:String,
    mobileNo:Number,
    password:String,
    createdAt?:Date,
    updatedAt?:Date
}
// user Schema 
const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        unique:true
    },
    password:{
        type:String
    } 
 },
 {timestamps:true}
)
// setting password hash to password 
userSchema.pre("save",async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password as string, 10)
    }
    next()
})
// creating modle if not exist if exist retrun User schema
const User = models?.User || model<IUser>('User',userSchema)

export default User;