
import React from 'react';
import Section from '@/components/ui/Section';
import SubscriptionCard from './SubscriptionCard';

const NewsletterSection = () => {
  return (
    <Section id="newsletter" className="bg-gradient-to-b from-background to-navy/10 py-4 md:py-6 border-t-4 border-navy">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="pill-accent mb-4">Blog & Newsletter</div>
          <h2 className="heading-lg mb-4">
            AI×Finance: <span className="text-gradient">Strategies of the Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights at the intersection of Artificial Intelligence, 
            Financial Markets, and Sales Strategies. Get the latest research and practical applications.
          </p>
        </div>
        
        {/* Subscription Card */}
        <SubscriptionCard />
      </div>
    </Section>
  );
};

export default NewsletterSection;
