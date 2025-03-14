
import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostCard from './BlogPostCard';

const blogPosts = [
  {
    id: 1,
    title: "Reinforcement Learning in Financial Markets: Current Applications",
    excerpt: "Exploring how RL is transforming portfolio optimization and trading strategies in today's dynamic markets.",
    date: "June 15, 2024",
    category: "AI & Finance",
    commentCount: 8,
    shareCount: 23
  },
  {
    id: 2,
    title: "The Future of 5G and IoT in Industrial Environments",
    excerpt: "How next-generation connectivity is enabling unprecedented automation and data analytics in manufacturing.",
    date: "June 2, 2024",
    category: "Technology",
    commentCount: 5,
    shareCount: 17
  },
  {
    id: 3,
    title: "NLP Analysis: Extracting Value from Financial Communications",
    excerpt: "Techniques for analyzing earnings calls and financial reports to gain market insights using natural language processing.",
    date: "May 23, 2024",
    category: "AI & Finance",
    commentCount: 12,
    shareCount: 31
  }
];

const FeaturedPostsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {blogPosts.map((post) => (
        <Link to={`/blog/${post.id}`} key={post.id}>
          <BlogPostCard post={post} />
        </Link>
      ))}
    </div>
  );
};

export default FeaturedPostsGrid;
