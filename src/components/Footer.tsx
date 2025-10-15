import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Cpu, Bot, Wifi, Lightbulb, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">Exponential Labs</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming ideas into reality with cutting-edge technology solutions. 
              From AI development to robotics, we power innovation across 6 specialized domains.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/agentic-ai-development" className="text-gray-400 hover:text-white transition-colors">
                  Agentic AI Development
                </Link>
              </li>
              <li>
                <Link href="/services/full-stack-development" className="text-gray-400 hover:text-white transition-colors">
                  Full Stack Development
                </Link>
              </li>
              <li>
                <Link href="/services/ar-vr-metaverse" className="text-gray-400 hover:text-white transition-colors">
                  AR/VR & Metaverse
                </Link>
              </li>
              <li>
                <Link href="/services/robotics" className="text-gray-400 hover:text-white transition-colors">
                  Robotics
                </Link>
              </li>
              <li>
                <Link href="/services/embedded-iot" className="text-gray-400 hover:text-white transition-colors">
                  Embedded & IoT
                </Link>
              </li>
              <li>
                <Link href="/services/idea-labs" className="text-gray-400 hover:text-white transition-colors">
                  Idea Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Lab Infrastructure */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lab Infrastructure</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/labs/ar-vr" className="text-gray-400 hover:text-white transition-colors">
                  AR/VR Labs
                </Link>
              </li>
              <li>
                <Link href="/labs/robotics" className="text-gray-400 hover:text-white transition-colors">
                  Robotics Labs
                </Link>
              </li>
              <li>
                <Link href="/labs/agentic-ai" className="text-gray-400 hover:text-white transition-colors">
                  Agentic AI Labs
                </Link>
              </li>
              <li>
                <Link href="/labs/embedded" className="text-gray-400 hover:text-white transition-colors">
                  Embedded Labs
                </Link>
              </li>
              <li>
                <Link href="/labs/fullstack" className="text-gray-400 hover:text-white transition-colors">
                  Full Stack Labs
                </Link>
              </li>
              <li>
                <Link href="/labs/idea" className="text-gray-400 hover:text-white transition-colors">
                  Idea Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">hello@exponentiolabs.com</span>
              </div>
              <div className="hidden flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">Mangaluru, India</span>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Technologies We Power</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">AI/ML</span>
                <span className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded">Web Dev</span>
                <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">AR/VR</span>
                <span className="text-xs bg-orange-600/20 text-orange-300 px-2 py-1 rounded">Robotics</span>
                <span className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded">IoT</span>
                <span className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded">Prototyping</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Exponential Labs. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with ❤️ by <Link href="https://www.exponentiolabs.com" className="text-gray-400 hover:text-white text-sm transition-colors">Exponential Labs</Link>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
