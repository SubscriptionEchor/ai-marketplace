import { EmptyState } from '@/features/shared/components/EmptyState';

export function DownloadsView() {
  return (
    <div className="px-4 sm:px-0">
      <EmptyState
        title="No Downloads Yet"
        description="Your downloaded AI models and datasets will appear here"
        icon={
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        }
      />
    </div>
  );
}