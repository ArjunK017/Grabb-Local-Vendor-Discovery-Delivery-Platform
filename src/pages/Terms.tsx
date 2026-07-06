import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Terms() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-1.5 bg-ocean/10 text-ocean text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" /> Legal
          </span>
          <h1 className="font-fraunces text-5xl font-semibold text-navy">Terms of Use</h1>
          <p className="text-gray-500 text-sm mt-2">Last updated: July 2026</p>
        </motion.div>

        <div className="mt-10 bg-white rounded-2xl p-8 md:p-10 shadow-sm text-sm text-gray-600 space-y-6">
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">By accessing or using the Grabb website, you agree to be bound by these Terms of Use. If you do not agree, please do not use the site.</p>
          </section>
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">2. Description of Service</h2>
            <p className="leading-relaxed">Grabb provides a platform for discovering local vendors and their products. The site is currently a static marketing and discovery website. Orders are facilitated as enquiries and are fulfilled by the respective vendors. Grabb acts as an intermediary and delivery service provider.</p>
          </section>
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">3. Vendor Listings</h2>
            <p className="leading-relaxed">Vendors listed on Grabb are independent businesses. Grabb does not guarantee the accuracy, quality, or availability of any vendor's products or services. Vendor verification badges indicate that the vendor has been reviewed by Grabb but do not constitute an endorsement or guarantee.</p>
          </section>
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">4. User Conduct</h2>
            <p className="leading-relaxed">Users agree to use the site lawfully and not to misuse the platform, including but not limited to submitting false enquiries, harassing vendors, or attempting to disrupt the service.</p>
          </section>
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">5. Limitation of Liability</h2>
            <p className="leading-relaxed">Grabb shall not be liable for any indirect, incidental, or consequential damages arising from the use of the site or services. Grabb's total liability is limited to the amount paid by the user for the specific service in question.</p>
          </section>
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">6. Changes to Terms</h2>
            <p className="leading-relaxed">Grabb reserves the right to update these terms at any time. Users will be notified of material changes via the website.</p>
          </section>
          <section>
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">7. Contact</h2>
            <p className="leading-relaxed">For questions about these terms, contact us at hello@grabb.com.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
