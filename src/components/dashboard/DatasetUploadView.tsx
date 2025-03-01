import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPFSService } from '@/services/ipfs';

export function DatasetUploadView() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;

    try {
      setUploading(true);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const cid = await IPFSService.uploadFiles(files);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Here you would typically save the dataset metadata to your backend
      console.log('Dataset uploaded to IPFS:', IPFSService.getIPFSUrl(cid));
      
      // Navigate back to datasets view after successful upload
      setTimeout(() => {
        navigate('/dashboard/datasets');
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  }, [files, navigate]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Dataset</h1>
        <p className="text-lg text-gray-600">Share your dataset with the AI community</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e1e3e5] p-8">
        {/* File Upload Area */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dataset Files
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
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

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h3>
            <ul className="divide-y divide-gray-200">
              {files.map((file, index) => (
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
                  <span className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
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
            disabled={files.length === 0 || uploading}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0284a5] rounded-lg hover:bg-[#026d8a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload to IPFS'}
          </button>
        </div>
      </div>
    </div>
  );
}