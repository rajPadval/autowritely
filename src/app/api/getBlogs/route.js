import { NextResponse } from "next/server";
import { db } from "@/DB/connectDb";
import BlogPost from "@/DB/models/BlogPost";

db();

export async function GET() {

  try {
    const blogs = await BlogPost.find();

    if (blogs) {
      return NextResponse.json({
        success: true,
        data: blogs,
        message: "Success getting blogs",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed fetching blogs",
      });
    }
    
  } catch (error) {
    return NextResponse.json({ error : "Internal server error"});
  }

}
