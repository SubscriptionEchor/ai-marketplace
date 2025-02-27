interface PostContentProps {
  title: string;
  content: string;
  images?: string[];
}

export function PostContent({ title, content, images }: PostContentProps) {
  return (
    <div className="mb-4">
      <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{content}</p>
      {images && images.length > 0 && (
        <div className={`grid gap-1 mt-4 ${
          images.length === 1 ? 'grid-cols-1' :
          images.length === 2 ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {images.slice(0, 3).map((image, index) => (
            <div key={index} className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}