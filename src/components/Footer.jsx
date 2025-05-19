import React from 'react'
import { Link } from 'react-router-dom'
import logoOnly from "../assets/logo_only.png";

export default function Footer() {
  return (
    <footer className="bg-[hsl(231,53%,55%)] dark:bg-[hsl(231,33%,45%)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoOnly} className="h-10" alt="Course HUB logo" />
              <h3 className="text-xl font-bold">Course HUB</h3>
            </div>
            <p className="text-gray-200 dark:text-gray-300">
              Empowering learners worldwide with interactive courses and gamified learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-200 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/my-learning" className="text-gray-200 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 transition-colors">
                  My Learning
                </Link>
              </li>
              <li>
                <Link to="/gamification" className="text-gray-200 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 transition-colors">
                  Gamification
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-200 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-200 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-200 dark:text-gray-300">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg flex-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-700"
              />
              <button className="bg-white dark:bg-gray-800 text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-200 text-sm">
              © {new Date().getFullYear()} Course HUB. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-gray-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-200 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
