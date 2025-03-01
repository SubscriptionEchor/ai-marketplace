import { useState, useEffect } from 'react';
import { formatNumber } from '@/utils/formatNumber';

const ITEMS_PER_PAGE = 15;

interface ProviderStats {
  totalAssets: number;
  totalPurchases: number;
  totalEarnings: number;
}

const MOCK_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: `model-${i + 1}`,
  type: ['AI Model', 'Dataset', 'Infrastructure'][Math.floor(Math.random() * 3)],
  name: [
    'Advanced NLP Model',
    'Image Classifier Pro',
    'Speech Recognition Engine',
    'Object Detection System',
    'Text Generation Model'
  ][Math.floor(Math.random() * 5)] + ` ${i + 1}`,
  category: [
    'Natural Language Processing',
    'Computer Vision',
    'Audio',
    'Multimodal',
    'Reinforcement Learning'
  ][Math.floor(Math.random() * 5)],
  status: ['Active', 'Pending Review', 'Inactive'][Math.floor(Math.random() * 3)],
  downloads: `${Math.floor(Math.random() * 10000)}`,
  earnings: `$${(Math.random() * 1000).toFixed(2)}`,
  updatedAt: `${Math.floor(Math.random() * 30) + 1} days ago`
}));

const INITIAL_DATA = [
  {
    id: 'model-1',
    type: 'AI Model',
    name: 'Advanced NLP Model',
    category: 'Natural Language Processing',
    status: 'Active',
    downloads: '1.2k',
    earnings: '$120.00',
    updatedAt: '2 days ago'
  },
  {
    id: 'model-2',
    type: 'AI Model',
    name: 'Image Classifier Pro',
    category: 'Computer Vision',
    status: 'Active',
    downloads: '3.4k',
    earnings: '$340.00',
    updatedAt: '1 week ago'
  },
  {
    id: 'model-3',
    type: 'AI Model',
    name: 'Speech Recognition Engine',
    category: 'Audio',
    status: 'Active',
    downloads: '2.1k',
    earnings: '$210.00',
    updatedAt: '3 days ago'
  }
];
import { useNavigate } from 'react-router-dom';

export function MyUploadsView() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState<ProviderStats>({
    totalAssets: 0,
    totalPurchases: 0,
    totalEarnings: 0
  });

  const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = MOCK_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    // Load stats from localStorage
    const models = JSON.parse(localStorage.getItem('user_models') || '[]');
    const datasets = JSON.parse(localStorage.getItem('user_uploads_datasets') || '[]');
    const infra = localStorage.getItem('user_uploads_infra') === 'true' ? 1 : 0;

    setStats({
      totalAssets: models.length + datasets.length + infra,
      totalPurchases: models.reduce((acc: number, model: any) => acc + parseInt(model.downloads || '0'), 0),
      totalEarnings: models.reduce((acc: number, model: any) => acc + (parseInt(model.downloads || '0') * 0.1), 0) // Assuming $0.10 per download
    });
  }, []);

  return (
    <div className="px-4 md:px-6 lg:px-8 h-[calc(100vh-112px)] pt-6 pb-16 overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Uploads</h1>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Assets:</span>
            <span className="text-sm font-semibold text-gray-900">{stats.totalAssets}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Purchases:</span>
            <span className="text-sm font-semibold text-gray-900">{formatNumber(stats.totalPurchases.toString())}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Earnings:</span>
            <span className="text-sm font-semibold text-gray-900">${formatNumber(stats.totalEarnings.toString())}</span>
          </div>
        </div>
      </div>

        {/* Table Header */}
        <div className="bg-white rounded-xl border border-[#e1e3e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.downloads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.earnings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.updatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => navigate(`/dashboard/upload/model?edit=${item.id}`, { 
                          state: { 
                            editMode: true,
                            modelData: item
                          }
                        })}
                        className="text-[#0284a5] hover:text-[#026d8a]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min((currentPage) * ITEMS_PER_PAGE, MOCK_DATA.length)}
                    </span>{' '}
                    of <span className="font-medium">{MOCK_DATA.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
                      onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}