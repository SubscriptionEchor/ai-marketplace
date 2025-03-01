import { useState } from 'react';
import { useAuth } from '@/hooks';

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
}

const NOTIFICATION_PREFERENCES: NotificationPreference[] = [
  {
    id: 'newModels',
    label: 'New Models',
    description: 'Get notified when new AI models are added'
  },
  {
    id: 'priceAlerts',
    label: 'Price Alerts',
    description: 'Get notified about significant price changes'
  },
  {
    id: 'securityAlerts',
    label: 'Security Alerts',
    description: 'Get notified about important security updates'
  }
];

export function SettingsView() {
  const { isAuthenticated, connectWallet, connectedWallet } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    newModels: true,
    priceAlerts: true,
    securityAlerts: true
  });

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-112px)]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="https://learn.rubix.net//images/logo.png" alt="XELL" className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">Please connect your XELL wallet to access settings</p>
          <button
            onClick={() => {/* Connect wallet logic */}}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#0284a5] hover:bg-[#026d8a]"
          >
            Connect XELL Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-112px)] overflow-y-auto scrollbar-hide">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Wallet Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Wallet</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wallet Connection
            </label>
            
            {/* XELL Wallet */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => connectWallet('xell')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full p-2 shadow-sm">
                  <img src="https://learn.rubix.net//images/logo.png" alt="XELL" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">XELL Wallet</h3>
                  <p className="text-xs text-gray-500">Recommended wallet for TRIE AI Marketplace</p>
                </div>
              </div>
              {connectedWallet?.type === 'xell' ? (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Connected</span>
              ) : (
                <span className="text-xs font-medium text-gray-600">Connect</span>
              )}
            </div>

            {/* MetaMask */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => connectWallet('metamask')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full p-2 shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">MetaMask</h3>
                  <p className="text-xs text-gray-500">Connect with MetaMask wallet</p>
                </div>
              </div>
              {connectedWallet?.type === 'metamask' ? (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Connected</span>
              ) : (
                <span className="text-xs font-medium text-gray-600">Connect</span>
              )}
            </div>
          </div>

          {connectedWallet && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Connected Address</p>
                  <p className="text-xs font-mono text-gray-500">{connectedWallet.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Gas Settings
            </label>
            <select 
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            >
              <option value="free">Free (0%)</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">Currently all transactions are free on the platform</p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
        <div className="space-y-6">
          {/* Email Subscription */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Notifications
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284a5] focus:border-transparent"
              />
              <button
                onClick={handleSubscribe}
                disabled={!email || !email.includes('@')}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  !email || !email.includes('@')
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#0284a5] hover:bg-[#026d8a]'
                }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Subscribe to receive notifications about new models, price changes, and security updates
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Notification Preferences</h3>
              {!isSubscribed && (
                <span className="text-xs text-gray-500">Subscribe to email notifications to enable preferences</span>
              )}
            </div>
          </div>

          {NOTIFICATION_PREFERENCES.map((preference) => (
            <div key={preference.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{preference.label}</p>
                <p className="text-xs text-gray-500">{preference.description}</p>
              </div>
              <button
                onClick={() => isSubscribed && setNotifications(prev => ({ 
                  ...prev, 
                  [preference.id]: !prev[preference.id as keyof typeof prev]
                }))}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  !isSubscribed 
                    ? 'bg-gray-200 cursor-not-allowed opacity-50' 
                    : notifications[preference.id as keyof typeof notifications]
                      ? 'bg-[#0284a5] cursor-pointer'
                      : 'bg-gray-200 cursor-pointer'
                }`}
                disabled={!isSubscribed}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifications[preference.id as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}