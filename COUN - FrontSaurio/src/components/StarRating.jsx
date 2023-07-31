import React from "react";

const StarRating = ({ maxStars, readOnly, rating, onChangeRating }) => {
  const handleStarClick = (index, isHalf) => {
    if (!readOnly) {
      const newRating = index + (isHalf ? 0.5 : 1);
      onChangeRating(newRating); // Llamar a la función onChangeRating pasada por prop para actualizar la calificación en la página
    }
  };

  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          className={`star ${index + 1 <= rating ? "filled" : ""} ${
            index + 0.5 === rating ? "half-filled" : ""
          }`}
          onClick={() => handleStarClick(index, false)}
          onMouseEnter={() => handleStarClick(index, false)}
          onMouseLeave={() => handleStarClick(Math.floor(rating) - 1, false)}
        >
          &#9733;
        </span>
      ))}
    </div>
    
  );
};

export default StarRating;




