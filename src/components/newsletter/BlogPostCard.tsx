import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MessageSquare, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  commentCount: number;
  shareCount: number;
  author?: {
    name: string;
    avatar: string;
    initials: string;
  };
  index?: number;
}

const BlogPostCard = ({ post, index = 0 }: { post: BlogPost; index?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAlternate = index % 2 === 1;

  // Default author if not provided
  const author = post.author || {
    name: "Alberto Alonso",
    avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
    initials: "AA"
  };

  // Aseguramos que la ruta de la imagen sea absoluta
  const avatarUrl = author.avatar.startsWith('/') 
    ? author.avatar 
    : `/${author.avatar}`;

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        isAlternate ? "bg-[#3F4561] text-white" : "bg-white",
        isExpanded ? "shadow-lg" : "shadow-sm"
      )}
    >
      <CardContent className="p-0">
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full"
        >
          <div className="p-6">
            <div className="pill mb-3 inline-block">{post.category}</div>
            <h3 className={cn("text-lg font-semibold mb-2 line-clamp-2", 
              isAlternate ? "text-white/90" : "text-foreground")}>{post.title}</h3>
            <p className={cn("text-sm mb-4 line-clamp-3", 
              isAlternate ? "text-white/70" : "text-muted-foreground")}>{post.excerpt}</p>
            
            <CollapsibleTrigger asChild>
              <button 
                className={cn(
                  "flex items-center gap-1 text-xs font-medium mb-4 transition-colors", 
                  isAlternate ? "text-white/80 hover:text-white" : "text-navy hover:text-navy/80"
                )}
              >
                {isExpanded ? (
                  <>
                    Read Less <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4">
              <div className={cn(
                "text-sm", 
                isAlternate ? "text-white/80" : "text-muted-foreground"
              )}>
                {post.content || "Additional content that would be shown when expanded. This gives more context about the article and entices the reader to click through to read the full piece."}
              </div>
            </CollapsibleContent>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-navy/10">
                  <AvatarImage src={avatarUrl} alt={author.name} />
                  <AvatarFallback>{author.initials}</AvatarFallback>
                </Avatar>
                <div className={isAlternate ? "text-white/80" : "text-muted-foreground"}>
                  <span className="text-xs font-medium block">{author.name}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  isAlternate ? "text-white/60" : "text-muted-foreground"
                )}>
                  <MessageSquare className="h-3 w-3" />
                  <span>{post.commentCount}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  isAlternate ? "text-white/60" : "text-muted-foreground"
                )}>
                  <Share2 className="h-3 w-3" />
                  <span>{post.shareCount}</span>
                </div>
              </div>
            </div>
          </div>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
