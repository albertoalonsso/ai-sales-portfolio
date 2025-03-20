import React from 'react';
import { useNewsletterEntry } from '@/hooks/useNewsletter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';

const NewsletterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: entry, isLoading, error } = useNewsletterEntry(slug || '');
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };
  
  const handleBookmark = () => {
    toast.success('Article bookmarked!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/blog')}>
          Go to More News
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-8" 
        onClick={() => navigate('/blog')}
      >
        Go to More News
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      {/* Article header */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          {entry.tags.map((tag, index) => (
            <div key={index} className="pill-accent">{tag}</div>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{entry.title}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(entry.publishedDate).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{entry.readTime} min read</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {entry.author.avatar && (
            <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
              <img
                src={entry.author.avatar}
                alt={entry.author.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Si la imagen falla, mostrar las iniciales como fallback
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerText = entry.author.name.split(' ').map(n => n[0]).join('');
                  e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-navy', 'text-white');
                }}
              />
            </div>
          )}
          <div>
            <div className="font-medium">{entry.author.name}</div>
            <div className="text-sm text-muted-foreground">{entry.author.title}</div>
          </div>
        </div>
      </div>
      
      {/* Cover image */}
      {entry.coverImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={entry.coverImage} 
            alt={entry.title} 
            className="w-full h-auto object-cover"
            onError={(e) => {
              // Si la imagen falla, ocultar el contenedor para evitar espacios vacíos
              e.currentTarget.parentElement!.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Article content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        {/* This is where we would render the markdown content */}
        <div dangerouslySetInnerHTML={{ __html: entry.content.replace(/^# .+$/m, '') }} />
      </div>
      
      {/* Article actions */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" onClick={handleBookmark}>
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{entry.commentCount || 0} comments</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Related articles would go here */}
    </div>
  );
};

export default NewsletterDetail;
