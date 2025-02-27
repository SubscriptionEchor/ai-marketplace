export function PrivacyView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: January 15, 2024
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600">
            This Privacy Policy describes how Trie ("we", "us", or "our") collects, uses, and shares your personal information when you use our AI marketplace and related services.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Account information (name, email, wallet address)</li>
            <li>Profile information</li>
            <li>Transaction data</li>
            <li>Communication preferences</li>
          </ul>
        </section>
      </div>
    </div>
  );
}