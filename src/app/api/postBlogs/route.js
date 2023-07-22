import { db } from "@/DB/connectDb";
import BlogPost from "@/DB/models/BlogPost";
import { NextResponse } from "next/server";

db();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { title, desc } = reqBody;

    const blog = await BlogPost.create({
      title,
      desc,
    });

    const saved = await blog.save();

    return NextResponse.json({
      success: true,
      data: saved,
      message: "Post Created",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
