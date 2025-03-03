import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModelCard, SearchInput, EmptyState, FilterButton, Pagination, MobileFilterDrawer, ModelCardSkeleton, Skeleton } from '@/components/ui';
import { useFilteredItems, useLikes } from '@/hooks';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 12;

const CATEGORY_ICONS = {
  'Multimodal': {
    icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    taskIcons: {
      'Audio-Text-to-Text': 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
      'Image-Text-to-Text': 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
      'Visual Question Answering': 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z',
      'Document Question Answering': 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
      'Video-Text-to-Text': 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z',
      'Visual Document Retrieval': 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      'Any-to-Any': 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m-11.991 0v-4.992m0 0h4.992'
    }
  },
  'Computer Vision': {
    icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  'Natural Language Processing': {
    icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  'Audio': {
    icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
    color: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  'Tabular': {
    icon: 'M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5c-.621 0-1.125-.504-1.125-1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125M10.875 16.5h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M18.375 16.5c.621 0 1.125.504 1.125 1.125M3.375 5.625c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5A1.125 1.125 0 013.375 7.125v-1.5zm17.25 0c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125v-1.5zm-17.25 12c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5zm17.25 0c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125v-1.5z',
    color: 'bg-gradient-to-br from-indigo-500 to-purple-500'
  },
  'Reinforcement Learning': {
    icon: 'M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59',
    color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
  },
  'Other': {
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    color: 'bg-gradient-to-br from-gray-500 to-gray-600'
  }
};

const TASK_CATEGORIES = {
  'Multimodal': [
    'Audio-Text-to-Text',
    'Image-Text-to-Text',
    'Visual Question Answering',
    'Document Question Answering',
    'Video-Text-to-Text',
    'Visual Document Retrieval',
    'Any-to-Any'
  ],
  'Computer Vision': [
    'Depth Estimation',
    'Image Classification',
    'Object Detection',
    'Image Segmentation',
    'Text-to-Image',
    'Image-to-Text',
    'Image-to-Image',
    'Image-to-Video',
    'Unconditional Image Generation',
    'Video Classification',
    'Text-to-Video',
    'Zero-Shot Image Classification',
    'Mask Generation',
    'Zero-Shot Object Detection',
    'Text-to-3D',
    'Image-to-3D',
    'Image Feature Extraction',
    'Keypoint Detection'
  ],
  'Natural Language Processing': [
    'Text Classification',
    'Token Classification',
    'Table Question Answering',
    'Question Answering',
    'Zero-Shot Classification',
    'Translation',
    'Summarization',
    'Feature Extraction',
    'Text Generation',
    'Text2Text Generation',
    'Fill-Mask',
    'Sentence Similarity'
  ],
  'Audio': [
    'Text-to-Speech',
    'Text-to-Audio',
    'Automatic Speech Recognition',
    'Audio-to-Audio',
    'Audio Classification',
    'Voice Activity Detection'
  ],
  'Tabular': [
    'Tabular Classification',
    'Tabular Regression',
    'Time Series Forecasting'
  ],
  'Reinforcement Learning': [
    'Reinforcement Learning',
    'Robotics'
  ],
  'Other': [
    'Graph Machine Learning'
  ]
};

export function ModelsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { likedItems, likeCounts, handleLike } = useLikes();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const MODELS = [
    {
      id: 'gpt-4',
      creator: {
        name: 'OpenAI',
        avatar: 'O'
      },
      type: 'model',
      image: 'https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png',
      name: 'GPT-4',
      categories: ['Natural Language Processing', 'Text Generation'],
      description: 'State-of-the-art language model for text generation and understanding.',
      updatedAt: '1 day ago',
      downloads: '2.5M',
      likes: '450K'
    },
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `model-${i + 2}`,
      creator: {
        name: `Creator ${i + 2}`,
        avatar: `C${i + 2}`
      },
      type: 'model',
      image: 'https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png',
      name: `AI Model ${i + 2}`,
      categories: Object.keys(TASK_CATEGORIES).slice(0, Math.floor(Math.random() * 2) + 2),
      description: 'Advanced AI model for various tasks and applications.',
      updatedAt: `${Math.floor(Math.random() * 30) + 1} days ago`,
      downloads: `${(Math.random() * 1000000).toFixed(0)}`,
      likes: `${(Math.random() * 10000).toFixed(0)}`
    }))
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const {
    filteredItems: paginatedModels,
    totalItems,
    currentPage,
    totalPages,
    selectedFilters,
    clearFilters,
    setCurrentPage,
    handleFilterSelect
  } = useFilteredItems(MODELS, 12, categoryFromUrl || undefined);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return TASK_CATEGORIES;

    const query = searchQuery.toLowerCase();
    const filtered: typeof TASK_CATEGORIES = {
      'Multimodal': [],
      'Computer Vision': [],
      'Natural Language Processing': [],
      'Audio': [],
      'Tabular': [],
      'Reinforcement Learning': [],
      'Other': []
    };

    Object.entries(TASK_CATEGORIES).forEach(([category, tasks]) => {
      const matchingTasks = tasks.filter(task => 
        task.toLowerCase().includes(query)
      );

      if (matchingTasks.length > 0) {
        filtered[category as keyof typeof TASK_CATEGORIES] = matchingTasks;
      }
    });

    return filtered;
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-112px)] pt-6 pb-16 lg:px-8">
      {/* Mobile filter dialog */}
      <MobileFilterDrawer isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search tasks..."
              onClear={() => setSearchQuery('')}
            />
          </div>

          {Object.entries(filteredCategories).map(([category, tasks]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
              </div>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <FilterButton
                    key={task}
                    label={task}
                    icon={category === 'Multimodal' && CATEGORY_ICONS.Multimodal.taskIcons[task as keyof typeof CATEGORY_ICONS['Multimodal']['taskIcons']] || CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS].icon}
                    color={CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS].color}
                    isSelected={selectedFilters.has(task)}
                    onSelect={() => handleFilterSelect(task)}
                    onRemove={() => handleFilterSelect(task)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </MobileFilterDrawer>

      <div className="lg:col-span-3 h-[calc(100vh-112px)] overflow-y-auto pb-16 scrollbar-hide">
        {/* Mobile filter button */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          {isLoading ? (
            <Skeleton className="w-24 h-10 rounded-md" />
          ) : (
            <>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
              {selectedFilters.size > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0284a5] text-white">
                  {selectedFilters.size} selected
                </span>
              )}
            </>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-0">
            {Array.from({ length: 6 }).map((_, index) => (
              <ModelCardSkeleton key={index} />
            ))}
          </div>
        ) : paginatedModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-0">
            {paginatedModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isLiked={likedItems[model.id]}
                likeCount={likeCounts[model.id]}
                onLike={() => handleLike(model.id, model.likes)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={selectedFilters.size > 0 ? "No models found" : "No models available yet"}
            description={selectedFilters.size > 0 
              ? "Try adjusting your filters or search terms"
              : "Be the first to add an AI model to the marketplace"}
            icon="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            action={{
              label: "Add Model",
              onClick: () => {/* Add model logic */}
            }}
          />
        )}
        
        {/* Pagination */}
        {totalPages > 1 && totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            className="mt-8"
          />
        )}
      </div>
      
      {/* Right Column */}
      <div className="hidden lg:block space-y-6 h-[calc(100vh-112px)] overflow-y-auto pr-4 -mr-4 pb-16 scrollbar-hide w-[280px]">
        {/* Search Input */}
        {isLoading ? (
          <>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-20 h-6" />
              </div>
              <Skeleton className="w-full h-12 rounded-lg" />
            </div>
            {/* Skeleton filters */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6">
                <div className="mb-4">
                  <Skeleton className="w-32 h-6" />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-10 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {selectedFilters.size > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#0284a5] hover:text-[#026d8a] flex items-center gap-1"
                  >
                    <span>Clear filters</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search tasks..."
                onClear={() => setSearchQuery('')}
              />
            </div>

            {Object.entries(filteredCategories).map(([category, tasks]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <FilterButton
                      key={task}
                      label={task}
                      icon={category === 'Multimodal' && CATEGORY_ICONS.Multimodal.taskIcons[task as keyof typeof CATEGORY_ICONS['Multimodal']['taskIcons']] || CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS].icon}
                      color={CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS].color}
                      isSelected={selectedFilters.has(task)}
                      onSelect={() => handleFilterSelect(task)}
                      onRemove={() => handleFilterSelect(task)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}