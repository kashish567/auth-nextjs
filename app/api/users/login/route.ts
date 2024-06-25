import bcryptjs from 'bcryptjs';
import { connect } from "@/database/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User doesn't exist" }, { status: 400 });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Password doesn't match" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

        const res = NextResponse.json(
            { message: `Welcome back ${user.username}`, success: true },
            { status: 200 }
        );

        // Set the cookie
        res.cookies.set("token", token, { httpOnly: true });

        return res;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
