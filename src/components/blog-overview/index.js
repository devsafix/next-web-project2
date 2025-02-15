"use client";

import { useToast } from "@/hooks/use-toast";
import AddNewBlog from "../add-new-blog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialBlogFormData = {
  title: "",
  description: "",
};
export default function BlogOverview({ blogList }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);
  const { toast } = useToast();
  const router = useRouter();

  console.log(blogFormData);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogId !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(blogFormData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(blogFormData),
            });
      const result = await apiResponse.json();
      // Handle success
      if (result.success) {
        if (result.message === "Blog is updated successfully") {
          toast({
            description: "Blog Updated Successfully",
          });
        } else {
          toast({
            description: "Blog Added Successfully",
          });
        }

        setBlogFormData(initialBlogFormData);
        setOpenDialog(false);
        setLoading(false);
        router.refresh();
        setCurrentEditedBlogId(null);
      } else {
        toast({
          title: "Failed to add blog",
        });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  async function handleDeleteBlogById(getCurrentBlogId) {
    try {
      const apiResponse = await fetch(
        `/api/delete-blog?id=${getCurrentBlogId}`,
        {
          method: "DELETE",
        }
      );
      const result = await apiResponse.json();

      if (result.success) {
        toast({
          description: "Blog is deleted successfully",
        });
        router.refresh();
      } else {
        toast({
          title: "Failed to delete blog",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditBlogById(blog) {
    try {
      setCurrentEditedBlogId(blog._id);
      setBlogFormData({
        title: blog?.title,
        description: blog?.description,
      });
      setOpenDialog(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AddNewBlog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogId={currentEditedBlogId}
        setCurrentEditedBlogId={setCurrentEditedBlogId}
      />
      <div className="mt-10">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <ul>
          {blogList &&
            blogList.map((blog, idx) => (
              <div key={blog._id} className="flex items-center gap-3 space-y-2">
                <li>
                  Blog Title-{idx}: {blog.title}
                </li>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditBlogById(blog)}
                    className="p-1 bg-blue-500 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlogById(blog._id)}
                    className="p-1 bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
