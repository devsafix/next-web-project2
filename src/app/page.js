import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center pt-10">
      <Link
        href={"/blogs"}
        className="p-2 bg-blue-600 text-white rounded text-sm"
      >
        explore Blogs
      </Link>
    </div>
  );
}
