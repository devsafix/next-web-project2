import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    if (!getCurrentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog id is required",
      });
    }

    const deleteCurrentBlogById = await Blog.findByIdAndDelete(
      getCurrentBlogId
    );

    if (deleteCurrentBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog is deleted successfully",
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
