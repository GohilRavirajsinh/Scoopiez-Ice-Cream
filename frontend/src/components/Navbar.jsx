import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/reviews", label: "Reviews" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
];
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    return (<nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* TODO: Replace with your logo */}
        <Link to="/" className="font-display text-2xl text-primary">
          🍦 Scoopiez
        </Link>
        
        {/* Desktop */}
        <ul className="hidden md:flex gap-1">
          {navLinks.map((l) => (<li key={l.path}>
              <Link to={l.path} className={cn("px-4 py-2 rounded-lg font-semibold transition-colors", pathname === l.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground")}>
                {l.label}
              </Link>
            </li>))}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (<ul className="md:hidden bg-card border-t px-4 pb-4 animate-fade-up">
          {navLinks.map((l) => (<li key={l.path}>
              <Link to={l.path} onClick={() => setOpen(false)} className={cn("block py-3 px-4 rounded-lg font-semibold", pathname === l.path ? "bg-primary text-primary-foreground" : "text-foreground")}>
                {l.label}
              </Link>
            </li>))}
        </ul>)}
    </nav>);
};
export default Navbar;
