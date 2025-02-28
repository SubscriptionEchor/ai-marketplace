import { useNavigate } from 'react-router-dom';

const BENEFITS = [
  {
    title: 'Monetize Your Data',
    description: 'Turn your valuable datasets into a revenue stream. Set your own pricing and earn from each download.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Global Reach',
    description: 'Access a worldwide community of AI developers and researchers looking for quality datasets.',
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
  },
  {
    title: 'Secure Infrastructure',
    description: 'Your data is stored securely with enterprise-grade encryption and access controls.',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
  },
  {
    title: 'Analytics & Insights',
    description: 'Track usage, downloads, and revenue with detailed analytics and reporting tools.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
  }
];

const HOW_IT_WORKS = [
  {
    title: 'Sign Up',
    description: 'Create your data provider account with basic information and verification.',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
  },
  {
    title: 'Upload Data',
    description: 'Upload your datasets, add metadata, and set pricing.',
    icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
  },
  {
    title: 'Get Verified',
    description: 'Our team reviews your datasets to ensure quality standards.',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
  },
  {
    title: 'Start Earning',
    description: 'Earn revenue every time someone downloads your dataset.',
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
  }
];

const FAQ = [
  {
    question: 'What types of datasets can I provide?',
    answer: 'You can provide any type of dataset that\'s valuable for AI training, including text, images, audio, video, and structured data. All datasets must comply with our content guidelines and legal requirements.'
  },
  {
    question: 'How do I get paid?',
    answer: 'Payments are processed monthly for all qualifying earnings. You can receive payments via bank transfer, cryptocurrency, or other supported payment methods.'
  },
  {
    question: 'What are the quality requirements?',
    answer: 'Datasets must be properly formatted, well-documented, and include clear licensing information. Our team reviews all submissions to ensure they meet our quality standards.'
  },
  {
    question: 'How is pricing determined?',
    answer: 'You have full control over pricing your datasets. We provide pricing guidelines and market insights to help you set competitive rates.'
  }
];

export function DataProviderView() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-900 h-[calc(100vh-112px)] overflow-y-auto">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#0284a5] to-[#026d8a] bg-clip-text text-transparent">
          Become a Data Provider
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Share your datasets with the AI community and earn revenue
        </p>
        <button
          onClick={() => navigate('/dashboard/provider/onboarding')}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-lg text-white bg-[#0284a5] hover:bg-[#026d8a] transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0284a5]"
        >
          Get Started
          <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* How It Works Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full hover:shadow-xl transition-shadow duration-200">
                <div className="w-14 h-14 bg-[#0284a5] bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#0284a5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={step.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-[#0284a5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Benefits of Being a Data Provider
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="w-14 h-14 bg-[#0284a5] bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#0284a5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={benefit.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-3xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FAQ.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-[#0284a5]/5 to-[#026d8a]/5 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start?
        </h2>
        <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
          Join our community of data providers and start earning from your datasets
        </p>
        <button
          onClick={() => navigate('/dashboard/provider/onboarding')}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-lg text-white bg-[#0284a5] hover:bg-[#026d8a] transform hover:scale-105 transition-all duration-200"
        >
          Become a Data Provider
          <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}