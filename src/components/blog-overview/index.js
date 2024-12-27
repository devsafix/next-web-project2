"use client";

import { useToast } from "@/hooks/use-toast";
import AddNewBlog from "../add-new-blog";
import { useState } from "react";

const initialBlogFormData = {
  title: "",
  description: "",
};
export default function BlogOverview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const { toast } = useToast();

  console.log(blogFormData);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      // Handle success
      if (result.success) {
        toast({
          description: "Blog Added Successfully",
        });
        setBlogFormData(initialBlogFormData);
        setOpenDialog(false);
        setLoading(false);
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
      />
      <div></div>
    </div>
  );
}
