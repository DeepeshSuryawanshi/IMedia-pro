import { connectDB } from "@/lib/DBconnect";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        // extracting data from request
        const {username,firstname,lastname,email,PhoneNo,password} = await request.json()
        // checking the data of user
        if(!username || !firstname || !lastname ){
            return NextResponse.json(
                {message:"Username or name is Not given."},
                {status:400}
            )
        }
        // email or phone number
        if(!email || !PhoneNo){
            return NextResponse.json(
                {message:"Email or phone no is mot given"},
                {status:400}
            )
        }
        // password check
        if(!password) return NextResponse.json(
            {message:"password is empty, please check"},
            {status:400}
        )
        await connectDB();
        const existingUser = await User.findOne({'$or':[
            {username:username},
            {Email:email},
            {PhoneNo:PhoneNo}
        ]})
        // existing user check
        if(existingUser?.username === username){
            return NextResponse.json(
                {message:"User Already Exist with this Username"},
                {status:400}
            )
        }
        if(existingUser?.email === email){
            return NextResponse.json(
                {message:"User Already Exist with this Email"},
                {status:400}
            )
        }
        if(existingUser?.PhoneNo === PhoneNo){
            return NextResponse.json(
                {message:"User Already Exist with this Phone Number"},
                {status:400}
            )
        }
        // creating User 
        await User.create({
            username,firstname,lastname,email,mobileNo:PhoneNo,password
        })

        return NextResponse.json(
            {message:"User register SucessFully"},
            {status:201 }
        )
    } catch (error) {
        console.error("Error in the resiset POST route",error)
        return NextResponse.json(
            {message:"Error in Register user",error},
            {status:500}
        )
        throw error
    }
}