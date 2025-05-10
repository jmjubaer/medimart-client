import fs from "fs"
import path from "path"

export interface Author {
  name: string
  role: string
  avatar: string
  bio: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  publishDate: string
  readTime: number
  author: Author
}

export interface BlogData {
  blogs: BlogPost[]
}

// export async function getAllBlogs(): Promise<BlogPost[]> {
//   // In a real app, this would fetch from a database or API
//   // For this example, we'll read from the JSON file
//   const filePath = path.join(process.cwd(), "data/blogs.json")
//   const fileContents = fs.readFileSync(filePath, "utf8")
//   const data: BlogData = JSON.parse(fileContents)

//   return data.blogs
// }

// export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
//   const blogs = await getAllBlogs()
//   return blogs.find((blog) => blog.slug === slug) || null
// }

// export async function getRelatedBlogs(category: string, currentSlug: string): Promise<BlogPost[]> {
//   const blogs = await getAllBlogs()
//   return blogs.filter((blog) => blog.category === category && blog.slug !== currentSlug).slice(0, 3)
// }
