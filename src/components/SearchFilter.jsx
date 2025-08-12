import React from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  sortBy,
  setSortBy 
}) => {
  const categories = [
    'All Categories',
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

  const sortOptions = [
    { value: 'date', label: 'Date Posted' },
    { value: 'title', label: 'Item Name' },
    { value: 'category', label: 'Category' },
    { value: 'location', label: 'Location' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-gray-900 text-gray-200 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-700 bg-gray-900 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[200px]"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-gray-900 text-gray-200">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="relative">
          <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-700 bg-gray-900 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[180px]"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-900 text-gray-200">
                Sort by {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
