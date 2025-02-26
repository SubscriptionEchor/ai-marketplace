import { EmptyState } from '@/features/shared/components/EmptyState';

export function HistoryView() {
  return (
    <div className="px-4 sm:px-0">
      <EmptyState
        title="No Activity History"
        description="Your recent activity and transactions will be shown here"
        icon={
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
}