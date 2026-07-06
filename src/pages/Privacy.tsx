import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-fraunces text-4xl font-semibold text-navy">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mt-2">Last updated: July 2026</p>
        </motion.div>

        <div className="mt-10 bg-white rounded-xl p-8 shadow-sm text-sm text-gray-600 space-y-6">
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">1. Information We Collect</h2>
            <p>We collect information you voluntarily provide, such as your name, email address, phone number, and shop details when you submit a form on our website. We also collect basic usage data (pages visited, browser type) via analytics tools.</p>
          </section>

          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Respond to your enquiries and registration requests</li>
              <li>Improve our website and services</li>
              <li>Send occasional updates about Grabb (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">3. Data Sharing</h2>
            <p>We do not sell your personal data. We may share information with third-party service providers (e.g., form processing, analytics) who are contractually bound to protect your data. Vendor registration details are used to create storefront pages and are visible to site visitors as intended.</p>
          </section>

          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">4. Data Security</h2>
            <p>We implement reasonable security measures to protect your data. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@grabb.com.</p>
          </section>

          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">6. Cookies</h2>
            <p>We may use essential cookies for site functionality and analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">7. Contact</h2>
            <p>For privacy-related enquiries, contact us at hello@grabb.com.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
