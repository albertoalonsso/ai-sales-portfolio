import React, { useState } from 'react';
import { useNewsletterEntries } from '@/hooks/useNewsletter';
import { NewsletterEntry } from '@/models/newsletter';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Search, Share2, Tag } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Link } from 'react-router-dom';

const NewsletterCard = ({ entry }: { entry: NewsletterEntry }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
      <CardContent className="p-0 h-full">
        {entry.coverImage && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={entry.coverImage} 
              alt={entry.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex gap-2 mb-3">
            {entry.tags.slice(0, 2).map((tag, index) => (
              <div key={index} className="pill-accent text-xs">{tag}</div>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{entry.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{entry.excerpt}</p>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(entry.publishedDate).toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{entry.commentCount || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-3 w-3" />
                <span>{entry.shareCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NewsletterList = () => {
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState('');
  const { data, isLoading, error } = useNewsletterEntries(page, 12, tag);
  
  const handleTagFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset to first page when applying a new filter
    setPage(1);
  };
  
  const clearFilter = () => {
    setTag('');
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load newsletter entries</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8">
        <form onSubmit={handleTagFilter} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter by tag or topic..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="outline">
            <Tag className="mr-2 h-4 w-4" />
            Filter
          </Button>
          {tag && (
            <Button type="button" variant="ghost" onClick={clearFilter}>
              Clear
            </Button>
          )}
        </form>
      </div>

      {/* Results */}
      {data?.entries && data.entries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.entries.map((entry) => (
              <Link 
                to={`/blog/${entry.id}`} 
                key={entry.id} 
                className="transition-transform duration-300 hover:-translate-y-1 block h-full"
              >
                <NewsletterCard entry={entry} />
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          {data.totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {[...Array(data.totalPages)].map((_, i) => {
                  // Show first page, current page, last page, and ellipses
                  const pageNum = i + 1;
                  
                  // Logic for displaying page links or ellipses
                  if (
                    pageNum === 1 ||
                    pageNum === data.totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === page}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (pageNum === 2 && page > 3) ||
                    (pageNum === data.totalPages - 1 && page < data.totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setPage(p => Math.min(p + 1, data.totalPages))}
                    className={page >= data.totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No newsletter entries found</p>
          {tag && (
            <Button variant="outline" className="mt-4" onClick={clearFilter}>
              Clear Filter
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsletterList;
