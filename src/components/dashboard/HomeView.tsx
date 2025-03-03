import { useState, useCallback } from 'react';
import { LikeButton, TrendingItemSkeleton, SetupGuideSkeleton, Skeleton } from '@/components/ui';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomeView() {
  const [showSetupGuide, setShowSetupGuide] = useState(true);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = useCallback((itemId: string, _currentLikes?: string) => {
    setLikedItems(prev => {
      const wasLiked = prev[itemId];
      const newLikedItems = { ...prev, [itemId]: !wasLiked };
      return newLikedItems;
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-112px)] pt-6 pb-16 px-4 md:px-6 lg:px-8">
      {/* Main Content Column */}
      <div className="lg:col-span-2 h-[calc(100vh-112px)] overflow-y-auto pb-16 scrollbar-hide">
        <div>
          {/* Trending Section */}
          <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Trending</h2>
              <span className="text-sm text-gray-500">last 7 days</span>
            </div>
          </div>
          
          {/* Trending Items */}
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <TrendingItemSkeleton key={index} />
              ))
            ) : (
              <>
              {[
              { name: 'perplexity-ai/r1-1776', type: 'Text Generation', downloads: '14.8k', likes: '1.87k', color: 'from-purple-500 to-pink-500', letter: 'P' },
              { name: 'perplexity-ai/r1-1776-2', type: 'Text Generation', downloads: '14.8k', likes: '1.87k', color: 'from-purple-500 to-pink-500', letter: 'P' },
              { name: 'deepseek-ai/DeepSeek-R1', type: 'Text Generation', downloads: '4.64M', likes: '10.4k', color: 'from-blue-500 to-cyan-500', letter: 'D' },
              { name: 'Wan-AI/Wan2.1-T2V-14B', type: 'Text-to-Video', downloads: '3.7k', likes: '495', color: 'from-green-500 to-emerald-500', letter: 'W' },
              { name: 'llama-lab/llama-2-70b-chat', type: 'Chat Model', downloads: '2.8M', likes: '8.2k', color: 'from-orange-500 to-red-500', letter: 'L' },
              { name: 'stable-diffusion/sdxl-turbo', type: 'Image Generation', downloads: '1.2M', likes: '5.6k', color: 'from-indigo-500 to-purple-500', letter: 'S' },
              { name: 'claude-ai/claude-3-opus', type: 'Chat Model', downloads: '756k', likes: '2.9k', color: 'from-yellow-500 to-orange-500', letter: 'C' },
              { name: 'gemini-pro/vision-pro', type: 'Vision Model', downloads: '680k', likes: '2.4k', color: 'from-blue-600 to-indigo-600', letter: 'G' },
              { name: 'anthropic/claude-instant', type: 'Chat Model', downloads: '520k', likes: '1.8k', color: 'from-purple-600 to-pink-600', letter: 'A' },
              { name: 'meta-ai/llama-3-70b', type: 'Language Model', downloads: '450k', likes: '1.6k', color: 'from-green-600 to-teal-600', letter: 'M' },
              { name: 'stability-ai/sdxl-2.0', type: 'Image Generation', downloads: '380k', likes: '1.4k', color: 'from-red-600 to-pink-600', letter: 'S' },
              { name: 'cohere/command-r', type: 'Text Generation', downloads: '320k', likes: '1.2k', color: 'from-yellow-600 to-red-600', letter: 'C' },
              { name: 'openai/gpt-4-vision', type: 'Vision Model', downloads: '290k', likes: '1.1k', color: 'from-green-500 to-emerald-500', letter: 'O' },
              { name: 'google/palm-2', type: 'Language Model', downloads: '260k', likes: '980', color: 'from-blue-500 to-cyan-500', letter: 'G' },
              { name: 'nvidia/nerf-studio', type: '3D Generation', downloads: '230k', likes: '860', color: 'from-green-600 to-emerald-600', letter: 'N' },
              { name: 'adobe/firefly-pro', type: 'Image Generation', downloads: '210k', likes: '790', color: 'from-red-500 to-orange-500', letter: 'A' },
              { name: 'runwayml/gen-2', type: 'Video Generation', downloads: '190k', likes: '710', color: 'from-purple-500 to-indigo-500', letter: 'R' }
            ].map((option, index) => (
              <div
                key={index}
                onClick={() => navigate(`/dashboard/model/${option.name.toLowerCase().replace(/\//g, '-')}`)}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer bg-white shadow-sm border border-[#e1e3e5]"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-8 h-8 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center text-white font-medium`}>
                    {option.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {option.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{option.type}</span>
                      <span>•</span>
                      <span>Updated 2 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 w-full sm:w-auto justify-between mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {option.downloads}
                  </div>
                  <LikeButton
                    className="like-button"
                    isLiked={likedItems[option.name]}
                    likes={option.likes}
                    onLike={() => handleLike(option.name)}
                  />
                </div>
              </div>
            ))}

            {[
              { name: 'midjourney/v6', type: 'Image Generation', downloads: '175k', likes: '650', color: 'from-blue-500 to-purple-500', letter: 'M' },
              { name: 'inflection/pi-2', type: 'Chat Model', downloads: '160k', likes: '600', color: 'from-teal-500 to-cyan-500', letter: 'I' },
              { name: 'meta/musicgen', type: 'Audio Generation', downloads: '145k', likes: '540', color: 'from-indigo-500 to-blue-500', letter: 'M' },
              { name: 'stability/stable-audio', type: 'Audio Generation', downloads: '130k', likes: '490', color: 'from-orange-500 to-yellow-500', letter: 'S' },
              { name: 'google/imagen-2', type: 'Image Generation', downloads: '120k', likes: '450', color: 'from-cyan-500 to-blue-500', letter: 'G' },
              { name: 'anthropic/claude-3-sonnet', type: 'Chat Model', downloads: '110k', likes: '410', color: 'from-violet-500 to-purple-500', letter: 'A' },
              { name: 'deepmind/alphafold-3', type: 'Protein Folding', downloads: '100k', likes: '375', color: 'from-emerald-500 to-green-500', letter: 'D' },
              { name: 'meta/audiocraft', type: 'Audio Generation', downloads: '90k', likes: '340', color: 'from-pink-500 to-rose-500', letter: 'M' }
            ].map((option, index) => (
              <div
                key={index}
                onClick={() => navigate(`/dashboard/model/${option.name.toLowerCase().replace(/\//g, '-')}`)}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer bg-white shadow-sm border border-[#e1e3e5]"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-8 h-8 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center text-white font-medium`}>
                    {option.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {option.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{option.type}</span>
                      <span>•</span>
                      <span>Updated 2 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 w-full sm:w-auto justify-between mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {option.downloads}
                  </div>
                  <LikeButton
                    className="like-button"
                    isLiked={likedItems[option.name]}
                    likes={option.likes}
                    onLike={() => handleLike(option.name)}
                  />
                </div>
              </div>
            ))}

            {/* Additional Models (8-25) */}
            <div 
              onClick={() => navigate('/dashboard/model/gemini-pro-vision-pro')}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer bg-white shadow-sm border border-[#e1e3e5]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-medium">G</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">gemini-pro/vision-pro</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Vision Model</span>
                    <span>•</span>
                    <span>Updated 2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  680k
                </div>
                <LikeButton
                  isLiked={likedItems['gemini-pro/vision-pro']}
                  likes="2.4k"
                  onLike={() => handleLike('gemini-pro/vision-pro')}
                />
              </div>
            </div>
            </>
            )}
          </div>
        </div>
        </div>
      </div>
      
      {/* Setup Guide Column */}
      <div className="space-y-6 h-[calc(100vh-112px)] overflow-y-auto pr-4 -mr-4 pb-16 scrollbar-hide">
        {isLoading ? (
          <>
            <SetupGuideSkeleton />
            <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6 space-y-4">
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-full h-16 rounded-lg" />
              <Skeleton className="w-full h-16 rounded-lg" />
              <Skeleton className="w-full h-16 rounded-lg" />
            </div> 
          </>
        ) : (
          <>
          {showSetupGuide && (
          <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Setup guide</h2>
                  <p className="text-sm text-gray-500">0 / 3 completed</p>
                </div>
                <button 
                  onClick={() => setShowSetupGuide(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Connect Wallet */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Connect XELL wallet</h3>
                    <p className="mt-1 text-sm text-gray-500">Connect your wallet to start using the marketplace</p>
                    <button className="mt-2 text-sm text-[#0284a5] hover:text-[#026d8a]">
                      Connect wallet
                    </button>
                  </div>
                </div>

                {/* Add Product */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Add a product</h3>
                    <p className="mt-1 text-sm text-gray-500">Add your first AI model or dataset</p>
                    <button className="mt-2 text-sm text-[#0284a5] hover:text-[#026d8a]">
                      Add product
                    </button>
                  </div>
                </div>

                {/* Make Sales */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Make 10 sales to reach level 2</h3>
                    <p className="mt-1 text-sm text-gray-500">All users start at level 1</p>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-[#0284a5] h-1.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">0 of 10 sales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Best Practices and Guides */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
          <div className="space-y-4">
            <div className="block p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
              <h3 className="text-sm font-medium text-gray-900">Seller Guide</h3>
              <p className="mt-1 text-sm text-gray-500">Learn how to effectively sell your AI models</p>
            </div>
            <div className="block p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
              <h3 className="text-sm font-medium text-gray-900">Buyer Guide</h3>
              <p className="mt-1 text-sm text-gray-500">Tips for finding and evaluating AI models</p>
            </div>
            <div className="block p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
              <h3 className="text-sm font-medium text-gray-900">Best Practices</h3>
              <p className="mt-1 text-sm text-gray-500">Recommended practices for the marketplace</p>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}