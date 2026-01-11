'use client';
import Link from 'next/link'
import { Calendar, User, ArrowRight, ChevronRight } from 'lucide-react'
import { useTheme } from '@/app/contexts/ThemeContext'

// Blog posts data
const blogPosts = [
    {
        id: 1,
        slug: 'why-subscription-water-purifiers-work-better-in-cities',
        title: 'Why Subscription Water Purifiers Work Better in Cities',
        excerpt: 'Life nowadays moves fast, with packed schedules, growing families, changing homes, and shifting priorities. A subscription water purifier...',
        date: 'January 9, 2026',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '5 min read',
        image: '/images/blog1.jpg'
    },
    {
        id: 2,
        slug: 'get-faster-service-from-safetap-via-chat-support',
        title: 'Get Faster Service from SafeTap via Chat Support',
        excerpt: 'SafeTap has become an ideal choice for smart water purification solutions among urban households...',
        date: 'January 9, 2026',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '4 min read',
        image: '/images/blog2.jpg'
    },
    {
        id: 3,
        slug: 'water-tank-contamination-in-dhaka-apartments',
        title: 'Water Tank Contamination in Dhaka Apartments',
        excerpt: 'Dhaka\'s a booming urban city with defined high-rise buildings and a heavy load on the water infrastructure...',
        date: 'January 7, 2026',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '6 min read',
        image: '/images/blog3.jpg'
    },
    {
        id: 4,
        slug: 'safetap-lifetime-free-maintenance-meaning',
        title: 'SafeTap Lifetime Free Maintenance Meaning',
        excerpt: 'What Is Lifetime Free Maintenance at SafeTap? Lifetime Free Maintenance means you never pay for maintenance...',
        date: 'January 6, 2026',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '5 min read',
        image: '/images/blog4.jpg'
    },
    {
        id: 5,
        slug: 'how-safetap-manages-seasonal-water-taste-changes',
        title: 'How SafeTap Manages Seasonal Water Taste Changes',
        excerpt: 'Water is often thought of as one of the most consistent substances. Yet, regular tap water drinkers know...',
        date: 'January 5, 2026',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '7 min read',
        image: '/images/blog5.jpg'
    },
    {
        id: 6,
        slug: 'uv-led-water-purification-how-it-works-benefits',
        title: 'UV LED Water Purification: How It Works & Benefits',
        excerpt: 'Clean drinking water is no longer a luxury but a necessity for everyone. With growing concerns about waterborne diseases...',
        date: 'December 29, 2025',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '8 min read',
        image: '/images/blog6.jpg'
    },
    {
        id: 7,
        slug: 'why-dhaka-water-quality-is-so-different',
        title: 'Why Dhaka\'s Water Quality Is So Different',
        excerpt: 'Dhaka, as we all know, it\'s not just a metropolitan city. It\'s also one of the major economic hubs of Bangladesh...',
        date: 'December 29, 2025',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '6 min read',
        image: '/images/blog7.jpg'
    },
    {
        id: 8,
        slug: 'how-safetap-alkaline-purifier-helps-dhaka-families',
        title: 'How SafeTap\'s Alkaline Purifier Helps Dhaka Families',
        excerpt: 'Presently, access to safe, clean drinking water is something that many families struggle to find...',
        date: 'December 26, 2025',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '5 min read',
        image: '/images/blog8.jpg'
    },
    {
        id: 9,
        slug: 'safetap-winter-guide-to-hydration-immunity',
        title: 'SafeTap Winter Guide to Hydration & Immunity',
        excerpt: 'In winter, most of the time people ignore staying hydrated due to lower thirst levels, which negatively impacts immunity...',
        date: 'December 26, 2025',
        author: 'SafeTap',
        category: 'Health',
        readTime: '6 min read',
        image: '/images/blog9.jpg'
    },
    {
        id: 10,
        slug: 'is-dhaka-drinking-water-safe-family-reality-check',
        title: 'Is Dhaka\'s Drinking Water Safe? A Family Reality Check',
        excerpt: 'Water is something that most of us take for granted. We turn on the tap, fill our glasses, and drink...',
        date: 'December 24, 2025',
        author: 'SafeTap',
        category: 'Water Purifier',
        readTime: '7 min read',
        image: '/images/blog10.jpg'
    },
]

// Categories
const categories = [
    { name: 'Water Purifier', count: 45 },
    { name: 'Health', count: 12 },
    { name: 'Technology', count: 8 },
    { name: 'Maintenance', count: 15 },
    { name: 'Lifestyle', count: 10 },
]

// Latest posts for sidebar
const latestPosts = blogPosts.slice(0, 5)

