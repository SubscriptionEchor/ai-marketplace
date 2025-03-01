import { useNavigate } from 'react-router-dom';

export function ModelUploadView() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload AI Model</h1>
        <p className="text-lg text-gray-600">Share your AI model with the community</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e1e3e5] p-8">
        <div className="space-y-8">
          {/* Model Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
              placeholder="e.g., my-awesome-model"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
              placeholder="Describe your model's capabilities and use cases..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent">
              <option value="">Select a category</option>
              <option value="nlp">Natural Language Processing</option>
              <option value="cv">Computer Vision</option>
              <option value="audio">Audio Processing</option>
              <option value="multimodal">Multimodal</option>
            </select>
          </div>

          {/* Model Files */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Files
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="model-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#0284a5] hover:text-[#026d8a] focus-within:outline-none"
                  >
                    <span>Upload files</span>
                    <input
                      id="model-upload"
                      name="model-upload"
                      type="file"
                      className="sr-only"
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">Model files up to 1GB</p>
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
              className="px-4 py-2 text-sm font-medium text-white bg-[#0284a5] rounded-lg hover:bg-[#026d8a]"
            >
              Upload Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}