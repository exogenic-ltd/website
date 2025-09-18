import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { readMarkdownFile, getBlogPosts } from "@/lib/markdown-parser"

export default function Blog() {
  const blogContent = readMarkdownFile("blog.md")
  const featuredPost = blogContent.featuredPost;
  const regularPosts = blogContent.blogPosts

  const categories = blogContent.categories || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {blogContent.header?.title || "My"}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {blogContent.header?.subtitle ||
              "Thoughts, tutorials, and insights about bionics, medical technology, and the ever-evolving med-tech landscape."}
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category: string) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800/50 text-gray-300 border border-blue-500/20 hover:border-blue-500/40 hover:text-blue-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="bg-gray-800/50 rounded-lg border border-blue-500/20 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-300 mb-6 text-lg">{featuredPost.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Link
                      href={`/blog-posts/?slug=${featuredPost.slug}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <span className="text-2xl">📝</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post:any) => (
            <article
              key={post.id}
              className="bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">{post.category}</span>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-3">{post.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Link
                    href={`/blog-posts/?slug=${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        {/* <div className="mt-16">
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {blogContent.newsletter_section?.title || "Stay Updated"}
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {blogContent.newsletter_section?.description ||
                "Subscribe to my newsletter to get the latest articles and insights delivered directly to your inbox."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
