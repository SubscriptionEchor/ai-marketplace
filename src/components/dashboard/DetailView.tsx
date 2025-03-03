import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LikeButton, Modal } from '@/components/ui';
import { useAuth } from '@/hooks';

interface Tab {
  id: string;
  label: string;
}

const TABS: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'files', label: 'Files' },
  { id: 'usage', label: 'Usage Guide' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'discussions', label: 'Discussions' }
];

export function DetailView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  // Extract the full model ID from the URL path
  const modelId = location.pathname.split('/').slice(3).join('/');

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = async () => {
    setIsPurchasing(true);
    try {
      // Simulate purchase transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to downloads page after successful purchase
      navigate('/dashboard/downloads');
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsPurchasing(false);
      setShowPurchaseModal(false);
    }
  };

  useEffect(() => {
    // Log the model ID for debugging
    console.log('Model ID:', modelId);
  }, [modelId]);

  // Mock data - in a real app, this would be fetched based on the ID
  const item = {
    id: 'model-1',
    type: 'model',
    pricing: {
      model: 'one-time',
      price: '99.99',
      currency: 'USD'
    },
    name: 'Advanced NLP Model',
    description: 'State-of-the-art natural language processing model for text generation and analysis.',
    longDescription: `
      This model represents the cutting edge in natural language processing, 
      trained on a diverse dataset of over 1 billion tokens. It excels at tasks 
      including text generation, sentiment analysis, and language understanding.
      
      Key Features:
      • Multi-language support (100+ languages)
      • Context window of 8k tokens
      • State-of-the-art performance on benchmark tasks
      • Optimized for production deployment
    `,
    creator: {
      name: 'AI Research Labs',
      avatar: 'A',
      bio: 'Leading AI research organization focused on advancing NLP technology'
    },
    image: 'https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png',
    license: 'MIT',
    lastUpdated: '2024-01-15',
    stars: '2.5k',
    downloads: '15.2k',
    views: '45.6k',
    tags: ['NLP', 'Text Generation', 'Transformer'],
    metrics: {
      accuracy: '95.2%',
      f1Score: '94.8%',
      precision: '94.5%',
      recall: '95.1%'
    },
    files: [
      {
        name: 'model.pt',
        size: '2.3 GB',
        format: 'PyTorch',
        lastModified: '2024-01-15'
      },
      {
        name: 'config.json',
        size: '15 KB',
        format: 'JSON',
        lastModified: '2024-01-15'
      },
      {
        name: 'tokenizer.json',
        size: '500 KB',
        format: 'JSON',
        lastModified: '2024-01-15'
      }
    ],
    usage: {
      installation: 'pip install advanced-nlp',
      quickstart: `
import torch
from advanced_nlp import Model

model = Model.from_pretrained('ai-research/advanced-nlp')
output = model.generate("Your input text here")
      `,
      examples: [
        {
          title: 'Basic Text Generation',
          code: 'output = model.generate("Once upon a time")',
          description: 'Generate creative text based on a prompt'
        },
        {
          title: 'Sentiment Analysis',
          code: 'sentiment = model.analyze_sentiment("Great product!")',
          description: 'Analyze the sentiment of input text'
        }
      ]
    }
  };

  return (
    <div className="min-h-[calc(100vh-112px)] bg-[#f6f6f7]">
      {/* Hero Section - Law of Common Region */}
      <div className="bg-white border-b border-[#e1e3e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-2 mb-6 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>

          <div className="mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0284a5]/10 text-[#0284a5] capitalize">
                  {item.type}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                    {item.creator.avatar}
                  </div>
                  <span>{item.creator.name}</span>
                  <span>•</span>
                  <span>Updated {item.lastUpdated}</span>
                  <span>•</span>
                  <span>{item.license} License</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats - Law of Proximity */}
          <div className="flex items-center gap-6 text-gray-900">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="font-medium text-gray-900">{item.downloads}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium text-gray-900">{item.views}</span>
            </div>
            <LikeButton
              isLiked={isLiked}
              likes={item.stars}
              onLike={() => setIsLiked(!isLiked)}
            />
          </div>

          {/* Tags - Law of Similarity */}
          <div className="flex items-center gap-2 mt-6">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation - Law of Common Region */}
      <div className="bg-white border-b border-[#e1e3e5] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex -mb-px space-x-8" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-1 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap relative
                  ${activeTab === tab.id
                    ? 'border-[#0284a5] text-[#0284a5]'
                    : 'border-transparent text-gray-900 hover:text-[#0284a5] hover:border-[#0284a5]/50'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content - Law of Common Region */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-[#e1e3e5] p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                <div className="prose prose-sm max-w-none">
                  {item.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'files' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-[#e1e3e5] overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-[#e1e3e5]">
                  <h2 className="text-xl font-semibold text-gray-900">Files</h2>
                </div>
                <div className="divide-y divide-[#e1e3e5]">
                  {item.files.map((file) => (
                    <div key={file.name} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0284a5]/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#0284a5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          <div className="text-xs text-gray-500">
                            {file.size} • {file.format} • Last modified {file.lastModified}
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-[#0284a5] hover:bg-[#0284a5]/10 rounded-lg transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'usage' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Installation */}
                <div className="bg-white rounded-xl border border-[#e1e3e5] p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Installation</h2>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                    {item.usage.installation}
                  </div>
                </div>

                {/* Quickstart */}
                <div className="bg-white rounded-xl border border-[#e1e3e5] p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quickstart</h2>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white whitespace-pre">
                    {item.usage.quickstart}
                  </div>
                </div>

                {/* Examples */}
                <div className="bg-white rounded-xl border border-[#e1e3e5] p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Examples</h2>
                  <div className="space-y-6">
                    {item.usage.examples.map((example) => (
                      <div key={example.title}>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{example.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                          {example.code}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-[#e1e3e5] p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(item.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-2xl font-semibold text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'discussions' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-[#e1e3e5] p-6"
              >
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions yet</h3>
                  <p className="text-gray-500 mb-4">Be the first to start a discussion about this {item.type}</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#0284a5] hover:bg-[#026d8a]">
                    Start Discussion
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl border border-[#e1e3e5] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-[#e1e3e5] p-6">
              <button 
                onClick={handlePurchase}
                className="w-full px-4 py-2 bg-[#0284a5] text-white text-sm font-medium rounded-lg hover:bg-[#026d8a] transition-colors mb-3 flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
                <span className="text-white/80">${item.pricing?.price || '99.99'}</span>
              </button>
              <button className="w-full px-4 py-2 border border-[#0284a5] text-[#0284a5] text-sm font-medium rounded-lg hover:bg-[#0284a5]/10 transition-colors">
                Try in Playground
              </button>
              
              {/* Purchase Information */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">What's included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Full model access
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Source code & documentation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Commercial usage rights
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Updates & support
                  </li>
                </ul>
              </div>
            </div>

            {/* Creator Info */}
            <div className="bg-white rounded-xl border border-[#e1e3e5] p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">About Creator</h3>
              <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => navigate(`/dashboard/creator/${item.creator.name}`)}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
                  {item.creator.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 hover:text-[#0284a5] transition-colors">{item.creator.name}</div>
                  <div className="text-xs text-[#0284a5]">View Profile</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{item.creator.bio}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Confirmation Modal */}
      <Modal
        show={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        title="Confirm Purchase"
      >
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Purchase Summary</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-sm font-medium text-gray-900">${item.pricing?.price || '99.99'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">TRIE Balance</span>
                <span className="text-sm font-medium text-green-600">$1,000.00</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">License Terms</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>By purchasing this {item.type}, you agree to the following terms:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Commercial usage rights granted</li>
                <li>Source code modification allowed</li>
                <li>Redistribution requires attribution</li>
                <li>Updates included for 12 months</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowPurchaseModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPurchase}
              disabled={isPurchasing}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0284a5] rounded-lg hover:bg-[#026d8a] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPurchasing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Purchase'
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Authentication Modal */}
      <Modal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Connect Your Wallet"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="https://learn.rubix.net//images/logo.png" alt="XELL" className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-6">Please connect your XELL wallet to make a purchase</p>
          <button
            onClick={() => {
              login();
              setShowAuthModal(false);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#0284a5] hover:bg-[#026d8a]"
          >
            Connect XELL Wallet
          </button>
        </div>
      </Modal>
    </div>
  );
}