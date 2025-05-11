import { connectDB } from "@/lib/DBconnect";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try{
        await connectDB()
        const users = await User.find();
        console.log("Users data loding",users)
        return NextResponse.json(
            {message:"User get Successfully.",data:users},
            {status:200}
        )
    }
    catch(error){
        console.error(error)
        return NextResponse.json(
            {message:"Server side erro in Get user Route",error},
            {status:500}
        )
        throw error
    }
}