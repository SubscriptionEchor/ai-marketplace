export function TermsView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: January 15, 2024
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-600">
            By accessing or using the Trie AI marketplace, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
          <p className="text-gray-600 mb-4">
            Permission is granted to temporarily access and use the Trie marketplace for personal, non-commercial transitory viewing only.
          </p>
          <p className="text-gray-600">
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>Transfer the materials to another person</li>
          </ul>
        </section>
      </div>
    </div>
  );
}