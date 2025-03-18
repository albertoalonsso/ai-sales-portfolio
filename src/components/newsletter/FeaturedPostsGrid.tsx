
import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostCard from './BlogPostCard';

const blogPosts = [
  {
    id: 1,
    title: "Reinforcement Learning in Financial Markets: Current Applications",
    excerpt: "Exploring how RL is transforming portfolio optimization and trading strategies in today's dynamic markets.",
    content: "Reinforcement Learning has emerged as a powerful technique for optimizing trading strategies in volatile markets. By leveraging historical data and real-time feedback, AI models can adapt to changing market conditions and maximize returns while managing risk exposure.",
    date: "June 15, 2024",
    category: "AI & Finance",
    commentCount: 8,
    shareCount: 23,
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      initials: "AA"
    }
  },
  {
    id: 2,
    title: "The Future of 5G and IoT in Industrial Environments",
    excerpt: "How next-generation connectivity is enabling unprecedented automation and data analytics in manufacturing.",
    content: "The convergence of 5G networks and IoT devices is creating new possibilities for industrial automation. With ultra-low latency connections and massive device density support, factories can deploy thousands of sensors to create digital twins and optimize operations in real-time.",
    date: "June 2, 2024",
    category: "Technology",
    commentCount: 5,
    shareCount: 17,
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      initials: "AA"
    }
  },
  {
    id: 3,
    title: "NLP Analysis: Extracting Value from Financial Communications",
    excerpt: "Techniques for analyzing earnings calls and financial reports to gain market insights using natural language processing.",
    content: "Natural Language Processing techniques are revolutionizing how investors analyze corporate communications. By applying sentiment analysis and entity recognition to earnings calls and financial reports, analysts can identify subtle signals that might indicate future performance changes.",
    date: "May 23, 2024",
    category: "AI & Finance",
    commentCount: 12,
    shareCount: 31,
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      initials: "AA"
    }
  }
];

const FeaturedPostsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {blogPosts.map((post, index) => (
        <Link to={`/blog/${post.id}`} key={post.id} className="transition-transform duration-300 hover:-translate-y-1">
          <BlogPostCard post={{...post, index}} index={index} />
        </Link>
      ))}
    </div>
  );
};

export default FeaturedPostsGrid;
