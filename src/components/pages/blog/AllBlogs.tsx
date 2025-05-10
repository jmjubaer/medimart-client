"use client"

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { BlogPost } from "@/lib/blog-utils";
import { useEffect, useState } from "react";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/blogs.json");
        const data = await response.json();

        setBlogs(data.blogs);
      } catch (error) {
        console.log("cant found blog", error);
      }
    };

    fetchBlogs();
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0 bg-gray-800">
          <Image
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1920&auto=format&fit=crop"
            alt="Health blog background"
            fill
            className="object-cover brightness-50"
            priority
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              // Fallback if image fails to load
              const target = e.currentTarget;
              target.onerror = null;
              target.style.display = "none";
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Health & Wellness Blog
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stay informed with the latest health tips, medication guides, and
            wellness advice
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      {/* <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="py-2 px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              All Articles
            </button>
            <button className="py-2 px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Medications
            </button>
            <button className="py-2 px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Health Tips
            </button>
            <button className="py-2 px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Nutrition
            </button>
            <button className="py-2 px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Mental Health
            </button>
            <button className="py-2 px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              First Aid
            </button>
          </div>
        </div>
      </section> */}

      {/* Blog Listing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.slug}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={blog.coverImage || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-sky-600 text-sm font-medium">
                    {blog.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      <Image
                        src={blog.author.avatar || "/placeholder.svg"}
                        alt={blog.author.name}
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
                        {blog.author.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {blog.publishDate}
                      </p>
                    </div>
                  </div>
                  <Link href={`/blog/${blog.slug}`}>
                    <button className="w-full py-2 px-4 border border-gray-300 cursor-pointer rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                      Read Article
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;
