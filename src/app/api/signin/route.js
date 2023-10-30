import { NextResponse } from "next/server";
import User from "@/DB/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/DB/connectDb";
db();

export const POST = async (request, params) => {
  const { email, password } = await request.json();
  try {
    let user;

    user = await User.findOne({ email });

    if (!user)
      return NextResponse.json({
        success: false,
        message: "Please Signup!",
      });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return NextResponse.json({
        success: false,
        message: "Password is incorrect",
      });

    // create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    const response = NextResponse.json({
      success: true,
      message: "Sucessfully logged in ",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    console.log(response);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
