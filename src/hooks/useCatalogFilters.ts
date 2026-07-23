import { useState, useMemo } from 'react';
import type { Product } from '../types';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

interface UseCatalogFiltersProps {
  products: Product[];
}

export function useCatalogFilters({ products }: UseCatalogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLineas, setSelectedLineas] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [visibleCount, setVisibleCount] = useState(18);

  const toggleFilter = (
    currentList: string[], 
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    item: string
  ) => {
    if (currentList.includes(item)) {
      setter(currentList.filter(i => i !== item));
    } else {
      setter([...currentList, item]);
    }
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedFamilies([]);
    setSelectedTypes([]);
    setSelectedLineas([]);
    setMaxPrice(500);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    if (selectedFamilies.length > 0) {
      result = result.filter(p => selectedFamilies.includes(p.family));
    }
    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.type));
    }
    if (selectedLineas.length > 0) {
      result = result.filter(p => p.linea && selectedLineas.includes(p.linea));
    }
    
    result = result.filter(p => p.price <= maxPrice);

    // Ordenamiento
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    return result;
  }, [products, selectedCategories, selectedBrands, selectedFamilies, selectedTypes, selectedLineas, maxPrice, sortBy, searchQuery]);

  return {
    searchQuery, setSearchQuery,
    selectedBrands, setSelectedBrands,
    selectedCategories, setSelectedCategories,
    selectedFamilies, setSelectedFamilies,
    selectedTypes, setSelectedTypes,
    selectedLineas, setSelectedLineas,
    maxPrice, setMaxPrice,
    sortBy, setSortBy,
    visibleCount, setVisibleCount,
    toggleFilter,
    clearFilters,
    filteredProducts
  };
}
