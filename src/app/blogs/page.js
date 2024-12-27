import BlogOverview from "@/components/blog-overview";

async function fetchAllBlogs() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    });

    const result = await apiResponse.json();
    return result?.data;
  } catch (error) {
    console.log(error);
    throw new Error(error); 
  }
}

export default async function Blogs() {
  const blogList = await fetchAllBlogs();
  console.log(blogList);

  return (
    <div className="container mx-auto p-10">
      <BlogOverview blogList={blogList} />
    </div>
  );
}
