import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EmptyState, Skeleton } from '@/components/ui';

const ITEMS_PER_PAGE = 5;

interface PurchasedAsset {
  id: string;
  type: 'model' | 'dataset' | 'infra';
  name: string;
  description: string;
  purchaseDate: string;
  creator: {
    name: string;
    avatar: string;
  };
  image: string;
  status: 'active' | 'expired' | 'pending';
  accessType: 'download' | 'api' | 'compute';
  documentation?: string;
  files?: {
    name: string;
    size: string;
    format: string;
  }[];
  apiEndpoint?: string;
  computeResources?: {
    type: string;
    status: string;
    url?: string;
  };
}

// Mock data - in a real app, this would come from your backend
const MOCK_PURCHASES: PurchasedAsset[] = [
  {
    id: 'asset-1',
    type: 'model',
    name: 'Advanced NLP Model',
    description:
      'State-of-the-art natural language processing model for text generation and analysis.',
    purchaseDate: '2024-01-15',
    creator: {
      name: 'AI Research Labs',
      avatar: 'A'
    },
    image:
      'https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png',
    status: 'active',
    accessType: 'api',
    documentation: 'https://docs.example.com/nlp-model',
    apiEndpoint: 'https://api.example.com/v1/nlp',
    files: [
      {
        name: 'model.pt',
        size: '2.3 GB',
        format: 'PyTorch'
      },
      {
        name: 'config.json',
        size: '15 KB',
        format: 'JSON'
      }
    ]
  },
  {
    id: 'asset-2',
    type: 'dataset',
    name: 'Large Scale Image Dataset',
    description:
      'A comprehensive dataset of labeled images for computer vision tasks.',
    purchaseDate: '2024-01-10',
    creator: {
      name: 'Vision Data Co',
      avatar: 'V'
    },
    image:
      'https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png',
    status: 'active',
    accessType: 'download',
    documentation: 'https://docs.example.com/image-dataset',
    files: [
      {
        name: 'images.zip',
        size: '50 GB',
        format: 'ZIP'
      },
      {
        name: 'metadata.csv',
        size: '500 MB',
        format: 'CSV'
      },
      {
        name: 'labels.json',
        size: '100 MB',
        format: 'JSON'
      }
    ]
  },
  {
    id: 'asset-3',
    type: 'infra',
    name: 'GPU Compute Cluster',
    description: 'High-performance GPU infrastructure for AI workloads.',
    purchaseDate: '2024-01-05',
    creator: {
      name: 'Cloud Compute Inc',
      avatar: 'C'
    },
    image:
      'https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png',
    status: 'active',
    accessType: 'compute',
    documentation: 'https://docs.example.com/gpu-cluster',
    computeResources: {
      type: 'GPU Cluster',
      status: 'Running',
      url: 'https://console.example.com/gpu-cluster'
    }
  }
];

const STATUS_STYLES = {
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800'
};

export function DownloadsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate pagination
  const totalItems = MOCK_PURCHASES.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPurchases = MOCK_PURCHASES.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDownload = (file: { name: string; size: string; format: string }) => {
    // In a real app, this would trigger the actual file download
    console.log(`Downloading ${file.name}`);
  };

  const handleAccessCompute = (asset: PurchasedAsset) => {
    if (asset.computeResources?.url) {
      window.open(asset.computeResources.url, '_blank');
    }
  };
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (MOCK_PURCHASES.length === 0) {
    return (
      <EmptyState
        title="No purchases yet"
        description="Start exploring the marketplace to find AI models, datasets, and infrastructure services."
        icon="M3 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        action={{
          label: 'Browse Marketplace',
          href: '/dashboard/all'
        }}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-112px)] h-full overflow-y-auto scrollbar-hide">
      <div className="max-w-6xl mx-auto">
        {/* Content */}
        <div className="bg-white rounded-xl border border-[#e1e3e5] p-6 mb-8 mx-4 md:mx-6 lg:mx-8 mt-8">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            {isLoading ? (
              <div>
                <Skeleton className="w-48 h-8 mb-2" />
                <Skeleton className="w-96 h-4" />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Downloads</h1>
                <p className="text-sm text-gray-500">
                  Access your purchased AI models, datasets, and infrastructure services
                </p>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <Skeleton className="w-16 h-8 mb-1" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="text-center">
                  <Skeleton className="w-16 h-8 mb-1" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
                  <div className="text-sm text-gray-500">Total Assets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {MOCK_PURCHASES.filter((p) => p.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transactions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 lg:px-8 mb-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-[#e1e3e5] overflow-hidden flex flex-col"
              >
                <div className="p-6 flex flex-col gap-4">
                  {/* Asset Image */}
                  <div className="w-full h-48 sm:h-32 rounded-lg overflow-hidden">
                    <Skeleton className="w-full h-full" />
                  </div>

                  {/* Title and Labels */}
                  <div>
                    <Skeleton className="w-48 h-6 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="w-24 h-6 rounded-full" />
                      <Skeleton className="w-32 h-6 rounded-full" />
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-32 h-4" />
                  </div>

                  {/* Description */}
                  <div>
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-3/4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            paginatedPurchases.map((asset) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-[#e1e3e5] overflow-hidden hover:border-[#0284a5] hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <div className="p-6 flex flex-col gap-4">
                  {/* Asset Image */}
                  <div className="w-full h-48 sm:h-32 rounded-lg overflow-hidden">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title and Labels */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {asset.name}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[asset.status]}`}
                      >
                        {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                      {asset.creator.avatar}
                    </div>
                    <span className="text-sm text-gray-500">{asset.creator.name}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      Purchased {new Date(asset.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-600 mb-4">{asset.description}</p>
                  </div>

                  {/* Access Options */}
                  <div className="space-y-4">
                    {asset.accessType === 'download' && asset.files && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                          Available Files
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {asset.files.map((file) => (
                            <button
                              key={file.name}
                              onClick={() => handleDownload(file)}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#0284a5]/5 hover:border-[#0284a5] border border-transparent transition-all duration-200 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-gray-500 group-hover:text-[#0284a5] transition-colors"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {file.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {file.size} • {file.format}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {asset.accessType === 'api' && asset.apiEndpoint && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">API Access</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 font-mono text-sm mb-2">
                            <span className="text-gray-500">Endpoint:</span>
                            <code className="text-gray-900">{asset.apiEndpoint}</code>
                            <button
                              onClick={() =>
                                asset.apiEndpoint && navigator.clipboard.writeText(asset.apiEndpoint)
                              }
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">
                            Use this endpoint to make API calls to the model. Check the documentation for authentication and request formats.
                          </p>
                        </div>
                      </div>
                    )}

                    {asset.accessType === 'compute' && asset.computeResources && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Compute Resources</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {asset.computeResources.type}
                              </div>
                              <div className="text-xs text-gray-500">
                                Status: {asset.computeResources.status}
                              </div>
                            </div>
                            <button
                              onClick={() => handleAccessCompute(asset)}
                              className="px-4 py-2 bg-[#0284a5] text-white text-sm font-medium rounded-lg hover:bg-[#026d8a] transition-colors transform hover:translate-y-[-1px] active:translate-y-[1px]"
                            >
                              Access Console
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {asset.documentation && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500 whitespace-nowrap">
                          Need help getting started?
                        </div>
                        <button
                          className="inline-flex items-center gap-1 text-sm text-[#0284a5] hover:text-[#026d8a] whitespace-nowrap"
                        >
                          <span>View Documentation</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between bg-white rounded-xl border border-[#e1e3e5] px-6 py-4 shadow-sm">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}
                </span>{' '}
                of <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-[#0284a5] border-[#0284a5] text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}