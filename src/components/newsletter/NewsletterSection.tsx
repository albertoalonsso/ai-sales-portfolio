
import React from 'react';
import Section from '@/components/ui/Section';
import FeaturedPostsGrid from './FeaturedPostsGrid';
import SubscriptionCard from './SubscriptionCard';

const NewsletterSection = () => {
  return (
    <Section id="newsletter" className="bg-gradient-to-b from-background to-navy/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="pill-accent mb-4">Blog & Newsletter</div>
          <h2 className="heading-lg mb-4">
            AI×Finance: <span className="text-gradient">Strategies of the Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights at the intersection of Artificial Intelligence, 
            Financial Markets, and Sales Strategies. Get the latest research and practical applications.
          </p>
        </div>
        
        {/* Featured Blog Posts */}
        <FeaturedPostsGrid />
        
        {/* Subscription Card */}
        <SubscriptionCard />
      </div>
    </Section>
  );
};

export default NewsletterSection;
