
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubscription } from '@/hooks/useNewsletter';
import { toast } from '@/components/ui/use-toast';

interface SubscriptionFormProps {
  className?: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { subscribe, isLoading } = useSubscription();

  const onSubmit = async (data: any) => {
    try {
      await subscribe(data.email);
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Subscription failed.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <Input
        type="email"
        placeholder="Enter your email"
        className="flex-1"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
      {errors.email && (
        <p className="text-red-500 text-xs mt-1">{errors.email.message as React.ReactNode}</p>
      )}
    </form>
  );
};

export default SubscriptionForm;
