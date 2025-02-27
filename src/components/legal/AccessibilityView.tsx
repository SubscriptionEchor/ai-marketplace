export function AccessibilityView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Accessibility Statement</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: January 15, 2024
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-gray-600">
            Trie is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Measures to Support Accessibility</h2>
          <p className="text-gray-600 mb-4">
            We take the following measures to ensure accessibility:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Include keyboard navigation support</li>
            <li>Provide clear navigation structure</li>
            <li>Add alt text to all images</li>
            <li>Maintain sufficient color contrast</li>
            <li>Support screen readers</li>
          </ul>
        </section>
      </div>
    </div>
  );
}