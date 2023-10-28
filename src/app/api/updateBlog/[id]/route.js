import { NextResponse } from "next/server";
import BlogPost from "@/DB/models/BlogPost";
import { db } from "@/DB/connectDb";

db();

export const PUT = async (request, params) => {
  const { id } = params.params;
  const { title, description } = await request.json();
  try {
    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return NextResponse.json({
        success: false,
        message: "Blog post not found",
      });
    }

    blogPost.title = !title ? blogPost.title : title;
    blogPost.desc = !description ? blogPost.desc : description;

    await blogPost.save();

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      data: blogPost,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
