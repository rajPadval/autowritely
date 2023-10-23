import { NextResponse } from "next/server";
import { db } from "@/DB/connectDb";
import BlogPost from "@/DB/models/BlogPost";

db();

export const DELETE = async (request) => {
  const id = request.url.split("deleteBlog/")[1];
  console.log(id);
};
