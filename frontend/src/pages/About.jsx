import { Suspense, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import AboutScene from "@/components/AboutScene";
// import { useAppContext } from "@/context/AppContext";
const About = () => {
    const shopBio = useSelector((state) => state.auth.shopBio);
    const [showLogin, setShowLogin] = useState(false);
    return (<div className="pt-24 pb-16">
      <div className="container max-w-3xl">
        <h1 className="font-display text-4xl text-center mb-4 animate-fade-up">
          About <span className="text-primary">Scoopiez</span>
        </h1>

        <Suspense fallback={null}><AboutScene className="mb-8"/></Suspense>

        <div className="space-y-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="bg-card rounded-2xl shadow-md p-8 hover:scale-[1.02] transition-transform">
            <h2 className="font-display text-2xl mb-3">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">{shopBio}</p>
          </div>

          {/* TODO: Add a photo of the shop / team here */}
          <div className="bg-card rounded-2xl shadow-md p-8 hover:scale-[1.02] transition-transform">
            <h2 className="font-display text-2xl mb-3">What Makes Us Special</h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "🥛 Sourced from local organic dairy farms",
                "🌍 Globally imported spices & authentic nut pastes",
                "🍃 Botanical infusions & seasonal fruit coulis",
                "🍫 Small-batch, single-origin chocolate brownies",
                "🌪️ Cold-pressed mixology for the creamiest shakes",
                "🎖️ Award-winning recipes by master pâtissiers"
              ].map((item) => (<li key={item} className="flex items-start gap-2"><span>{item}</span></li>))}
            </ul>
          </div>

          <div className="bg-card rounded-2xl shadow-md p-8 hover:scale-[1.02] transition-transform">
            <h2 className="font-display text-2xl mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To spread joy and create moments of pure happiness through our artisan ice cream,
              freshly baked brownies, and creamy shakes. Every product is an experience worth savoring.
            </p>
            {/* TODO: Add team photos here */}
          </div>
        </div>

        {/* Admin button */}
        <div className="mt-16 text-center">
          {!showLogin ? (<button onClick={() => setShowLogin(true)} className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
              🔒 Admin Access
            </button>) : (<AdminLoginBox onClose={() => setShowLogin(false)}/>)}
        </div>
      </div>
    </div>);
};
const AdminLoginBox = ({ onClose }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        const adminId = id.trim();
        const adminPass = pass.trim();
        
        // Simple logic check for the UI error state
        const ok = adminId === "admin" && adminPass === "scoopiez123";
        if (ok) {
            dispatch(login({ id: adminId, password: adminPass }));
        } else {
            setError(true);
        }
    };
    if (isLoggedIn) {
        return <Navigate to="/admin" replace/>;
    }
    return (<form onSubmit={handleLogin} className="bg-card rounded-2xl shadow-lg p-6 max-w-sm mx-auto animate-scale-in space-y-4">
      <h3 className="font-display text-lg">Admin Login</h3>
      {error && <p className="text-destructive text-sm">Invalid credentials!</p>}
      <input value={id} onChange={(e) => { setId(e.target.value); setError(false); }} placeholder="Admin ID" required className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none focus:ring-2 focus:ring-ring"/>
      <input value={pass} onChange={(e) => { setPass(e.target.value); setError(false); }} placeholder="Password" type="password" required className="w-full px-4 py-2 rounded-lg bg-muted border border-border outline-none focus:ring-2 focus:ring-ring"/>
      <div className="flex gap-3">
        <button type="submit" className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">Login</button>
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground">Cancel</button>
      </div>
    </form>);
};
export default About;
