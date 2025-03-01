import { useState, useEffect } from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { Pagination } from '@/components/ui';

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
                        onClick={() => {
                          // Determine which edit page to navigate to based on item type
                          let editPath = '';
                          switch (item.type) {
                            case 'AI Model':
                              editPath = `/dashboard/upload/model`;
                              break;
                            case 'Dataset':
                              editPath = `/dashboard/upload/dataset`;
                              break;
                            case 'Infrastructure':
                              editPath = `/dashboard/upload/infra`;
                              break;
                          }
                          navigate(editPath, {
                          state: { 
                            editMode: true,
                            modelData: item
                          }
                        })}}
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
          {totalPages > 1 && MOCK_DATA.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={MOCK_DATA.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
    </div>
  );
}