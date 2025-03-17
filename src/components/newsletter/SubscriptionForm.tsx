
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useAddSubscriber } from '@/hooks/useNewsletter';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly'>('weekly');
  const [success, setSuccess] = useState(false);

  const { mutate, isPending: submitting } = useAddSubscriber();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    mutate(
      { 
        email, 
        preferences: { frequency } 
      },
      {
        onSuccess: () => {
          setEmail('');
          setSuccess(true);
          
          toast.success('Successfully subscribed to the newsletter!', {
            description: 'You will receive updates based on your preferences.',
          });
          
          // Reset success message after delay
          setTimeout(() => setSuccess(false), 5000);
        },
        onError: () => {
          toast.error('Failed to subscribe', {
            description: 'Please try again later.',
          });
        }
      }
    );
  };

  return (
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
              <span>Subscribe to Newsletter</span>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-white/60 mt-4">
          By subscribing, you agree to our privacy policy. We respect your inbox and you can unsubscribe at any time.
        </div>
      </div>
    </form>
  );
};

export default SubscriptionForm;
