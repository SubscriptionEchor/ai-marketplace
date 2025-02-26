export function WalletModal() {
  return (
    <div className="space-y-10 text-gray-600">
      {/* Info Banner */}
      <div className="bg-indigo-50 rounded-xl p-6 flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-lg text-gray-900 mb-2">Quick Setup Guide</h3>
          <p className="text-gray-600">Follow these simple steps to get started with XELL wallet and join the TRIE AI marketplace.</p>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="space-y-6 px-1">
        <h3 className="font-display text-lg text-gray-900 flex items-center space-x-2">
          <span className="w-8 h-8 bg-[#6366F1] bg-opacity-10 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span>Installation Steps</span>
        </h3>
        <ol className="space-y-6">
          {[
            "Visit the XELL wallet extension page",
            'Click "Add to Browser" or "Install Extension"',
            "Follow the browser's installation prompts",
            "Return to this page and refresh"
          ].map((step, index) => (
            <li key={index} className="flex items-center space-x-4 group">
              <span className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-[#6366F1] rounded-xl flex items-center justify-center font-medium group-hover:bg-[#6366F1] group-hover:text-white transition-colors">
                {index + 1}
              </span>
              <span className="flex-1 text-gray-700 font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Download Button */}
      <div className="flex justify-center py-2">
        <a
          href="https://xell-wallet.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 bg-[#6366F1] text-white px-10 py-4 rounded-xl hover:bg-[#5558E6] transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100 transform hover:-translate-y-0.5"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="font-medium tracking-wide">Download XELL Wallet</span>
        </a>
      </div>

      {/* Features Section */}
      <div className="p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100">
        <h4 className="font-display text-lg text-gray-900 mb-6 flex items-center space-x-2">
          <span className="w-8 h-8 bg-[#6366F1] bg-opacity-10 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>What You'll Get</span>
        </h4>
        <ul className="space-y-5">
          {[
            { title: "Create a secure wallet", desc: "Set up your digital wallet with military-grade encryption" },
            { title: "Connect to TRIE AI", desc: "Seamlessly integrate with our marketplace" },
            { title: "Explore AI Models", desc: "Access our curated collection of AI solutions" }
          ].map((item, index) => (
            <li key={index} className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border-2 border-indigo-100 flex items-center justify-center group-hover:border-[#6366F1] transition-colors">
                <div className="w-2 h-2 bg-[#6366F1] rounded-lg group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">{item.title}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}