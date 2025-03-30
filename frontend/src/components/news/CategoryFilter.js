import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaGlobe, FaBriefcase, FaFilm, FaHeartbeat, FaFlask, FaFootballBall, FaMicrochip, FaBalanceScale } from 'react-icons/fa';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All', icon: <FaGlobe /> },
    { id: 'business', name: 'Business', icon: <FaBriefcase /> },
    { id: 'entertainment', name: 'Entertainment', icon: <FaFilm /> },
    { id: 'health', name: 'Health', icon: <FaHeartbeat /> },
    { id: 'science', name: 'Science', icon: <FaFlask /> },
    { id: 'sports', name: 'Sports', icon: <FaFootballBall /> },
    { id: 'technology', name: 'Technology', icon: <FaMicrochip /> },
    { id: 'politics', name: 'Politics', icon: <FaBalanceScale /> },
  ];

  return (
    <div className="category-filter mb-4">
      <h5 className="mb-3">Filter by Category</h5>
      <div className="d-flex flex-wrap">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'primary' : 'outline-primary'}
            className="me-2 mb-2 d-flex align-items-center"
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="me-1">{category.icon}</span> {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
