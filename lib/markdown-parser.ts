import fs from "fs"
import path from "path"
const matter = require('gray-matter');

export interface ParsedContent {
  [key: string]: any
}

export function parseMarkdownContent(content: string): any {
  const parsedContent = matter(content);
  return parsedContent.data;
}

export function readMarkdownFile(filename: string): ParsedContent {
  try {
    
    const filePath = path.join(process.cwd(), "content", filename)
    const content = fs.readFileSync(filePath, "utf8")
    return parseMarkdownContent(content)
  } catch (error) {
    console.error(`Error reading markdown file ${filename}:`, error)
    return {}
  }
}

export function getBlogPosts(): any[] {
  const content = readMarkdownFile("blog.md")
  const posts = []

  // Add featured post
  if (content.featured_post && Array.isArray(content.featured_post) && content.featured_post.length > 0) {
    const featured = content.featured_post[0]
    posts.push({
      id: 0,
      title: featured.title || "Featured Post",
      excerpt: featured.description || "Featured post description",
      date: featured.date || "2024-01-15",
      readTime: featured.read_time || "5 min read",
      category: featured.category || "General",
      slug: featured.slug || "featured-post",
      featured: true,
    })
  }

  // Add regular blog posts
  for (const key in content) {
    if (key.startsWith("blog_post_")) {
      const postData = content[key]
      if (Array.isArray(postData) && postData.length > 0) {
        const post = postData[0]
        posts.push({
          id: posts.length + 1,
          title: post.title || "Blog Post",
          excerpt: post.description || "Blog post description",
          date: post.date || "2024-01-01",
          readTime: post.read_time || "5 min read",
          category: post.category || "General",
          slug: post.slug || "blog-post",
        })
      }
    }
  }

  // Fallback data
  if (posts.length === 0) {
    return [
      {
        id: 1,
        title: "Building Scalable React Applications",
        excerpt:
          "Learn the best practices for structuring and organizing large-scale React applications that can grow with your team and requirements.",
        date: "2024-01-15",
        readTime: "8 min read",
        category: "React",
        slug: "building-scalable-react-applications",
        featured: true,
      },
      {
        id: 2,
        title: "Next.js 14: What's New and Exciting",
        excerpt:
          "Explore the latest features in Next.js 14, including improved performance, new APIs, and enhanced developer experience.",
        date: "2024-01-10",
        readTime: "6 min read",
        category: "Next.js",
        slug: "nextjs-14-whats-new",
      },
    ]
  }

  return posts
}
