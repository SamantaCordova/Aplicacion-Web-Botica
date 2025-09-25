import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { initialProducts } from '../../models/CatalogoModel';
import ProductCard from '../partials/ProductCard';
import '../../styles/ProductDetail.css';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../../controllers/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const { addToCart } = useCart(); // Hook para agregar al carrito

  useEffect(() => {
    // Find the current product
    const currentProduct = initialProducts.find(p => p.id === parseInt(id));
    setProduct(currentProduct || null);

    // Find similar products (excluding the current one)
    if (currentProduct) {
      const similar = initialProducts
        .filter(p => p.id !== currentProduct.id && p.presentation === currentProduct.presentation)
        .slice(0, 3);
      setSimilarProducts(similar);
      setNotFound(false);
    } else {
      setSimilarProducts([]);
      setNotFound(true);
    }
  }, [id]);

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    
    alert(`Se agregaron ${quantity} ${product.name} al carrito`);
  };

  if (notFound) {
    return (
      <>
        <Helmet>
          <title>Producto no encontrado | Farmacia Online</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <MainLayout>
          <div className="loading" role="alert" aria-live="polite">
            Producto no encontrado.
            <div>
              <button className="pd-back-btn" onClick={() => navigate('/catalogo')} aria-label="Volver al catálogo">
                Volver al catálogo
              </button>
            </div>
          </div>
        </MainLayout>
      </>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="loading" aria-live="polite">Cargando producto...</div>
      </MainLayout>
    );
  }

  // Generar datos estructurados para SEO
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.src,
    description: product.description || `${product.name} - Presentación: ${product.presentation}`,
    offers: {
      '@type': 'Offer',
      price: product.price.replace('S/.', '').trim(),
      priceCurrency: 'PEN',
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Farmacia Online`}</title>
        <meta name="description" content={(product.description ? `${product.description} Precio: ${product.price}` : `${product.name} - ${product.presentation}. Precio: ${product.price}`)} />
        <meta name="keywords" content={`${product.name}, ${product.presentation}, farmacia, medicamentos`} />
        <meta property="og:title" content={`${product.name} | Farmacia Online`} />
        <meta property="og:description" content={product.description || `${product.name} - ${product.presentation}`} />
        <meta property="og:image" content={product.src} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price.replace('S/.', '').trim()} />
        <meta property="product:price:currency" content="PEN" />
        <link rel="canonical" href={`${window.location.origin}/producto/${id}`} />
        <script type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </script>
      </Helmet>

      <MainLayout>
        <article className="product-detail-container" itemScope itemType="https://schema.org/Product">
          <header className="pd-header" role="banner">
            <button 
              className="pd-back-btn" 
              onClick={() => navigate(-1)}
              aria-label="Volver a la página anterior"
            >
              ←
            </button>
            <h1 className="pd-header-title" itemProp="name">Detalle del Producto</h1>
          </header>

          <main className="main-content" role="main">
            <ProductCard product={product} onAddToCart={handleAddToCart} />
            
            {similarProducts.length > 0 && (
              <section className="similar-products" aria-labelledby="similar-products-heading">
                <h2 id="similar-products-heading" className="section-title">Productos similares</h2>
                <div className="similar-products-grid" role="list">
                  {similarProducts.map(similarProduct => (
                    <article 
                      key={similarProduct.id} 
                      className="similar-product-card"
                      role="listitem"
                      itemScope
                      itemType="https://schema.org/Product"
                    >
                      <div className="similar-product-image">
                        <img 
                          src={similarProduct.src} 
                          alt={similarProduct.name} 
                          itemProp="image"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                      </div>
                      <div className="similar-product-info">
                        <h3 className="similar-product-title" itemProp="name">
                          {similarProduct.name}
                        </h3>
                        <div className="similar-product-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <span itemProp="price" content={similarProduct.price.replace('S/.', '').trim()}>
                            {similarProduct.price}
                          </span>
                          <meta itemProp="priceCurrency" content="PEN" />
                        </div>
                        <button 
                          className="add-btn"
                          onClick={() => navigate(`/producto/${similarProduct.id}`)}
                          aria-label={`Ver detalles de ${similarProduct.name}`}
                        >
                          Ver Detalle
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </main>
        </article>
      </MainLayout>
    </>
  );
};

export default ProductDetail;
