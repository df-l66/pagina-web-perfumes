import { useState, useMemo } from 'react';
import type { Product } from '../types';
import { type QualityType } from '../utils/quality';
import { useWishlist } from '../context/WishlistContext';

export type SortOption = 'featured' | 'newest';

interface UseCatalogFiltersProps {
  products: Product[];
}

export function useCatalogFilters({ products }: UseCatalogFiltersProps) {
  const { wishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
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
    setSelectedQualities([]);
    setShowOnlyFavorites(false);
    setSearchQuery('');
  };

  const activeQuality = selectedQualities.length > 0 ? (selectedQualities[0] as QualityType) : undefined;

  const filteredProducts = useMemo(() => {
    let result = products;

    if (showOnlyFavorites) {
      result = result.filter(p => wishlist.includes(p.id));
    }

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

    // Ordenamiento
    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    return result;
  }, [products, selectedCategories, selectedBrands, selectedFamilies, showOnlyFavorites, wishlist, sortBy, searchQuery]);

  return {
    searchQuery, setSearchQuery,
    selectedBrands, setSelectedBrands,
    selectedCategories, setSelectedCategories,
    selectedFamilies, setSelectedFamilies,
    selectedQualities, setSelectedQualities,
    showOnlyFavorites, setShowOnlyFavorites,
    activeQuality,
    sortBy, setSortBy,
    visibleCount, setVisibleCount,
    toggleFilter,
    clearFilters,
    filteredProducts
  };
}
