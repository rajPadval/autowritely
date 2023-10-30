import { NextResponse } from "next/server";
import User from "@/DB/models/User";
import bcrypt from "bcrypt";
import { db } from "@/DB/connectDb";
db();

export const POST = async (request, params) => {
  const { name, email, password } = await request.json();

  try {
    let user;
    user = await User.findOne({ email });
    if (user)
      return NextResponse.json({
        success: false,
        message: "Please login with your credentials",
      });
    const securePassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: securePassword });
    await user.save();
    return NextResponse.json({ success: true, message: "User created" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
