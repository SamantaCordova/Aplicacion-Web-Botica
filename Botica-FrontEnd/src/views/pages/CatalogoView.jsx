import React from 'react';
import MainLayout from '../layouts/MainLayout';
import useCatalogoController from '../../controllers/CatalogoController'; 
import '../../styles/catalogo.css';
import { Link } from 'react-router-dom';

// Componente para la barra lateral de filtros
const ProductFilters = ({
  searchTerm,
  onSearchChange,
  priceMax,
  onPriceChange,
  presentations,
  onTogglePresentation,
  onClear,
  sortOption,
  setSortOption,
}) => {
  return (
    <aside className="filters-sidebar">
      <div className="filter-group">
        <label>Filtro de Búsqueda</label>
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Rango de precio</label>
        <div className="price-range">
          <span>S/.0 - {priceMax}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={priceMax}
            onChange={(e) => onPriceChange(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Presentación</label>
        <div>
          <input
            type="checkbox"
            checked={presentations.has('Tableta')}
            onChange={() => onTogglePresentation('Tableta')}
          /> Tableta
        </div>
        <div>
          <input
            type="checkbox"
            checked={presentations.has('Jarabe')}
            onChange={() => onTogglePresentation('Jarabe')}
          /> Jarabe
        </div>
        <div>
          <input
            type="checkbox"
            checked={presentations.has('Cápsulas')}
            onChange={() => onTogglePresentation('Cápsulas')}
          /> Cápsulas
        </div>
      </div>

      <div className="filter-actions">
        <button className="btn btn-primary" onClick={onClear}>Limpiar filtros</button>
      </div>
    </aside>
  );
};
 

    // Componente de producto
    const ProductItem = ({ product }) => {
      return (
        <div className="grid__item">
          <Link to={`/producto/${product.id}`} aria-label={`Ver detalle de ${product.name}`} title={`Ver detalle de ${product.name}`}>
            <img src={product.src} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price}</p>
          </Link>
        </div>
      );
    };


    function CatalogoView() {
  const {
    products,
    searchTerm,
    setSearchTerm,
    priceMax,
    setPriceMax,
    presentations,
    togglePresentation,
    sortOption,
    setSortOption,
    clearFilters,
  } = useCatalogoController();

      return (
        <MainLayout>
          <div className="catalogo-page-container">
            <ProductFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceMax={priceMax}
              onPriceChange={setPriceMax}
              presentations={presentations}
              onTogglePresentation={togglePresentation}
              sortOption={sortOption}
              setSortOption={setSortOption}
              onClear={clearFilters}
            />
            <div className="products-content">
              <div className="filter-pills-container">
                <span
                  className={`filter-pill ${sortOption === 'nuevo' ? 'active' : ''}`}
                  onClick={() => setSortOption('nuevo')}
                >
                  Nuevo
                </span>
                <span
                  className={`filter-pill ${sortOption === 'desc' ? 'active' : ''}`}
                  onClick={() => setSortOption('desc')}
                >
                  De mayor a menor
                </span>
                <span
                  className={`filter-pill ${sortOption === 'asc' ? 'active' : ''}`}
                  onClick={() => setSortOption('asc')}
                >
                  De menor a mayor
                </span>
                <span
                  className={`filter-pill ${sortOption === 'rating' ? 'active' : ''}`}
                  onClick={() => setSortOption('rating')}
                >
                  Puntuación
                </span>
              </div>
              
              <div className="products-grid">
                {/* Mapeo de productos filtrados */}
                {products && products.length > 0 ? (
                  products.map(product => (
                    <ProductItem key={product.id} product={product} />
                  ))
                ) : (
                  <p>No hay productos disponibles</p>
                )}
              </div>
            </div>
          </div>
        </MainLayout>
      );
    }

    export default CatalogoView;