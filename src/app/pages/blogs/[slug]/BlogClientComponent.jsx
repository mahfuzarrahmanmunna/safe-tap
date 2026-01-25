// src/app/pages/blogs/[slug]/BlogClientComponent.jsx
"use client";
import Link from "next/link";
import {
  Calendar,
  User,
  Clock,
  Share2,
  ArrowLeft,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function BlogClientComponent({
  post,
  relatedPosts,
  allBlogPosts,
}) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const shareText = encodeURIComponent(`Check out: ${post.title}`);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-cyan-600 hover:text-cyan-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Blogs
            </Link>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-cyan-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-cyan-100 text-cyan-800 font-semibold rounded-full">
            {post.category}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="font-medium">{post.date}</span>
          </div>

          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            <span>By {post.author}</span>
          </div>

          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>{post.readTime}</span>
          </div>

          {/* Share Buttons */}
          <div className="ml-auto flex items-center space-x-2">
            <span className="text-gray-500">Share:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-50 text-blue-400 hover:bg-blue-100"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-10">
          <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  SafeTap Water Purification
                </h3>
                <p>Advanced technology for clean, healthy water</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Featured image: {post.title}
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="mb-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">ST</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.author}
              </h3>
              <p className="text-gray-600 mb-3">{post.authorRole}</p>
              <p className="text-gray-700">
                Our team of water experts brings decades of experience in
                purification technology, water quality analysis, and public
                health. We are committed to helping Bangladeshi families access
                safe, clean drinking water through innovative solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${Object.keys(allBlogPosts).find((key) => allBlogPosts[key].id === relatedPost.id)}`}
                >
                  <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all cursor-pointer">
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-cyan-700 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{relatedPost.date}</span>
                      <span className="text-cyan-600 font-medium">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white mb-8">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help with Water Purification?
          </h3>
          <p className="text-cyan-100 mb-6 max-w-xl mx-auto">
            Our water experts can help you choose the perfect purification
            system for your home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-cyan-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Back to Blogs Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Blogs
          </Link>
        </div>
      </article>
    </div>
  );
}
