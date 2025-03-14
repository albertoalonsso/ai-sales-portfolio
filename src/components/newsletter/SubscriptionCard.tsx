
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CategoryList from './CategoryList';
import SubscriptionForm from './SubscriptionForm';

const SubscriptionCard = () => {
  return (
    <Card className="bg-navy text-white overflow-hidden border-white/10">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Left Side - Categories */}
          <CategoryList />
          
          {/* Right Side - Signup Form */}
          <div className="p-8 md:col-span-3">
            <h3 className="text-xl font-semibold mb-2">Join the Newsletter</h3>
            <p className="text-white/80 mb-6 text-sm">
              Receive curated insights and research updates. Subscribers get exclusive access to case studies and resources.
            </p>
            
            <SubscriptionForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
