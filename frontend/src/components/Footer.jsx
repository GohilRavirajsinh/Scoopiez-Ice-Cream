import { Link } from "react-router-dom";
const Footer = () => (<footer className="bg-chocolate text-vanilla py-12">
    <div className="container grid md:grid-cols-3 gap-8">
      <div>
        {/* TODO: Replace with your logo */}
        <h3 className="font-display text-2xl mb-2">🍦 Scoopiez</h3>
        <p className="text-vanilla/70 text-sm">
          Scooping happiness, one cone at a time.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
          <li><Link to="/products" className="hover:text-secondary transition-colors">Products</Link></li>
          <li><Link to="/reviews" className="hover:text-secondary transition-colors">Reviews</Link></li>
          <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-lg mb-3">Visit Us</h4>
        <p className="text-vanilla/70 text-sm">
          {/* TODO: Update with actual address */}
          123 Ice Cream Lane, Sweet City
          <br />Open Daily: 10 AM – 10 PM
        </p>
      </div>
    </div>
    <div className="container mt-8 pt-6 border-t border-vanilla/20 text-center text-sm text-vanilla/50">
      © {new Date().getFullYear()} Scoopiez Ice Cream. All rights reserved.
    </div>
  </footer>);
export default Footer;
