// Home.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Squares from './Squares'; // background animation component

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'all 0.6s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, []);

  const stats = [
    { icon: Users, value: '500+', label: 'Items Reunited' },
    { icon: Clock, value: '24/7', label: 'Always Available' },
    { icon: CheckCircle, value: '95%', label: 'Success Rate' }
  ];

  const features = [
    {
      title: 'Report Lost Items',
      description: 'Quickly post details about your lost belongings with photos and descriptions.',
      icon: Search,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Share Found Items',
      description: 'Help others by posting items you\'ve found around campus.',
      icon: Plus,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Connect Safely',
      description: 'Safe communication system to reunite items with their owners.',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white"
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Squares Background (no negative z-index) */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="w-full h-full">
            <Squares
              speed={0.5}
              squareSize={40}
              direction="diagonal"
              borderColor="#737373ff"
              hoverFillColor="#c8c5c5ff"
            />
          </div>
        </div>

        {/* Foreground content — ensure it sits above the background */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <h1 className="hero-title text-6xl md:text-7xl font-bold mb-6">
          <span>
            <span className="shiny-text">Lost</span>
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent"> & </span>
            <span className="shiny-text">Found</span>
          </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connecting students with their belongings. Simple, safe, and effective way to reunite people with their items.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/lost-items"
              className="flex items-center justify-center space-x-2 border-2 border-orange-500 text-orange-500 px-5 py-3 rounded-full transition duration-200 hover:bg-orange-500 hover:text-white"
            >
              <Search className="w-5 h-5" />
              <span>Browse Lost Items</span>
            </Link>

            <Link
              to="/post-item"
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg transition duration-200 hover:shadow-[0_0_20px_rgba(255,165,0,0.8)]"
            >
              <Plus className="w-5 h-5" />
              <span>Post an Item</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-item text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to help you find your lost items or help others find theirs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 rounded-xl p-8 shadow-lg text-center border border-gray-700"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of students already using Lost & Found to reconnect with their belongings.
          </p>
          <Link
            to="/post-item"
            className="inline-flex items-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span>Post Your First Item</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
