import { useState } from "react";
import { useSelector } from "react-redux";
// import { useAppContext } from "@/context/AppContext";
import productIcecreamImg from "@/assets/product-icecream.png";
import productBrownieImg from "@/assets/product-brownie.png";
import productShakeImg from "@/assets/product-shake.png";
const categoryImages = {
    icecream: productIcecreamImg,
    brownie: productBrownieImg,
    shake: productShakeImg,
};
const categoryEmoji = {
    icecream: "🍦",
    brownie: "🍫",
    shake: "🥤",
};
const tabs = [
    { key: "all", label: "All" },
    { key: "icecream", label: "🍦 Ice Creams" },
    { key: "brownie", label: "🍫 Brownies" },
    { key: "shake", label: "🥤 Shakes" },
];
const Products = () => {
    const products = useSelector((state) => state.products.products);
    const [active, setActive] = useState("all");
    const [search, setSearch] = useState("");
    const filtered = products.filter((p) => {
        const matchCat = active === "all" || p.category === active;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });
    return (<div className="pt-24 pb-16">
      <div className="container">
        <h1 className="font-display text-4xl text-center mb-2 animate-fade-up">
          Our <span className="text-primary">Menu</span>
        </h1>
        <p className="text-muted-foreground text-center mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Explore our handcrafted collection of ice creams, brownies & shakes
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full px-5 py-3 rounded-full bg-card border border-border text-foreground focus:ring-2 focus:ring-ring outline-none shadow-sm"/>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((t) => (<button key={t.key} onClick={() => setActive(t.key)} className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${active === t.key
                ? "bg-primary text-primary-foreground scale-105"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"}`}>
              {t.label}
            </button>))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (<div key={p.id} className="bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              {/* TODO: Replace with actual product photos */}
              <div className="h-40 bg-gradient-to-br from-muted to-cream overflow-hidden relative">
                <img src={p.image || categoryImages[p.category]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={256} height={160}/>
                <span className="absolute top-2 left-2 text-2xl">{categoryEmoji[p.category]}</span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-base mb-1">{p.name}</h3>
                <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-primary">₹{p.price}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground capitalize">{p.category}</span>
                </div>
              </div>
            </div>))}
        </div>

        {filtered.length === 0 && (<p className="text-center text-muted-foreground py-12">No products found. Try a different search!</p>)}
      </div>
    </div>);
};
export default Products;
