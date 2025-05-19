import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PolicyNavigation from '@/components/policies/PolicyNavigation';

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <PolicyNavigation />
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-[hsl(231,53%,55%)]">
            Cookie Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Course HUB uses cookies and similar tracking technologies to track the activity on our platform and hold certain information. This Cookie Policy explains how and why we use these technologies and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide useful information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">3.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
              </p>

              <h3 className="text-xl font-medium">3.2 Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
              </p>

              <h3 className="text-xl font-medium">3.3 Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>

              <h3 className="text-xl font-medium">3.4 Marketing Cookies</h3>
              <p>
                These cookies are used to track visitors across websites to display relevant advertisements.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To remember your preferences and settings</li>
              <li>To understand how you use our website</li>
              <li>To improve our website's performance</li>
              <li>To provide personalized content and advertisements</li>
              <li>To maintain your session while you're logged in</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
            <p>
              We may use third-party services that use cookies to provide additional functionality, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Analytics services (e.g., Google Analytics)</li>
              <li>Payment processors</li>
              <li>Social media platforms</li>
              <li>Advertising networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Managing Cookies</h2>
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Choices</h2>
            <p>
              You can choose to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Modify your browser settings to manage cookies</li>
              <li>Clear cookies from your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
            <p className="mt-4 text-sm">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@coursehub.com<br />
              Address: [Your Company Address]
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiePolicy; 