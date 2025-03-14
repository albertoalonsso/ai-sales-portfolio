
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MessageSquare, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  commentCount: number;
  shareCount: number;
}

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="pill mb-3">{post.category}</div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{post.commentCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-3 w-3" />
                <span>{post.shareCount}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
