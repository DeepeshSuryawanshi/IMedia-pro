import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User";
import { connectDB } from "./DBconnect";
import bcrypt from "bcryptjs";

export const authOptions:NextAuthOptions = {
    providers:[
       CredentialsProvider({    
    name: 'Credentials',
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        if(!credentials?.username || !credentials?.password) throw new Error("Username or password is missiong..?")
        // get user from db
        try {
            // connect to DB
            await connectDB()
            // find user in DB
            const UserDate = await User.findOne({
                '$or':[
                    {email:credentials.username},
                    {username:credentials.username},
                    {mobileNo:credentials.username},
                ]
            })
            if(!UserDate) throw new Error("User not found with given details.")
            const isValid = await bcrypt.compare(credentials?.password,UserDate?.password)

            if(isValid) throw new Error("Invalid Password");
            return {id:UserDate?._id,username:UserDate?.username,email:UserDate.email,mobileNo:UserDate?.mobileNo,firstname:UserDate.firstname,lastname:UserDate?.lastname}

        } catch (error) {
            console.error("server side error",error)
            throw new Error("User Not fount or Server error.!");
        }
    }
    }),
    
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:'jwt',
        maxAge:30 * 24 * 60* 60 
    },
    secret:process.env.NEXTAUTH_SECRET
}