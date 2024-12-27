import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const extractAllBlogFromDatabase = await Blog.find({});
    if (extractAllBlogFromDatabase) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogFromDatabase,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something wrong here! Please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something wrong here! Please try again",
    });
  }
}
