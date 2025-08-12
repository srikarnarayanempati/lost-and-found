import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../context/ItemContext';
import { Upload, Plus, Check, X } from 'lucide-react';

const PostItem = () => {
  const navigate = useNavigate();
  const { addItem } = useItems();
  
  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    category: '',
    description: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Accessories',
    'Books',
    'Bags',
    'Jewelry',
    'Keys',
    'Documents',
    'Sports Equipment',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size should be less than 5MB'
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItem = addItem(formData);
      
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate(formData.type === 'lost' ? '/lost-items' : '/found-items');
      }, 2000);
      
    } catch (error) {
      console.error('Error posting item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your {formData.type} item has been posted and is now visible to other students.
          </p>
          <p className="text-sm text-gray-500">Redirecting you to the {formData.type} items page...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 pt-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Post an Item</h1>
          <p className="text-xl text-gray-600">
            Help your fellow students by posting lost or found items.
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6 text-gray-200">
            {/* Item Type Toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Item Type
              </label>
              <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                    formData.type === 'lost'
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-orange-400'
                  }`}
                >
                  🔍 Lost Item
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'found' }))}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                    formData.type === 'found'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-green-400'
                  }`}
                >
                  ✅ Found Item
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Item Image
              </label>
              <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-orange-500 transition-colors duration-200 bg-gray-900">
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
              </div>
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-200 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., iPhone 13 Pro, Black Backpack, etc."
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 border ${errors.title ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-200 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border ${errors.category ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-900 text-gray-200">
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description..."
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 border ${errors.description ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-200 mb-2">
                {formData.type === 'lost' ? 'Last Seen Location' : 'Found Location'} *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Library 2nd Floor..."
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 border ${errors.location ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-200 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@student.edu"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 border ${errors.contactEmail ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                />
                {errors.contactEmail && <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>}
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-semibold text-gray-200 mb-2">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white shadow-lg transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : formData.type === 'lost'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-700 hover:shadow-xl'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                `Post ${formData.type === 'lost' ? 'Lost' : 'Found'} Item`
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostItem;