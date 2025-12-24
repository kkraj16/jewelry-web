'use client';

import React from 'react';
import { Layout } from '../../components/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 mb-4">Terms & Conditions</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our services.
            </p>
          </div>

          <div className="prose prose-neutral max-w-none">
            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">1. Introduction</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                These terms and conditions ("Terms") govern your use of Ratannam Gold's services, website, and 
                associated products. By accessing or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Ratannam Gold ("we", "us", "our") operates the jewelry retail business in Pali, Rajasthan, 
                providing high-quality gold, silver, and diamond jewelry products.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">2. Product Information</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                All product descriptions and images on our website are for informational purposes only. 
                Actual products may vary slightly in color, size, or appearance from the images displayed.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                We ensure that all our jewelry products are hallmarked and certified according to BIS standards. 
                Weight and purity may vary within industry-accepted tolerances.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">3. Pricing & Payments</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                All prices are quoted in Indian Rupees (INR) and are subject to change without prior notice. 
                Prices are based on the current market rates for precious metals and may fluctuate daily.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Payment can be made through cash, card, or digital payment methods as accepted by our store. 
                We provide proper receipts for all transactions.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">4. Returns & Exchanges</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Due to the nature of jewelry products, we have a strict no-return policy for products that 
                have been used or altered. However, we may consider exchanges based on our exchange policy.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Any exchange requests must be made within 7 days of purchase, with the original receipt and 
                product in its original condition.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">5. Delivery & Shipping</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Most jewelry items are available for immediate collection from our store. For special orders 
                or custom pieces, delivery timelines will be communicated at the time of booking.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                We do not offer shipping for jewelry products. All purchases must be collected in person 
                from our store with proper identification.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">6. Custom Orders</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                For custom jewelry orders, a deposit may be required based on the value of the order. 
                Custom pieces are non-returnable and will be made according to the agreed specifications.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Delivery timelines for custom orders will be confirmed at the time of booking and may vary 
                based on complexity and availability of materials.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">7. Privacy Policy</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                We respect your privacy and are committed to protecting your personal information. 
                Any personal information collected is used solely for processing your orders and 
                providing better customer service.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                We do not share your personal information with third parties except as required by law 
                or for legitimate business purposes related to our services.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">8. Limitation of Liability</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Ratannam Gold shall not be liable for any indirect, incidental, special, or consequential 
                damages arising out of or in connection with the purchase or use of our products.
              </p>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                Our liability shall be limited to the value of the product purchased, and we shall not 
                be responsible for any loss of use, revenue, or profit.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">9. Changes to Terms</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                We reserve the right to modify these terms and conditions at any time. Changes will be 
                effective immediately upon posting on our website. Your continued use of our services 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 sm:mb-6">10. Contact Information</h2>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
                If you have any questions about these terms and conditions, please contact us at our store 
                in Pali or through the contact information provided on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}