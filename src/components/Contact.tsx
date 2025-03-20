
import React, { useState } from 'react';
import Section from './ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import Button from './ui/Button';
import { Send, Mail, Linkedin, Github, Calendar, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast.success('Message sent successfully!', {
        description: 'Thank you for your message. I will get back to you soon.',
      });
    }, 1500);
  };

  return (
    <Section id="contact">
      <div className="text-center mb-12">
        <div className="pill-accent mb-4">Contact</div>
        <h2 className="heading-lg mb-4">
          Let's <span className="text-gradient">Connect</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interested in AI solutions for sales or financial markets? Have questions about my research? 
          I'm open to discussions, collaborations, and consulting opportunities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-navy/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-navy/30"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-navy/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none"
                  ></textarea>
                </div>
                
                <Button
                  type="submit"
                  variant="accent"
                  disabled={submitting}
                  className={`w-full ${submitting ? 'opacity-80 pointer-events-none' : ''}`}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:contact@example.com" 
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">contact@example.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                    <Linkedin className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Connect professionally</p>
                  </div>
                </a>
                
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                    <Github className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">Explore projects</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Book a Consultation</h3>
              <p className="text-muted-foreground mb-4">
                Need personalized advice? Book a virtual consultation to discuss:
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-navy shrink-0 mt-1" />
                  <span className="text-sm">AI integration for sales operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-navy shrink-0 mt-1" />
                  <span className="text-sm">AI-driven financial market analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-navy shrink-0 mt-1" />
                  <span className="text-sm">5G/IoT solutions for business</span>
                </li>
              </ul>
              
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-navy text-white hover:bg-navy/90 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule via Calendly</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
