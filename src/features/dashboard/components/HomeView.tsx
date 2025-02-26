import { FeedList } from '@/features/feed/components/FeedList';

export function HomeView() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <FeedList />
    </div>
  );
}