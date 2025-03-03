import { useNavigate, useLocation } from 'react-router-dom';
import { IPFSService } from '@/services/ipfs';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import confetti from 'canvas-confetti';
import { Breadcrumbs } from '@/components/ui';
import { Modal } from '@/components/ui';

const STORAGE_KEY = 'user_uploads_datasets';

export const TABS = [
  { id: 'details', label: 'Details' },
  { id: 'metadata', label: 'Metadata' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'review', label: 'Review' }
] as const;

interface DatasetFormData {
  name: string;
  description: string;
  category: string;
  format: string;
  license: string;
  pricing: {
    model: string;
    price: string;
    currency: string;
  };
  metadata: {
    size: string;
    rows: string;
    columns: string;
    schema: string;
  };
  files: File[];
}

export function DatasetUploadView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const currentTab = location.pathname.includes('metadata') ? 'metadata'
    : location.pathname.includes('pricing') ? 'pricing'
    : location.pathname.includes('review') ? 'review'
    : 'details';

  const [formData, setFormData] = useState<DatasetFormData>({
    name: '',
    description: '',
    category: '',
    format: '',
    license: '',
    pricing: {
      model: '',
      price: '',
      currency: 'USD'
    },
    metadata: {
      size: '',
      rows: '',
      columns: '',
      schema: ''
    },
    files: []
  });
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData(prev => ({
        ...prev,
        files: Array.from(event.target.files || [])
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFormData(prev => ({
      ...prev,
      files: droppedFiles
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpload = useCallback(async () => {
    if (formData.files.length === 0) return;

    try {
      setUploading(true);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);
      
      await IPFSService.uploadFiles(formData.files);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Mark that user has uploaded a dataset
      localStorage.setItem(STORAGE_KEY, 'true');

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Navigate to my uploads view after successful upload
      setTimeout(() => {
        navigate('/dashboard/my-uploads');
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  }, [formData, navigate]);


  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Breadcrumbs
          items={[
            { label: 'Choose Type', href: '/dashboard/upload' }, 
            { label: 'Details', href: '/dashboard/upload/dataset' },
            { label: 'Metadata', href: '/dashboard/upload/dataset/metadata' },
            { label: 'Pricing', href: '/dashboard/upload/dataset/pricing' },
            { label: 'Review' }
          ]}
          showSteps={true}
          currentStep={TABS.findIndex(tab => tab.id === currentTab) + 1}
          totalSteps={TABS.length}
        />
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Dataset</h1>
        <p className="text-lg text-gray-600">Share your dataset with the AI community</p>
      </div>
      
      <div className="bg-white rounded-xl border border-[#e1e3e5] p-8">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {currentTab === 'details' && (<>
            {/* Basic Information */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dataset Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
              placeholder="e.g., Common Voice Dataset"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
              placeholder="Describe your dataset's contents and potential use cases..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="tabular">Tabular</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <input
                type="text"
                name="format"
                value={formData.format}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
                placeholder="e.g., CSV, JSON, JSONL"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License
            </label>
            <select
              name="license"
              value={formData.license}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
            >
              <option value="">Select a license</option>
              <option value="MIT">MIT</option>
              <option value="Apache-2.0">Apache 2.0</option>
              <option value="GPL-3.0">GPL 3.0</option>
              <option value="CC-BY-4.0">Creative Commons BY 4.0</option>
              <option value="CC-BY-SA-4.0">Creative Commons BY-SA 4.0</option>
              <option value="CC0-1.0">Creative Commons Zero v1.0</option>
            </select>
          </div>

          {/* Dataset Files */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dataset Files
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                isDragging 
                  ? 'border-[#0284a5] bg-[#0284a5]/5' 
                  : formData.files.length > 0
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#0284a5] hover:text-[#026d8a] focus-within:outline-none"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">Any file up to 50MB</p>
              </div>
            </div>
          </div>
          </>)}

          {/* Selected Files */}
          {formData.files.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h3>
              <ul className="divide-y divide-gray-200">
                {formData.files.map((file, index) => (
                  <li key={index} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-900">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            files: prev.files.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Uploading to IPFS...</span>
                <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#0284a5] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {currentTab === 'metadata' && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dataset Size
                </label>
                <input
                  type="text"
                  name="metadata.size"
                  value={formData.metadata.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
                  placeholder="e.g., 1.2GB"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Rows
                </label>
                <input
                  type="text"
                  name="metadata.rows"
                  value={formData.metadata.rows}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
                  placeholder="e.g., 1000000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Columns
                </label>
                <input
                  type="text"
                  name="metadata.columns"
                  value={formData.metadata.columns}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
                  placeholder="e.g., 15"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schema Description
                </label>
                <textarea
                  name="metadata.schema"
                  value={formData.metadata.schema}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
                  placeholder="Describe your dataset's schema and column types..."
                />
              </div>
            </div>
          )}

          {currentTab === 'pricing' && (
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Choose Pricing Model
                </label>
                <div className="space-y-4">
                  {[
                    { id: 'free', label: 'Free', description: 'Make your dataset freely available' },
                    { id: 'one-time', label: 'One-Time Purchase', description: 'Set a fixed price for dataset access' },
                    { id: 'subscription', label: 'Subscription', description: 'Charge a recurring fee for access' }
                  ].map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleInputChange({ target: { name: 'pricing.model', value: option.id } } as any)}
                      className={`relative flex items-center p-4 cursor-pointer rounded-lg border-2 ${
                        formData.pricing.model === option.id
                          ? 'border-[#0284a5] bg-[#0284a5]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center h-5">
                        <input
                          type="radio"
                          checked={formData.pricing.model === option.id}
                          onChange={() => handleInputChange({ target: { name: 'pricing.model', value: option.id } } as any)}
                          className="h-4 w-4 text-[#0284a5] border-gray-300 focus:ring-[#0284a5]"
                        />
                      </div>
                      <div className="ml-4">
                        <label className="text-sm font-medium text-gray-900">
                          {option.label}
                        </label>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.pricing.model !== 'free' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Set Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="pricing.price"
                      value={formData.pricing.price}
                      onChange={handleInputChange}
                      className="focus:ring-[#0284a5] focus:border-[#0284a5] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder={formData.pricing.model === 'subscription' ? '9.99' : '49.99'}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        name="pricing.currency"
                        value={formData.pricing.currency}
                        onChange={handleInputChange}
                        className="focus:ring-[#0284a5] focus:border-[#0284a5] h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                      </select>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.pricing.model === 'subscription'
                      ? 'Monthly subscription fee'
                      : 'One-time purchase price'}
                  </p>
                </div>
              )}
            </div>
          )}

          {currentTab === 'review' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Review Dataset Details</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{formData.name || '—'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Category</label>
                      <p className="mt-1 text-sm text-gray-900">{formData.category || '—'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{formData.description || '—'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Files</label>
                    <ul className="mt-1 space-y-1">
                      {formData.files.map((file, index) => (
                        <li key={index} className="text-sm text-gray-900">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Dataset Metadata</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Size</label>
                      <p className="mt-1 text-sm text-gray-900">{formData.metadata.size || '—'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Rows</label>
                      <p className="mt-1 text-sm text-gray-900">{formData.metadata.rows || '—'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Columns</label>
                      <p className="mt-1 text-sm text-gray-900">{formData.metadata.columns || '—'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Format</label>
                      <p className="mt-1 text-sm text-gray-900">{formData.format || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Model</label>
                      <p className="mt-1 text-sm text-gray-900 capitalize">
                        {formData.pricing.model || 'Free'}
                      </p>
                    </div>
                    {formData.pricing.model !== 'free' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Price</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {formData.pricing.currency} {formData.pricing.price}
                          {formData.pricing.model === 'subscription' ? '/month' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                if (formData.name || formData.description || formData.files.length > 0) {
                  setShowConfirmModal(true);
                } else {
                  navigate('/dashboard/upload');
                }
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            {currentTab === 'review' ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/upload/dataset')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!formData.name || !formData.description || !formData.category || !formData.license || formData.files.length === 0 || uploading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0284a5] rounded-lg hover:bg-[#026d8a] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {uploading ? 'Uploading...' : 'Publish Dataset'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {currentTab !== 'details' && (
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard/upload/dataset')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    switch (currentTab) {
                      case 'details':
                        navigate('/dashboard/upload/dataset/metadata');
                        break;
                      case 'metadata':
                        navigate('/dashboard/upload/dataset/pricing');
                        break;
                      case 'pricing':
                        navigate('/dashboard/upload/dataset/review');
                        break;
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0284a5] rounded-lg hover:bg-[#026d8a]"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Confirm Navigation Modal */}
      <Modal
        show={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false); 
        }}
        title="Unsaved Changes"
      >
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            You have unsaved changes. Are you sure you want to leave? All changes will be lost.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setShowConfirmModal(false); 
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Stay
            </button>
            <button
              onClick={() => {
                setShowConfirmModal(false);
                navigate('/dashboard/upload');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Leave
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}