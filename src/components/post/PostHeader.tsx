import { Avatar } from '../ui/Avatar/Avatar';

interface PostHeaderProps {
  author: string;
  avatar: string;
  timestamp: string;
}

export function PostHeader({ author, avatar, timestamp }: PostHeaderProps) {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="flex-shrink-0">
        <Avatar src={avatar} alt={author} />
      </div>
      <div>
        <h3 className="font-display text-body-base font-medium text-gray-900">{author}</h3>
        <p className="text-label text-gray-500 uppercase">{timestamp}</p>
      </div>
    </div>
  );
}