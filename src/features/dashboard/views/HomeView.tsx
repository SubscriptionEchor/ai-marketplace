import { FeedList } from '@/features/feed/components/FeedList';
import { TopCreators } from '@/features/dashboard/components/TopCreators';

export function HomeView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
        {/* Feed Column */}
        <div className="flex-1 min-w-0 w-full">
          <FeedList />
        </div>
        
        {/* Top Creators Column */}
        <div className="w-full md:w-[300px] lg:w-[350px] flex-shrink-0 mt-6 md:mt-0">
          <TopCreators />
        </div>
      </div>
    </div>
  );
}