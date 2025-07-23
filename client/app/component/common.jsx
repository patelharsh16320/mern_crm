'use client';
import { useState } from 'react';

export const useSortable = (data = []) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const parseValue = (val) => {
    if (!val) return '';    
    if (typeof val === 'string' && val.includes(' at ')) {
      const parsed = new Date(val.replace(' at ', ', '));
      return parsed instanceof Date && !isNaN(parsed) ? parsed : val;
    }
    return typeof val === 'string' ? val.toLowerCase() : val;
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = parseValue(a[sortConfig.key]);
    const bVal = parseValue(b[sortConfig.key]);

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return { sortedData, sortConfig, handleSort };
};
