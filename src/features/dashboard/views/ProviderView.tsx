import { EmptyState } from '@/features/shared/components/EmptyState';
import { Button } from '@/features/ui/components/Button';

export function ProviderView() {
  return (
    <div className="px-4 sm:px-0">
      <EmptyState
        title="Become a Data Provider"
        description="Share your AI models and datasets with the community"
        icon={
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        action={
          <Button variant="primary" className="mt-4">
            Get Started
          </Button>
        }
      />
    </div>
  );
}