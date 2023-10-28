import { NextRequest, NextResponse } from "next/server";
import { db } from "@/DB/connectDb";
import BlogPost from "@/DB/models/BlogPost";

db();

export const DELETE = async (request, params) => {
  const id = params.params.id;
  try {
    const deletedBlog = await BlogPost.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({
        success: false,
        message: "No blog found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
