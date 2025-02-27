import { Post } from '@/components/post';
import { MarketplaceItem } from '@/types/marketplace';


const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 1,
    title: "Introducing our new AI Model for Image Generation",
    content: "We're excited to announce our latest breakthrough in AI image generation. This model can create photorealistic images from text descriptions with unprecedented accuracy.",
    timestamp: "2 HOURS AGO",
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    likes: 284,
    downloads: 56,
    creator: "Sarah Chen",
    description: "Advanced AI image generation model",
    price: {
      eth: 2.5,
      usd: 4250
    },
    images: [
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png",
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png"
    ]
  },
  {
    id: 2,
    title: "Weekly AI Research Roundup",
    content: "Here's a summary of the most important AI research papers published this week. We've seen significant advances in natural language processing and computer vision.",
    timestamp: "5 HOURS AGO",
    author: "David Kumar",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    likes: 142,
    downloads: 89,
    creator: "David Kumar",
    description: "Weekly AI research summary and analysis",
    price: {
      eth: 1.2,
      usd: 2040
    }
  },
  {
    id: 3,
    title: "Real-world Applications of Our Speech Recognition Model",
    content: "Check out these amazing examples of our speech recognition model in action. From medical transcription to automated customer service, the possibilities are endless.",
    timestamp: "8 HOURS AGO",
    author: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    likes: 98,
    downloads: 45,
    creator: "Emily Rodriguez",
    description: "Speech recognition model with high accuracy",
    price: {
      eth: 3.0,
      usd: 5100
    },
    images: [
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png"
    ]
  },
  {
    id: 4,
    title: "Who is the Patreon person?",
    content: "Who reads these comments nowadays? I feel like somebody should be answering our questions...",
    timestamp: "4 DAYS AGO AT 11:06 AM",
    author: "AwesomeHaley",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    likes: 1,
    downloads: 12,
    creator: "AwesomeHaley",
    description: "Community discussion and feedback",
    price: {
      eth: 0.1,
      usd: 170
    }
  },
  {
    id: 5,
    title: "Breakthrough in Neural Network Architecture",
    content: "Our team has developed a new neural network architecture that reduces training time by 60% while maintaining accuracy. Full paper and implementation details coming soon.",
    timestamp: "1 DAY AGO",
    author: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    likes: 445,
    downloads: 203,
    creator: "Alex Thompson",
    description: "Innovative neural network architecture",
    price: {
      eth: 4.5,
      usd: 7650
    },
    images: [
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png",
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png",
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png"
    ]
  },
  {
    id: 6,
    title: "Tips for Fine-tuning Language Models",
    content: "Here are some practical tips we've learned from fine-tuning large language models. These techniques can help improve performance while reducing computational costs.",
    timestamp: "2 DAYS AGO",
    author: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    likes: 267,
    downloads: 134,
    creator: "Maria Garcia",
    description: "Language model fine-tuning guide",
    price: {
      eth: 1.8,
      usd: 3060
    }
  },
  {
    id: 7,
    title: "Introducing Our New Dataset Collection",
    content: "We're releasing a new collection of curated datasets for computer vision tasks. These datasets have been carefully annotated and validated for high accuracy.",
    timestamp: "3 DAYS AGO",
    author: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    likes: 189,
    downloads: 256,
    creator: "James Wilson",
    description: "Curated computer vision datasets",
    price: {
      eth: 2.2,
      usd: 3740
    },
    images: [
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png"
    ]
  },
  {
    id: 8,
    title: "AI Ethics Guidelines Update",
    content: "We've updated our AI ethics guidelines to better address recent developments in the field. These guidelines help ensure responsible AI development and deployment.",
    timestamp: "3 DAYS AGO",
    author: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    likes: 312,
    downloads: 178,
    creator: "Lisa Chen",
    description: "Updated AI ethics guidelines",
    price: {
      eth: 0.8,
      usd: 1360
    }
  },
  {
    id: 9,
    title: "Optimizing Model Performance",
    content: "Learn how we optimized our latest model to achieve state-of-the-art performance while reducing inference time by 40%. Full technical details included.",
    timestamp: "4 DAYS AGO",
    author: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    likes: 234,
    downloads: 167,
    creator: "Michael Brown",
    description: "Model performance optimization techniques",
    price: {
      eth: 1.5,
      usd: 2550
    }
  },
  {
    id: 10,
    title: "Community Showcase: AI Art Generation",
    content: "Check out these amazing artworks created using our AI art generation model. The creativity of our community never ceases to amaze us!",
    timestamp: "5 DAYS AGO",
    author: "Sophie Taylor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    likes: 567,
    downloads: 289,
    creator: "Sophie Taylor",
    description: "Community AI art showcase",
    price: {
      eth: 1.0,
      usd: 1700
    },
    images: [
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png",
      "https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png"
    ]
  }
];

export function HomeView() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="space-y-4 mb-8">
        {MARKETPLACE_ITEMS.map((item) => (
          <Post key={item.id} item={item} />
        ))}
        <div className="text-center py-8 text-gray-500">
          No more posts available
        </div>
      </div>
    </div>
  );
}