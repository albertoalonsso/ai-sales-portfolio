
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsletterApi } from '@/services/newsletterService';

export const useNewsletterEntries = (page = 1, pageSize = 9, tag?: string) => {
  return useQuery({
    queryKey: ['newsletterEntries', page, pageSize, tag],
    queryFn: () => newsletterApi.getEntries(page, pageSize, tag),
    placeholderData: (previousData) => previousData,
  });
};

export const useNewsletterEntry = (idOrSlug: string) => {
  return useQuery({
    queryKey: ['newsletterEntry', idOrSlug],
    queryFn: () => newsletterApi.getEntry(idOrSlug),
    enabled: !!idOrSlug,
  });
};

export const useFeaturedEntries = () => {
  return useQuery({
    queryKey: ['featuredEntries'],
    queryFn: () => newsletterApi.getFeaturedEntries(),
  });
};

export const useSearchEntries = (query: string) => {
  return useQuery({
    queryKey: ['searchEntries', query],
    queryFn: () => newsletterApi.searchEntries(query),
    enabled: query.length > 2, // Only search when query is at least 3 characters
  });
};

export const useAddSubscriber = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      email, 
      name, 
      preferences 
    }: { 
      email: string; 
      name?: string; 
      preferences?: { 
        frequency: 'weekly' | 'biweekly'; 
        topics?: string[]; 
      } 
    }) => {
      return newsletterApi.addSubscriber(email, name, preferences);
    },
    onSuccess: () => {
      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ['subscriberStats'] });
    },
  });
};

// Add the useSubscription hook that was missing
export const useSubscription = () => {
  const mutation = useAddSubscriber();
  
  return {
    subscribe: (email: string) => mutation.mutateAsync({ email }),
    isLoading: mutation.isPending
  };
};
