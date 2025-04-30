import React from 'react';

function RestaurantHighlight({ name, cuisine, image, rating }) {
  return (
    <div className="bg-sky-100 rounded-sm shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{cuisine}</p>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-500 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.928c-.383-1.194-1.983-1.194-2.366 0L2.83 11.518c-.241.77.03 1.486.632 1.876l6.287 4.557c.347.251.792.251 1.139 0l6.287-4.557c.602-.39.893-1.106.632-1.876L9.049 2.928zM12 15.001l-3.84-2.787 1.17-3.657H15l-2.42 3.42L12 15.001z" />
          </svg>
          <span className="text-sm text-gray-700">{rating}</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantHighlight;