import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
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

    const { title, description } = await req.json();

    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateCurrentBlogById = await Blog.findByIdAndUpdate(
      { _id: getCurrentBlogId },
      { title, description },
      { new: true }
    );

    if (updateCurrentBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog is updated successfully",
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
