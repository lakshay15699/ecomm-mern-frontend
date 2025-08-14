import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-gray-600 text-sm my-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-emerald-600">₹{product.price}</span>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Add to Cart</button>
        </div>
      </div>
    </div>
);
}
