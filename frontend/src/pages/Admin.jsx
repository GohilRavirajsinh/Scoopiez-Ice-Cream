import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { addProduct, deleteProduct, addCombo, deleteCombo, addOffer, deleteOffer } from "@/store/slices/productSlice";
import { deleteReview } from "@/store/slices/reviewSlice";
import { updateBio } from "@/store/slices/authSlice";
// import { useAppContext } from "@/context/AppContext";
const tabs = ["Products", "Combos", "Offers", "Reviews", "Settings"];
const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [tab, setTab] = useState("Products");
    
    if (!isLoggedIn) {
        return <Navigate to="/about" replace/>;
    }
    const handleLogout = () => { dispatch(logout()); navigate("/"); };
    return (<div className="pt-24 pb-16">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl">🔧 Admin Panel</h1>
          <button onClick={handleLogout} className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-bold text-sm hover:bg-destructive/90">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (<button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${tab === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}>
              {t}
            </button>))}
        </div>

        {tab === "Products" && <ProductsTab />}
        {tab === "Combos" && <CombosTab />}
        {tab === "Offers" && <OffersTab />}
        {tab === "Reviews" && <ReviewsTab />}
        {tab === "Settings" && <SettingsTab />}
      </div>
    </div>);
};
/* --- Products Tab --- */
const ProductsTab = () => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("icecream");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const handleImg = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !price)
            return;
        dispatch(addProduct({ name, category, price: Number(price), description: desc, image }));
        setName("");
        setPrice("");
        setDesc("");
        setImage("");
    };
    return (<div>
      <form onSubmit={handleAdd} className="bg-card rounded-2xl shadow p-6 space-y-3 mb-8">
        <h3 className="font-display text-lg">Add Product</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" required className="px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (₹)" type="number" required className="px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none">
          <option value="icecream">🍦 Ice Cream</option>
          <option value="brownie">🍫 Brownie</option>
          <option value="shake">🥤 Shake</option>
        </select>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" rows={2} className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none resize-none"/>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Product Photo</label>
          <input type="file" accept="image/*" onChange={handleImg} className="text-sm"/>
          {image && <img src={image} alt="" className="w-16 h-16 object-cover rounded mt-2"/>}
        </div>
        <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90">Add Product</button>
      </form>

      <div className="space-y-3">
        {products.map((p) => (<div key={p.id} className="bg-card rounded-xl shadow-sm p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover"/> : <span className="flex items-center justify-center h-full text-xl">{p.category === "icecream" ? "🍦" : p.category === "brownie" ? "🍫" : "🥤"}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{p.category} · ₹{p.price}</p>
            </div>
            <button onClick={() => dispatch(deleteProduct(p.id))} className="text-destructive text-sm font-bold hover:bg-destructive/10 px-3 py-1 rounded">Delete</button>
          </div>))}
      </div>
    </div>);
};
/* --- Combos Tab --- */
const CombosTab = () => {
    const combos = useSelector((state) => state.products.combos);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [items, setItems] = useState("");
    const [orig, setOrig] = useState("");
    const [combo, setCombo] = useState("");
    const [image, setImage] = useState("");
    const handleImg = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !orig || !combo)
            return;
        dispatch(addCombo({ name, items, originalPrice: Number(orig), comboPrice: Number(combo), image }));
        setName("");
        setItems("");
        setOrig("");
        setCombo("");
        setImage("");
    };
    return (<div>
      <form onSubmit={handleAdd} className="bg-card rounded-2xl shadow p-6 space-y-3 mb-8">
        <h3 className="font-display text-lg">Create Combo</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Combo name" required className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
        <input value={items} onChange={(e) => setItems(e.target.value)} placeholder="Items (e.g., 2 Scoops + 1 Brownie)" required className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
        <div className="grid grid-cols-2 gap-3">
          <input value={orig} onChange={(e) => setOrig(e.target.value)} placeholder="Original price (₹)" type="number" required className="px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
          <input value={combo} onChange={(e) => setCombo(e.target.value)} placeholder="Combo price (₹)" type="number" required className="px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Combo Photo</label>
          <input type="file" accept="image/*" onChange={handleImg} className="text-sm"/>
        </div>
        <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90">Add Combo</button>
      </form>

      <div className="space-y-3">
        {combos.map((c) => (<div key={c.id} className="bg-card rounded-xl shadow-sm p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.items} · <span className="line-through">₹{c.originalPrice}</span> → ₹{c.comboPrice}</p>
            </div>
            <button onClick={() => dispatch(deleteCombo(c.id))} className="text-destructive text-sm font-bold hover:bg-destructive/10 px-3 py-1 rounded">Delete</button>
          </div>))}
      </div>
    </div>);
};
/* --- Offers Tab --- */
const OffersTab = () => {
    const offers = useSelector((state) => state.products.offers);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [discount, setDiscount] = useState("");
    const [validTill, setValidTill] = useState("");
    const [badge, setBadge] = useState("🔥 HOT");
    const [image, setImage] = useState("");
    const handleImg = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if (!title)
            return;
        dispatch(addOffer({ title, description: desc, discount: Number(discount), validTill, badge, image }));
        setTitle("");
        setDesc("");
        setDiscount("");
        setValidTill("");
        setImage("");
    };
    return (<div>
      <form onSubmit={handleAdd} className="bg-card rounded-2xl shadow p-6 space-y-3 mb-8">
        <h3 className="font-display text-lg">Create Offer</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Offer title" required className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" rows={2} className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none resize-none"/>
        <div className="grid grid-cols-3 gap-3">
          <input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount %" type="number" className="px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
          <input value={validTill} onChange={(e) => setValidTill(e.target.value)} placeholder="Valid till" type="date" className="px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
          <input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Badge text" className="px-4 py-2 rounded-lg bg-muted border border-border outline-none"/>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Offer Banner</label>
          <input type="file" accept="image/*" onChange={handleImg} className="text-sm"/>
        </div>
        <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90">Add Offer</button>
      </form>

      <div className="space-y-3">
        {offers.map((o) => (<div key={o.id} className="bg-card rounded-xl shadow-sm p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">{o.badge} {o.title}</p>
              <p className="text-xs text-muted-foreground">{o.description} {o.discount > 0 && `· ${o.discount}% off`}</p>
            </div>
            <button onClick={() => dispatch(deleteOffer(o.id))} className="text-destructive text-sm font-bold hover:bg-destructive/10 px-3 py-1 rounded">Delete</button>
          </div>))}
      </div>
    </div>);
};
/* --- Reviews Tab --- */
const ReviewsTab = () => {
    const reviews = useSelector((state) => state.reviews.reviews);
    const dispatch = useDispatch();
    const handleDeleteReview = (review) => {
        const ok = window.confirm(`Delete review from ${review.name}?`);
        if (!ok)
            return;
        dispatch(deleteReview(review.id));
    };
    return (<div className="bg-card rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg">Manage Reviews</h3>
        <p className="text-sm text-muted-foreground">Total: {reviews.length}</p>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Remove reviews with mistakes or inappropriate language.
      </p>
      {reviews.length === 0 ? (<div className="text-center py-10 text-muted-foreground">
          No reviews available.
        </div>) : (<div className="space-y-3">
          {reviews.map((review) => (<div key={review.id} className="bg-background/80 rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-sm">{review.name}</p>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground capitalize">
                      {review.type}
                    </span>
                    <span className="text-xs text-secondary-foreground">
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">
                    {review.comment}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                </div>
                <button onClick={() => handleDeleteReview(review)} className="text-destructive text-sm font-bold hover:bg-destructive/10 px-3 py-1 rounded whitespace-nowrap">
                  Delete
                </button>
              </div>
            </div>))}
        </div>)}
    </div>);
};
/* --- Settings Tab --- */
const SettingsTab = () => {
    const bio = useSelector((state) => state.auth.shopBio);
    const dispatch = useDispatch();
    const [text, setText] = useState(bio);
    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        dispatch(updateBio(text));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };
    return (<div className="bg-card rounded-2xl shadow p-6 space-y-4">
      <h3 className="font-display text-lg">Shop Settings</h3>
      <div>
        <label className="text-sm font-semibold text-muted-foreground block mb-2">Shop Bio / About Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none resize-none"/>
      </div>
      <button onClick={handleSave} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90">
        Save Settings
      </button>
      {saved && <p className="text-accent font-semibold animate-fade-up">✓ Settings saved!</p>}
    </div>);
};
export default Admin;
