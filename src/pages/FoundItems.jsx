import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';
import SearchFilter from '../components/SearchFilter';
import { CheckCircle } from 'lucide-react';

const FoundItems = () => {
  const { foundItems } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('date');

  const filteredAndSortedItems = useMemo(() => {
    let filtered = foundItems.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.datePosted) - new Date(a.datePosted);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    return filtered;
  }, [foundItems, searchTerm, selectedCategory, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-gray-900 text-gray-100 pt-24"
    >
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Found Items</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Browse through items that students have found. Recognize something? Reach out to claim it!
          </p>
        </div>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredAndSortedItems.length} of {foundItems.length} found items
          </p>
        </div>

        {/* Items Grid OR No Items Message */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {filteredAndSortedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-8">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              No found items available
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || selectedCategory !== 'All Categories'
                ? 'Try adjusting your search criteria or filters.'
                : 'No found items have been posted yet.'}
            </p>
            <motion.a
              href="/post-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-white"
            >
              Post a Found Item
            </motion.a>
          </div>
        )}
      </div>

      {/* Always show Post Found Item button when items exist */}
      {filteredAndSortedItems.length > 0 && (
        <div className="text-center mb-12">
          <motion.a
            href="/post-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-white"
          >
            Post a Found Item
          </motion.a>
        </div>
      )}
    </motion.div>
  );
};

export default FoundItems;
