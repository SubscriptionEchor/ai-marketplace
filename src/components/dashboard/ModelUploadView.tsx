import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Breadcrumbs } from '@/components/ui';

interface ModelThumbnail {
  file: File;
  preview: string;
}

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

const STORAGE_KEY = 'user_uploads_models';

interface ModelMetrics {
  accuracy: string;
  precision: string;
  recall: string;
  f1Score: string;
}

interface ModelFormData {
  name: string;
  description: string;
  mainCategory: string;
  category: string;
  tags: string[];
  metrics: ModelMetrics;
  files: File[];
}

export function ModelUploadView() {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<ModelThumbnail | null>(null);
  const [formData, setFormData] = useState<ModelFormData>({
    name: '',
    description: '',
    mainCategory: '',
    metrics: {
      accuracy: '',
      precision: '',
      recall: '',
      f1Score: ''
    },
    category: '',
    tags: [],
    files: []
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Cleanup thumbnail preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (thumbnail?.preview) {
        URL.revokeObjectURL(thumbnail.preview);
      }
    };
  }, [thumbnail]);

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Clean up previous preview URL
      if (thumbnail?.preview) {
        URL.revokeObjectURL(thumbnail.preview);
      }
      
      setThumbnail({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleThumbnailDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      // Clean up previous preview URL
      if (thumbnail?.preview) {
        URL.revokeObjectURL(thumbnail.preview);
      }
      
      setThumbnail({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFormData(prev => {
        // Calculate how many more files we can add
        const remainingSlots = 3 - prev.files.length;
        // Take only as many new files as we have slots for
        const filesToAdd = newFiles.slice(0, remainingSlots);
        
        return {
          ...prev,
          files: [...prev.files, ...filesToAdd]
        };
      });
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

    const newFiles = Array.from(e.dataTransfer.files);
    setFormData(prev => {
      // Calculate how many more files we can add
      const remainingSlots = 3 - prev.files.length;
      // Take only as many new files as we have slots for
      const filesToAdd = newFiles.slice(0, remainingSlots);
      
      return {
        ...prev,
        files: [...prev.files, ...filesToAdd]
      };
    });
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      navigate('/dashboard/upload/model/pricing');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Breadcrumbs
          items={[
            { label: 'Choose Type', href: '/dashboard/upload' },
            { label: 'Details', href: '/dashboard/upload/model' },
            { label: 'Pricing', href: '/dashboard/upload/model/pricing' },
            { label: 'Review' }
          ]}
          currentStep={2}
          totalSteps={4}
        />
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload AI Model</h1>
        <p className="text-lg text-gray-600">Share your AI model with the community</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e1e3e5] p-8">
        <div className="space-y-8">
          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Thumbnail
              <span className="ml-1 text-xs text-red-500">*Required</span>
            </label>
            <div 
              className={`relative flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                thumbnail
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => thumbnailInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={handleThumbnailDrop}
            >
              {thumbnail ? (
                <div className="relative group">
                  <img
                    src={thumbnail.preview}
                    alt="Thumbnail preview"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (thumbnail.preview) {
                          URL.revokeObjectURL(thumbnail.preview);
                        }
                        setThumbnail(null);
                      }}
                      className="p-2 bg-white rounded-full text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-[#0284a5] hover:text-[#026d8a]">
                      <span>Upload thumbnail</span>
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleThumbnailSelect}
                      />
                    </span>
                    <span className="text-gray-600">or drag and drop</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Recommended size: 800x800px</p>
                    <p className="text-xs text-gray-500">
                      Supported formats: PNG, JPG, JPEG, GIF, WEBP
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              A thumbnail image helps your model stand out in the marketplace
            </p>
          </div>

          {/* Model Files */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Files
              <span className="ml-1 text-xs text-gray-500">(Max 3 files)</span>
            </label>
            <div className="space-y-4">
              {/* Upload Area */}
              <div 
                className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                  isDragging 
                    ? 'border-[#0284a5] bg-[#0284a5]/5' 
                    : formData.files.length > 0
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={handleFileClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-3 text-center">
                  <svg
                    className={`mx-auto h-12 w-12 ${
                      formData.files.length > 0 ? 'text-green-500' : 'text-gray-400'
                    }`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-[#0284a5] hover:text-[#026d8a]">
                      <span>Upload files</span>
                      <input
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pt,.pth,.onnx,.pb,.h5,.tflite,.mlmodel,.pkl,.joblib,.json,.yaml,.yml,.txt,.zip"
                      />
                    </span>
                    <span className="text-gray-600">or drag and drop</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Max file size: 1GB</p>
                    <p className="text-xs text-gray-500">
                      Supported formats: .pt, .pth, .onnx, .pb, .h5, .tflite, .mlmodel, .pkl, .joblib, .json, .yaml, .yml, .txt, .zip
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Files */}
              {formData.files.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">
                      Selected Files ({formData.files.length}/3)
                    </h3>
                    {formData.files.length < 3 && (
                      <span className="text-xs text-[#0284a5]">
                        {3 - formData.files.length} slot{3 - formData.files.length !== 1 ? 's' : ''} remaining
                      </span>
                    )}
                  </div>
                  <ul>
                    {formData.files.map((file, index) => (
                      <li key={index} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center min-w-0">
                          <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-900 truncate font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({
                                ...prev,
                                files: prev.files.filter((_, i) => i !== index)
                              }));
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="sr-only">Remove file</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900"
              placeholder="e.g., my-awesome-model"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900"
              placeholder="Describe your model's capabilities and use cases..."
            />
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accuracy
                </label>
                <input
                  type="text"
                  name="metrics.accuracy"
                  value={formData.metrics.accuracy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900"
                  placeholder="e.g., 0.95"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precision
                </label>
                <input
                  type="text"
                  name="metrics.precision"
                  value={formData.metrics.precision}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900"
                  placeholder="e.g., 0.92"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recall
                </label>
                <input
                  type="text"
                  name="metrics.recall"
                  value={formData.metrics.recall}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900"
                  placeholder="e.g., 0.94"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  F1 Score
                </label>
                <input
                  type="text"
                  name="metrics.f1Score"
                  value={formData.metrics.f1Score}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900"
                  placeholder="e.g., 0.93"
                />
              </div>
            </div>
          </div>

          {/* Category & Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category & Tags
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Main Category
                </label>
                <select
                  name="mainCategory"
                  value={formData.mainCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900">
                  <option value="">Select a category</option>
                  {Object.keys(TASK_CATEGORIES).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {formData.mainCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Specific Task
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900">
                    <option value="">Select a task</option>
                    {TASK_CATEGORIES[formData.mainCategory as keyof typeof TASK_CATEGORIES].map((task) => (
                      <option key={task} value={task}>{task}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Additional Tags
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent text-gray-900"
                  placeholder="Enter additional tags (comma separated)"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/upload')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpload}
              className={`px-4 py-2 text-sm font-medium text-white bg-[#0284a5] rounded-lg hover:bg-[#026d8a] ${
                isUploading || 
                !formData.name || 
                !formData.description || 
                !formData.mainCategory ||
                !formData.category ||
                formData.files.length === 0 ||
                !thumbnail
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Model'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}