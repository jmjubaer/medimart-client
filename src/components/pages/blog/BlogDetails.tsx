"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  Calendar,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog-utils";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("/blogs.json");
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.log("No Blogs found", error);
      }
    };
    fetchBlog();
  });

  const params = useParams();
  const slug = params.slug;

  const blog = blogs.find((b) => b.slug === slug);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sky-600 hover:text-sky-800 mb-8"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-[400px] bg-gray-200">
                <Image
                  src={blog?.coverImage || "/placeholder.svg"}
                  alt="coverImage"
                  fill
                  className="object-cover"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    // Fallback if image fails to load
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.style.display = "none";
                  }}
                />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {blog?.category}
                  </span>
                  {blog?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {blog?.title}
                </h1>

                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 relative w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={blog?.author.avatar || "/placeholder.svg"}
                      alt="author name"
                      fill
                      className="object-cover rounded-full"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        // Fallback if image fails to load
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {blog?.author.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span className="mr-4">{blog?.publishDate}</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{blog?.readTime} min read</span>
                    </div>
                  </div>
                </div>

                {blog ? (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  "loading"
                )}

                {/* <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">Share:</span>
                      <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        <Facebook className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        <Twitter className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        <Linkedin className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="flex items-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Article
                    </button>
                  </div>
                </div> */}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-center mb-4">
                <div className="relative w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src={blog?.author.avatar || "/placeholder.svg"}
                    alt="author"
                    fill
                    className="object-cover rounded-full"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      // Fallback if image fails to load
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{blog?.author.name}</p>
                  <p className="text-sm text-gray-500">{blog?.author.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{blog?.author.bio}</p>
              <Link href='/blog' className="w-full inline-block text-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                View All Articles
              </Link>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
