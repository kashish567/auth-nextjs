import { connect } from "@/database/dbConnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Use the correct import name

connect();
export async function POST(req : NextRequest) {
    try{
        const body = await req.json();
        const {username , email, password} = body
        let user = await User.findOne({email});
        if(user)
            return NextResponse.json({error: "User already exists"}, {status:400})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // Specify the salt rounds

        user = await User.create({
            username,
            email,
            password : hashedPassword,
        })

        return NextResponse.json({message:"registered "}, {status:201})
        }catch(error:any){
        return NextResponse.json({error: error.message }, {status: 500})
    }
}