export default function BlogPage() {
    const { theme } = useTheme()

    // Theme-based styles
    const styles = {
        // Background colors
        bgPrimary: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
        bgSecondary: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
        bgTertiary: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',

        // Text colors
        textPrimary: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
        textSecondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
        textTertiary: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',

        // Border colors
        borderPrimary: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
        borderSecondary: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',

        // Button colors
        buttonPrimary: theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600' : 'bg-cyan-600 hover:bg-cyan-700',
        buttonSecondary: theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100',

        // Special colors
        cyanText: theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600',
        cyanBg: theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-100',
        cyanBorder: theme === 'dark' ? 'border-cyan-800' : 'border-cyan-200',

        // Hover colors
        hoverText: theme === 'dark' ? 'hover:text-cyan-300' : 'hover:text-cyan-700',
        hoverBg: theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50',
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${styles.bgPrimary}`}>
            {/* Hero Section */}
            <div className={`border-b ${styles.borderPrimary} ${styles.bgSecondary}`}>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${styles.textPrimary}`}>
                        SafeTap <span className={`${styles.cyanText}`}>Blogs</span>
                    </h1>
                    <p className={`text-lg max-w-3xl ${styles.textSecondary}`}>
                        SafeTap: Bangladesh  most trusted customized water purifier. Read about water purifiers, technology,
                        healthy lifestyle habits with safe water and more!
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Blog Posts */}
                    <div className="lg:w-2/3">
                        {/* Blog Posts List */}
                        <div className="space-y-8">
                            {blogPosts.map((post) => (
                                <article key={post.id} className={`rounded-lg shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-md ${styles.bgSecondary} ${styles.borderPrimary}`}>
                                    <div className="p-6">
                                        {/* Category */}
                                        <div className="mb-3">
                                            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${styles.cyanBg} ${styles.cyanText}`}>
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className={`text-2xl font-bold mb-4 transition-colors ${styles.textPrimary} ${styles.hoverText}`}>
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        {/* Meta Info */}
                                        <div className={`flex items-center text-sm mb-4 ${styles.textTertiary}`}>
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span className="mr-4">{post.date}</span>
                                            <User className="w-4 h-4 mr-1" />
                                            <span>By {post.author}</span>
                                        </div>

                                        {/* Excerpt */}
                                        <p className={`mb-4 line-clamp-3 ${styles.textSecondary}`}>
                                            {post.excerpt}
                                        </p>

                                        {/* Read More */}
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm ${styles.textTertiary}`}>{post.readTime}</span>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className={`inline-flex items-center font-medium ${styles.cyanText} ${styles.hoverText}`}
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {/* <div className="mt-12 flex justify-center items-center space-x-2">
              <button className={`px-4 py-2 rounded-lg font-medium ${styles.buttonPrimary} text-white`}>
                1
              </button>
              <button className={`px-4 py-2 rounded-lg border ${styles.borderSecondary} ${styles.textPrimary} ${styles.buttonSecondary} ${styles.hoverBg}`}>
                2
              </button>
              <button className={`px-4 py-2 rounded-lg border ${styles.borderSecondary} ${styles.textPrimary} ${styles.buttonSecondary} ${styles.hoverBg}`}>
                3
              </button>
              <span className={`px-2 ${styles.textTertiary}`}>...</span>
              <button className={`px-4 py-2 rounded-lg border ${styles.borderSecondary} ${styles.textPrimary} ${styles.buttonSecondary} ${styles.hoverBg}`}>
                52
              </button>
              <button className={`px-4 py-2 rounded-lg border ${styles.borderSecondary} ${styles.textPrimary} ${styles.buttonSecondary} ${styles.hoverBg} flex items-center`}>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div> */}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:w-1/3">
                        {/* Search Box */}
                        <div className={`rounded-lg shadow-sm border p-6 mb-6 ${styles.bgSecondary} ${styles.borderPrimary}`}>
                            <h3 className={`text-lg font-bold mb-4 ${styles.textPrimary}`}>Search Articles</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search blog posts..."
                                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
                                />
                                <button className={`absolute right-3 top-3 ${styles.textTertiary} hover:${styles.cyanText}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className={`rounded-lg shadow-sm border p-6 mb-6 ${styles.bgSecondary} ${styles.borderPrimary}`}>
                            <h3 className={`text-lg font-bold mb-4 ${styles.textPrimary}`}>Categories</h3>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${styles.hoverBg} ${styles.textSecondary} ${styles.hoverText}`}
                                        >
                                            <span>{category.name}</span>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${styles.bgTertiary} ${styles.textTertiary}`}>
                                                {category.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Latest Posts */}
                        <div className={`rounded-lg shadow-sm border p-6 ${styles.bgSecondary} ${styles.borderPrimary}`}>
                            <h3 className={`text-lg font-bold mb-4 ${styles.textPrimary}`}>Latest Posts</h3>
                            <div className="space-y-4">
                                {latestPosts.map((post) => (
                                    <div key={post.id} className={`border-b pb-4 last:border-0 last:pb-0 ${styles.borderPrimary}`}>
                                        <Link href={`/blog/${post.slug}`}>
                                            <h4 className={`font-semibold mb-1 line-clamp-2 ${styles.textPrimary} ${styles.hoverText}`}>
                                                {post.title}
                                            </h4>
                                        </Link>
                                        <p className={`text-sm mb-2 ${styles.textTertiary}`}>{post.date}</p>
                                        <p className={`text-sm line-clamp-2 ${styles.textSecondary}`}>
                                            {post.excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className={`inline-block text-sm mt-2 ${styles.cyanText} ${styles.hoverText}`}
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        {/* <div className="mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-cyan-100 mb-4">
                Get weekly water purification tips and health insights directly in your inbox.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button className="w-full bg-white text-cyan-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div> */}
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            {/* <div className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-900'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing a Water Purifier?</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Our water experts can help you find the perfect solution for your home's water needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div> */}
        </div>
    )
}