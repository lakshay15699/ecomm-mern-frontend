export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow p-3 flex flex-col">
      <img src={product.image} alt={product.name} className="h-44 w-full object-cover rounded-lg" />
      <div className="mt-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="font-bold">₹{product.price}</span>
        <button className="px-3 py-1 bg-emerald-600 text-white rounded">Add to Cart</button>
      </div>
    </div>
  );
}