'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie, Settings, BarChart, Shield, Mail, Phone } from 'lucide-react';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Cookie className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Cookie <span className="text-purple-600">Policy</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              This policy explains how we use cookies and similar technologies to enhance your 
              experience on our website and provide better services.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
            <p className="text-gray-700 mb-6">
              Cookies are small text files that are placed on your computer or mobile device when you 
              visit a website. They are widely used to make websites work more efficiently and to 
              provide information to website owners.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Cookies</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar technologies to improve your browsing experience, analyze 
              website traffic, and personalize content. Here's how we use them:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-blue-50 rounded-lg">
                <BarChart className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-700 text-sm">
                  Help us understand how visitors interact with our website by collecting and 
                  reporting information anonymously.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <Settings className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                <p className="text-gray-700 text-sm">
                  Enable enhanced functionality and personalization, such as remembering your 
                  preferences and settings.
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <Shield className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Cookies</h3>
                <p className="text-gray-700 text-sm">
                  Help us maintain the security of our website and protect against fraud and abuse.
                </p>
              </div>
              <div className="p-6 bg-orange-50 rounded-lg">
                <Cookie className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-700 text-sm">
                  Necessary for the website to function properly and cannot be disabled in our systems.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function and cannot be switched off. 
              They are usually only set in response to actions made by you which amount to a request 
              for services.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Session management cookies</li>
              <li>Security and authentication cookies</li>
              <li>Load balancing cookies</li>
              <li>User interface customization cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies allow us to count visits and traffic sources so we can measure and 
              improve the performance of our site. They help us to know which pages are the most 
              and least popular.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Google Analytics cookies</li>
              <li>Page view tracking</li>
              <li>User behavior analysis</li>
              <li>Performance monitoring</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Marketing Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies may be set through our site by our advertising partners to build a 
              profile of your interests and show you relevant adverts on other sites.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Social media integration cookies</li>
              <li>Advertising platform cookies</li>
              <li>Remarketing cookies</li>
              <li>Conversion tracking cookies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 mb-6">
              You can control and/or delete cookies as you wish. You can delete all cookies that 
              are already on your computer and you can set most browsers to prevent them from being 
              placed. However, if you do this, you may have to manually adjust some preferences 
              every time you visit a site.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Browser Settings</h3>
            <p className="text-gray-700 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. 
              Here's how to manage cookies in popular browsers:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
              <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-6">
              Some cookies on our site are set by third-party services. We have no control over 
              these cookies and they are subject to the privacy policies of the respective third parties.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services We Use</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Google Analytics for website analytics</li>
              <li>Social media platforms for sharing functionality</li>
              <li>Payment processors for transaction processing</li>
              <li>Customer support tools for communication</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Updates to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy 
              regularly to stay informed about our use of cookies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">privacy@exponentiolabs.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
