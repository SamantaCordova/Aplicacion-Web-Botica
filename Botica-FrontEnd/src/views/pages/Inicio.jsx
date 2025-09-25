import React, { useState, useEffect, useRef } from 'react';
import '../../styles/inicio.css';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

// Componente de flecha para navegación
const Arrow = ({ direction, onClick }) => (
  <button 
    className={`slider__arrow slider__arrow--${direction}`}
    onClick={onClick}
    aria-label={`Ir a ${direction === 'left' ? 'anterior' : 'siguiente'}`}
  >
    {direction === 'left' ? '❮' : '❯'}
  </button>
);

// Componente del Slider
const ImageSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef();
  const sliderRef = useRef(null);

  const goToSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    setCurrentSlide(index);
    
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  // Efecto para el autoplay continuo
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);
  
  // Efecto para manejar el scroll infinito
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const slideWidth = sliderRef.current.offsetWidth;
    
    // Si llegamos al final, hacemos una transición suave al principio
    if (currentSlide >= slides.length) {
      const resetSlider = () => {
        sliderRef.current.scrollTo({
          left: 0,
          behavior: 'auto'
        });
        setCurrentSlide(0);
      };
      
      // Primero animamos al último slide
      sliderRef.current.scrollTo({
        left: (slides.length) * slideWidth,
        behavior: 'smooth'
      });
      
      // Luego reseteamos sin animación
      const timer = setTimeout(resetSlider, 500);
      return () => clearTimeout(timer);
    } else {
      // Navegación normal
      sliderRef.current.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSlide, slides.length]);

  return (
    <section 
      className="catalogo__slider"
      aria-label="Slider de productos destacados"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider__viewport" ref={sliderRef}>
        <div className="slider__track">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slider__slide ${index === currentSlide ? 'active' : ''}`}
              aria-hidden={index !== currentSlide}
            >
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>
      </div>

      <Arrow direction="left" onClick={prevSlide} />
      <Arrow direction="right" onClick={nextSlide} />

      <div className="slider__indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider__indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

// Componente principal de Inicio
const Inicio = () => {
  const sliderImages = [
    { id: 1, src: "/assets/slider1.JPG", alt: "Producto destacado 1" },
    { id: 2, src: "/assets/slider2.JPG", alt: "Producto destacado 2" },
    { id: 3, src: "/assets/slider3.JPG", alt: "Producto destacado 3" }
  ];

  const gridImages = [
    { id: 1, src: "/assets/grid-1.JPG", alt: "Producto 1" },
    { id: 2, src: "/assets/grid-2.JPG", alt: "Producto 2" },
    { id: 3, src: "/assets/grid-3.JPG", alt: "Producto 3" },
    { id: 4, src: "/assets/grid-4.JPG", alt: "Producto 4" },
    { id: 5, src: "/assets/grid-5.JPG", alt: "Producto 5" },
    { id: 6, src: "/assets/grid-6.JPG", alt: "Producto 6" }
  ];

  return (
    <div className="ecosalud-root">
      <Header onSearchChange={() => {}} onSearchKeyPress={() => {}} />
      <main className="catalogo">
        <div className="banner-container">
          <ImageSlider slides={sliderImages} />
        </div>

        <header className="catalogo__header" aria-label="Bienvenido a nuestra tienda">
          <h1 className="catalogo__title">
            Bienveni<span className="catalogo__title-accent">dos</span>
          </h1>
          <p className="catalogo__subtitle">Descubre nuestros productos destacados y novedades</p>
        </header>

        <section className="catalogo__grid">
          {gridImages.map((image) => (
            <div key={image.id} className="grid__item">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;
