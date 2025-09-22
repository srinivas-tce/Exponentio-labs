'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, CheckCircle, Mail, Phone } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100">
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
              <FileText className="w-12 h-12 text-green-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                Terms of <span className="text-green-600">Service</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Please read these terms carefully before using our services. By using our platform, 
              you agree to be bound by these terms.
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
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using Exponential Labs services, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
            <p className="text-gray-700 mb-6">
              Exponential Labs provides technology development services including but not limited to:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Agentic AI Development</li>
              <li>Full Stack Development</li>
              <li>AR/VR & Metaverse Solutions</li>
              <li>Robotics Development</li>
              <li>Embedded & IoT Systems</li>
              <li>Idea Labs and Prototyping Services</li>
              <li>Lab Infrastructure and Equipment Access</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-6">
              As a user of our services, you agree to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-2">Provide Accurate Information</h4>
                <p className="text-sm text-gray-600">Supply truthful and complete information when required</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-2">Maintain Security</h4>
                <p className="text-sm text-gray-600">Keep your account credentials secure and confidential</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Scale className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-2">Comply with Laws</h4>
                <p className="text-sm text-gray-600">Use our services in accordance with applicable laws</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-2">Respect Intellectual Property</h4>
                <p className="text-sm text-gray-600">Not infringe on third-party intellectual property rights</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Prohibited Uses</h2>
            <p className="text-gray-700 mb-6">
              You may not use our services for any unlawful purpose or to solicit others to perform 
              unlawful acts. Prohibited uses include:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Violating any applicable laws or regulations</li>
              <li>Transmitting malicious code or harmful content</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Interfering with the proper functioning of our services</li>
              <li>Using our services for any fraudulent or deceptive purpose</li>
              <li>Harassing, threatening, or intimidating other users</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Intellectual Property Rights</h2>
            <p className="text-gray-700 mb-6">
              The service and its original content, features, and functionality are and will remain 
              the exclusive property of Exponential Labs and its licensors. The service is protected 
              by copyright, trademark, and other laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Work</h3>
            <p className="text-gray-700 mb-6">
              Work products created specifically for clients will be owned by the client upon 
              full payment. Exponential Labs retains the right to use general methodologies, 
              techniques, and knowledge gained during project execution.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Payment Terms</h2>
            <p className="text-gray-700 mb-6">
              Payment terms will be specified in individual project agreements. Generally:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Invoices are due within 30 days of receipt</li>
              <li>Late payments may incur additional charges</li>
              <li>All prices are exclusive of applicable taxes</li>
              <li>Refunds are subject to our refund policy</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Confidentiality</h2>
            <p className="text-gray-700 mb-6">
              We understand the sensitive nature of your projects and maintain strict confidentiality. 
              All project information is treated as confidential and will not be disclosed to third 
              parties without your explicit consent.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no event shall Exponential Labs, nor its directors, employees, partners, agents, 
              suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your use of the service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Service Availability</h2>
            <p className="text-gray-700 mb-6">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. 
              We reserve the right to modify, suspend, or discontinue any part of our services at any time.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Termination</h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your access immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be interpreted and governed by the laws of India. Any disputes arising 
              from these terms will be subject to the exclusive jurisdiction of the courts in Bangalore, India.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new 
              terms taking effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">legal@exponentiolabs.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Exponential Labs<br />
                  Bangalore, India
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
