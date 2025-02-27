import { IconButton } from '../ui/Button/IconButton';
import { LikeButton } from './LikeButton';

interface PostActionsProps {
  likes: number;
  downloads: number;
}

export function PostActions({ likes, downloads }: PostActionsProps) {
  return (
    <div className="flex items-center space-x-4">
      <LikeButton initialLikes={likes} />
      
      <IconButton
        icon={
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        }
        label={downloads.toString()}
      />
    </div>
  );
}