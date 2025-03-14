
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/ui/Section';
import NewsletterList from '@/components/newsletter/NewsletterList';
import NewsletterDetail from '@/components/newsletter/NewsletterDetail';

const Blog = () => {
  const { slug } = useParams<{ slug?: string }>();
  
  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <Section id="newsletter" className="py-16">
        <div className="max-w-5xl mx-auto">
          {!slug ? (
            <>
              <div className="text-center mb-12">
                <div className="pill-accent mb-4">Blog & Newsletter</div>
                <h1 className="heading-lg mb-4">
                  AI×Finance: <span className="text-gradient">Strategies of the Future</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Insights at the intersection of Artificial Intelligence, 
                  Financial Markets, and Sales Strategies. Get the latest research and practical applications.
                </p>
              </div>
              
              {/* Newsletter list */}
              <NewsletterList />
            </>
          ) : (
            <NewsletterDetail />
          )}
        </div>
      </Section>
      
      <Footer />
    </main>
  );
};

export default Blog;
