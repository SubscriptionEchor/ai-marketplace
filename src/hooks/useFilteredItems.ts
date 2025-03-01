import { useState, useMemo, useEffect } from 'react';

export function useFilteredItems<T extends { categories: string[] }>(
  items: T[],
  itemsPerPage: number = 12,
  initialFilter?: string
) {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize with category from URL if provided
  useEffect(() => {
    if (initialFilter) {
      setSelectedFilters(new Set([initialFilter]));
    }
  }, [initialFilter]);

  const filteredItems = useMemo(() => {
    if (selectedFilters.size === 0) return items;
    return items.filter(item => 
      item.categories.some(category => selectedFilters.has(category))
    );
  }, [items, selectedFilters]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSelectedFilters(new Set());
    setCurrentPage(1);
  };

  // Reset to first page when filter changes
  const handleFilterSelect = (filter: string) => {
    setSelectedFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
    setCurrentPage(1);
  };

  return {
    filteredItems: paginatedItems,
    totalItems: filteredItems.length,
    currentPage,
    totalPages,
    selectedFilters,
    clearFilters,
    setCurrentPage,
    handleFilterSelect
  };
}