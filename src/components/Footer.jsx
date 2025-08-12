import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Lost & Found</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting students with their lost belongings. A simple, safe, and effective way to reunite people with their items on campus.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Campus Community</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Home
              </Link>
              <Link to="/lost-items" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Lost Items
              </Link>
              <Link to="/found-items" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Found Items
              </Link>
              <Link to="/post-item" className="block text-gray-300 hover:text-white transition-colors duration-200">
                Post an Item
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>help@lostfound.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Lost & Found. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              <strong>Disclaimer:</strong> Please verify ownership before returning items.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;