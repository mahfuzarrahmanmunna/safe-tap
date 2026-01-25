// src/app/pages/blogs/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogClientComponent from "./BlogClientComponent";

// All blog data
const allBlogPosts = {
  "why-subscription-water-purifiers-work-better-in-cities": {
    id: 1,
    title: "Why Subscription Water Purifiers Work Better in Cities",
    content: `
      <p>Life nowadays moves fast, with packed schedules, growing families, changing homes, and shifting priorities. A subscription water purifier adapts to these urban dynamics seamlessly.</p>

      <h2>The Urban Lifestyle Challenge</h2>
      <p>City living comes with unique challenges when it comes to water purification:</p>
      <ul>
        <li><strong>Frequent Relocation:</strong> Urban residents move homes more often. A subscription model eliminates the hassle of moving bulky water purifiers.</li>
        <li><strong>Space Constraints:</strong> Most city apartments have limited kitchen space. Subscription services provide compact, efficient solutions.</li>
        <li><strong>Maintenance Hassles:</strong> Finding reliable service technicians in cities can be challenging. Subscription includes regular maintenance.</li>
      </ul>

      <h2>How Subscription Models Excel</h2>
      <p>Subscription water purifiers offer several advantages over traditional ownership:</p>

      <h3>1. Cost-Effective Solution</h3>
      <p>No large upfront investment. Pay a manageable monthly fee that includes the purifier, installation, maintenance, and filter replacements.</p>

      <h3>2. Always Updated Technology</h3>
      <p>As water purification technology advances, subscribers get automatic upgrades without additional costs.</p>

      <h3>3. Zero Maintenance Worries</h3>
      <p>Regular filter changes, servicing, and repairs are all included in the subscription plan.</p>

      <h3>4. Flexible Plans</h3>
      <p>Choose plans based on your family size, water consumption, and specific needs. Upgrade or downgrade as your requirements change.</p>

      <h2>Case Study: Dhaka City</h2>
      <p>In Dhaka, where water quality varies significantly across different areas, subscription models allow for customized purification based on local water reports. Our systems automatically adjust to the specific contaminants found in your area's water supply.</p>

      <h2>Conclusion</h2>
      <p>For urban dwellers facing space constraints, frequent moves, and busy schedules, subscription water purifiers offer the perfect balance of convenience, cost-effectiveness, and quality. They transform water purification from a capital expense and maintenance headache into a simple, manageable monthly service.</p>
    `,
    excerpt:
      "Life nowadays moves fast, with packed schedules, growing families, changing homes, and shifting priorities. A subscription water purifier adapts to these urban dynamics seamlessly.",
    author: "SafeTap Team",
    authorRole: "Water Solutions Expert",
    date: "January 9, 2026",
    readTime: "5 min read",
    category: "Water Purifier",
    tags: [
      "Subscription",
      "Urban Living",
      "Water Purifier",
      "Maintenance",
      "Cost Effective",
    ],
    image: "/images/blog1.jpg",
  },
  "get-faster-service-from-safetap-via-chat-support": {
    id: 2,
    title: "Get Faster Service from SafeTap via Chat Support",
    excerpt:
      "SafeTap has become an ideal choice for smart water purification solutions among urban households...",
    content: "<p>Full content for second blog...</p>",
    author: "SafeTap Team",
    date: "January 9, 2026",
    readTime: "4 min read",
    category: "Service",
    tags: ["Support", "Service", "Chat"],
  },
  "water-tank-contamination-in-dhaka-apartments": {
    id: 3,
    title: "Water Tank Contamination in Dhaka Apartments",
    excerpt:
      "Dhaka's a booming urban city with defined high-rise buildings and a heavy load on the water infrastructure...",
    content: "<p>Full content for third blog...</p>",
    author: "SafeTap Team",
    date: "January 7, 2026",
    readTime: "6 min read",
    category: "Water Quality",
    tags: ["Dhaka", "Contamination", "Water Tank"],
  },
};

// Related posts function
function getRelatedPosts(currentSlug, currentCategory) {
  const posts = Object.values(allBlogPosts)
    .filter((post) => post.id !== allBlogPosts[currentSlug]?.id)
    .filter((post) => post.category === currentCategory)
    .slice(0, 3); // Limit to 3

  if (posts.length < 3) {
    const otherPosts = Object.values(allBlogPosts)
      .filter((post) => post.id !== allBlogPosts[currentSlug]?.id)
      .filter((post) => post.category !== currentCategory)
      .slice(0, 3 - posts.length);

    return [...posts, ...otherPosts];
  }

  return posts;
}

// Generate static paths
export async function generateStaticParams() {
  return Object.keys(allBlogPosts).map((slug) => ({
    slug,
  }));
}

// SEO Metadata
export async function generateMetadata({ params }) {
  const post = allBlogPosts[params.slug];

  if (!post) {
    return {
      title: "Post Not Found | SafeTap Blog",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | SafeTap Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }) {
  const { slug } = params;
  const post = allBlogPosts[slug];

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.category);

  return (
    <BlogClientComponent
      post={post}
      relatedPosts={relatedPosts}
      allBlogPosts={allBlogPosts}
    />
  );
}
