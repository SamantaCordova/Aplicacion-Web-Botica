import { useState, useMemo, useCallback } from 'react';
import { initialProducts } from '../models/CatalogoModel';

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const n = Number(priceStr.replace('S/.', '').replace(',', '.').trim());
  return isNaN(n) ? 0 : n;
};

export default function useCatalogoController() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceMax, setPriceMax] = useState(100); // soles
  const [presentations, setPresentations] = useState(new Set()); // 'Tableta', 'Jarabe', 'Cápsulas'
  const [sortOption, setSortOption] = useState('nuevo'); // 'nuevo' | 'desc' | 'asc' | 'rating'

  const togglePresentation = useCallback((name) => {
    setPresentations(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setPriceMax(100);
    setPresentations(new Set());
    setSortOption('nuevo');
  }, []);

  const products = initialProducts;

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Buscar por nombre (case-insensitive)
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    // Rango de precio (0 - priceMax)
    list = list.filter(p => parsePrice(p.price) <= priceMax);

    // Presentación seleccionada(s)
    if (presentations.size > 0) {
      list = list.filter(p => presentations.has(p.presentation));
    }

    // Orden
    if (sortOption === 'asc') {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === 'desc') {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOption === 'nuevo') {
      list.sort((a, b) => b.id - a.id);
    }
    // 'rating' no implementado por no existir campo; queda como orden por defecto

    return list;
  }, [products, searchTerm, priceMax, presentations, sortOption]);

  return {
    // datos
    products: filteredProducts,
    // filtros y controladores
    searchTerm,
    setSearchTerm,
    priceMax,
    setPriceMax,
    presentations,
    togglePresentation,
    sortOption,
    setSortOption,
    clearFilters,
  };
}