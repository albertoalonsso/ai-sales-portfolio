
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Send, Check } from 'lucide-react';
import { toast } from 'sonner';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setEmail('');
      toast.success('Subscription successful!', {
        description: 'You will now receive our newsletter.',
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <Card className="bg-navy text-white overflow-hidden border-white/10">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Left Side - Categories */}
          <div className="p-8 md:col-span-2 bg-white/5">
            <h3 className="text-xl font-semibold mb-4">Featured Topics</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-turquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-turquoise" />
                </div>
                <span className="text-white/80 text-sm">Deep Learning for Financial Markets</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-turquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-turquoise" />
                </div>
                <span className="text-white/80 text-sm">Reinforcement Learning in Portfolio Optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-turquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-turquoise" />
                </div>
                <span className="text-white/80 text-sm">NLP Analysis of Financial Communications</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-turquoise/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-turquoise" />
                </div>
                <span className="text-white/80 text-sm">Consultative Sales in AI Solutions</span>
              </li>
            </ul>
          </div>

          {/* Right Side - Signup Form */}
          <div className="p-8 md:col-span-3">
            <h3 className="text-xl font-semibold mb-2">Join the Newsletter</h3>
            <p className="text-white/80 mb-6 text-sm">
              Receive curated insights and research updates. Subscribers get exclusive access to case studies and resources.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email address</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-turquoise/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Frequency preference</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${
                        frequency === 'weekly'
                          ? 'bg-turquoise text-navy font-medium'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                      onClick={() => setFrequency('weekly')}
                    >
                      Weekly
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${
                        frequency === 'biweekly'
                          ? 'bg-turquoise text-navy font-medium'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                      onClick={() => setFrequency('biweekly')}
                    >
                      Bi-weekly
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={submitting || !email}
                    className={`w-full bg-turquoise hover:bg-turquoise/90 text-navy font-medium ${
                      submitting ? 'opacity-80 pointer-events-none' : ''
                    }`}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : success ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Subscribed!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Subscribe to Newsletter
                      </span>
                    )}
                  </Button>
                </div>

                <div className="text-xs text-white/60 mt-4">
                  By subscribing, you agree to our privacy policy. We respect your inbox and you can unsubscribe at any time.
                </div>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionForm;
