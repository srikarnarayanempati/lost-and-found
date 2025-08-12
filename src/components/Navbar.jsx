import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Plus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/lost-items', label: 'Lost Items' },
    { path: '/found-items', label: 'Found Items' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[70%]">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg rounded-full overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[10deg]">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Lost
                <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent"> & </span>
                Found
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-2 font-medium transition-colors duration-200 text-white hover:text-orange-500"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/post-item"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow hover:opacity-90 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Post an Item</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/20 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-primary-200 bg-white/20'
                        : 'text-white hover:text-primary-200 hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/post-item"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow hover:opacity-90 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post an Item</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </nav>
  );
};

export default Navbar;
