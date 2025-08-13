import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async (p = 1) => {
    const params = new URLSearchParams({
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page: p,
      limit: 9
    });
    const res = await fetch(`${API}/api/products?` + params.toString());
    const json = await res.json();
    setProducts(json.data || []);
    setPages(json.pagination?.pages || 1);
    setPage(json.pagination?.page || 1);
  };

  useEffect(() => { fetchProducts(1) }, []);

  const categories = ["Electronics", "Clothing", "Footwear", "Accessories"];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">🛍️ Please Lelo</h1>
        <div className="flex gap-2 flex-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border rounded px-3 py-2 w-56"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} placeholder="Min ₹" className="border rounded px-3 py-2 w-28" />
          <input type="number" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="Max ₹" className="border rounded px-3 py-2 w-28" />
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="border rounded px-3 py-2">
            <option value="createdAt:desc">Newest</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="name:asc">Name A→Z</option>
            <option value="name:desc">Name Z→A</option>
          </select>
          <button onClick={()=>fetchProducts(1)} className="bg-blue-600 text-white rounded px-4 py-2">Apply</button>
          <button onClick={()=>{setSearch('');setCategory('');setMinPrice('');setMaxPrice('');setSort('createdAt:desc');fetchProducts(1);}} className="bg-gray-200 rounded px-4 py-2">Reset</button>
        </div>
      </header>

      <main className="p-4 max-w-6xl mx-auto">
        {products.length === 0 ? (
          <p className="text-gray-600">No products found. Try adjusting filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p._id} className="bg-white rounded-xl shadow p-3 flex flex-col">
                <img src={p.image} alt={p.name} className="h-44 w-full object-cover rounded-lg" />
                <div className="mt-2">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-gray-600 text-sm">{p.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="font-bold">₹{p.price}</span>
                  <button className="px-3 py-1 bg-emerald-600 text-white rounded">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button disabled={page<=1} onClick={()=>fetchProducts(page-1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page>=pages} onClick={()=>fetchProducts(page+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </main>
      <footer className="text-center text-xs text-gray-500 py-6">© {new Date().getFullYear()} ShopEasy</footer>
    </div>
  );
}
