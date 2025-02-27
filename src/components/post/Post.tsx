import { Card } from '../ui/Card/Card';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostActions } from './PostActions';
import { MarketplaceItem } from '@/types/marketplace';

interface PostProps {
  item: MarketplaceItem;
}

export function Post({ item }: PostProps) {
  return (
    <Card>
      <PostHeader
        author={item.author}
        avatar={item.avatar}
        timestamp={item.timestamp}
      />
      <PostContent
        title={item.title}
        content={item.content}
        images={item.images}
      />
      <PostActions
        likes={item.likes}
        downloads={item.downloads}
      />
    </Card>
  );
}