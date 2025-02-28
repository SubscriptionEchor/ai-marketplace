interface PostContentProps {
  title: string;
  content: string;
  images?: string[];
}

export function PostContent({ title, content, images }: PostContentProps) {
  return (
    <div>
      <h4 className="font-display text-display-sm text-gray-900 mb-3 hover:text-primary cursor-pointer transition-colors">
        {title}
      </h4>
      <p className="text-body-base text-gray-600 leading-relaxed">{content}</p>
      {images && images.length > 0 && (
        <div className={`grid gap-2 mt-6 ${
          images.length === 1 ? 'grid-cols-1' :
          images.length === 2 ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {images.slice(0, 3).map((image, index) => (
            <div 
              key={index} 
              className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}