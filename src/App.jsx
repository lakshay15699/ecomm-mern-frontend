import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard.jsx";

const API = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(json => {
        // productRoutes returns { data, pagination } or raw array depending on seed usage
        const items = Array.isArray(json) ? json : (json.data || []);
        setProducts(items);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  const filtered = products.filter(p => {
    return p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">FinMeta E-Store</h1>
        <p className="text-gray-600">Demo store for internship submission</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex gap-3 mb-4 flex-wrap">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="border p-2 rounded w-full md:w-1/3" />
          <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 rounded">
            <option value="">All Categories</option>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={()=>{setSearch('');setCategory('');}} className="bg-gray-200 px-3 rounded">Reset</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(p=> <ProductCard key={p._id || p.name} product={p} />)}
        </div>
      </main>
      <footer className="text-center text-sm text-gray-500 py-6">© FinMeta E-Store</footer>
    </div>
  );
}
