import React, { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext();

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('lostFoundItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('lostFoundItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      datePosted: new Date().toISOString(),
    };
    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const lostItems = items.filter(item => item.type === 'lost');
  const foundItems = items.filter(item => item.type === 'found');

  return (
    <ItemContext.Provider value={{
      items,
      lostItems,
      foundItems,
      addItem
    }}>
      {children}
    </ItemContext.Provider>
  );
};