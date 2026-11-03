import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import electronicsImg1 from "../assets/electronics1.jpg";
import electronicsImg2 from "../assets/electronics2.jpg";

import mensImg from "../assets/mens.jpg";

import jewelryImg1 from "../assets/categories/jewellery1.jpg";
import jewelryImg2 from "../assets/categories/jewellery2.jpg";
import jewelryImg3 from "../assets/categories/jewellery3.jpg";
import jewelryImg4 from "../assets/categories/jewellery4.jpg";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const Home = () => {
  const banners = [banner1, banner2, banner3];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-banner">
        <img
          src={banners[currentBanner]}
          alt="banner"
          className="hero-bg"
        />

        <div className="hero-content">
          <span className="sale-tag">🔥 Mega Sale</span>

          <h1>Up To 70% OFF</h1>

          <p>
            Discover thousands of products
            <br />
            at unbeatable prices.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="hero-btn">
              Shop Now
            </Link>

            <Link
              to="/products"
              className="hero-btn hero-btn-secondary"
            >
              View Deals
            </Link>
          </div>

          
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop By Category</h2>

        <div className="category-grid">

          {/* Electronics */}
          <div
            className="category-card"
            onClick={() => (window.location.href = "/products")}
          >
            <div className="electronics-grid">
              <img
                src={electronicsImg1}
                alt="Electronics"
              />

              <img
                src={electronicsImg2}
                alt="Electronics"
              />
            </div>

            <h3>Electronics</h3>
          </div>

          {/* Men's Clothing */}
          <div
            className="category-card"
            onClick={() => (window.location.href = "/products")}
          >
            <img
              src={mensImg}
              alt="Men's Clothing"
            />

            <h3 className="mens-title">
              Men's Clothing
            </h3>
          </div>

          {/* Jewellery */}
          <div
            className="category-card"
            onClick={() => (window.location.href = "/products")}
          >
            <div className="jewelry-grid">
              <img src={jewelryImg1} alt="Jewelry" />
              <img src={jewelryImg2} alt="Jewelry" />
              <img src={jewelryImg3} alt="Jewelry" />
              <img src={jewelryImg4} alt="Jewelry" />
            </div>

            <h3>Jewellery</h3>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <h2>5000+</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>1000+</h2>
          <p>Customers</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Brands</p>
        </div>
      </section>
    </div>
  );
};

export default Home;