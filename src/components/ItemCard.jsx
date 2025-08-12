import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Mail, Phone, User } from 'lucide-react';

const ItemCard = ({ item }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (type) => {
    return type === 'lost' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        rotateX: 2,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={item.image || 'https://images.pexels.com/photos/1005012/pexels-photo-1005012.jpeg'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.type)}`}>
            {item.type === 'lost' ? '🔍 Lost' : '✅ Found'}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(item.datePosted)}
          </div>
        </div>

        {/* Title and Category */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-sm text-orange-600 font-medium mb-3">{item.category}</p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1 text-secondary-500" />
          <span>{item.location}</span>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <User className="w-4 h-4 mr-1" />
            Contact Information
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-2 text-gray-400" />
              <span>{item.contactEmail}</span>
            </div>
            {item.contactPhone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2 text-gray-400" />
                <span>{item.contactPhone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;