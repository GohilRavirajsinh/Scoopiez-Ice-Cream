import { Link } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { useAppContext } from "@/context/AppContext";
import heroImg from "@/assets/hero-icecream.png";
import offerBanner from "@/assets/offer-banner.png";
import comboBanner from "@/assets/combo-banner.png";
import IceCreamScene from "@/components/IceCreamScene";
import ReviewCard from "@/components/ReviewCard";
const useInView = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
        } }, { threshold: 0.15 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
};
const Section = ({ children, className = "" }) => {
    const { ref, visible } = useInView();
    return <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>{children}</div>;
};
const Home = () => {
    const allReviews = useSelector((state) => state.reviews.reviews);
    const offers = useSelector((state) => state.products.offers);
    const combos = useSelector((state) => state.products.combos);
    const reviews = allReviews.slice(0, 3);
    return (<div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <img src={heroImg} alt="Delicious ice cream" className="absolute inset-0 w-full h-full object-cover" width={1280} height={720}/>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent"/>
        <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-display text-primary-foreground mb-4 animate-fade-up">
              Scoopiez<br /><span className="text-secondary">Ice Cream</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-md mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Handcrafted happiness in every scoop. Made fresh daily with love.
            </p>
            <div className="flex gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Link to="/products" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Our Menu 🍦
              </Link>
              <Link to="/contact" className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Visit Us
              </Link>
            </div>
          </div>
          <div className="hidden md:block h-[450px]">
            <Suspense fallback={null}><IceCreamScene /></Suspense>
          </div>
        </div>
      </section>

      {/* Offers */}
      {offers.length > 0 && (<Section>
          <section className="bg-cream py-16">
            <div className="container">
              <h2 className="font-display text-3xl md:text-4xl text-center mb-10">
                🔥 <span className="text-primary">Hot</span> Offers
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {offers.map((o, i) => (<div key={o.id} className="bg-card rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform group" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="relative h-40 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                      {o.image ? (<img src={o.image} alt={o.title} className="w-full h-full object-cover" loading="lazy"/>) : (<img src={offerBanner} alt={o.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"/>)}
                      <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full animate-bounce-slow">
                        {o.badge}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg mb-1">{o.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{o.description}</p>
                      {o.discount > 0 && (<span className="inline-block bg-destructive/10 text-destructive font-bold text-sm px-3 py-1 rounded-full">
                          {o.discount}% OFF
                        </span>)}
                    </div>
                  </div>))}
              </div>
            </div>
          </section>
        </Section>)}

      {/* Combos */}
      {combos.length > 0 && (<Section>
          <section className="py-16">
            <div className="container">
              <h2 className="font-display text-3xl md:text-4xl text-center mb-10">
                🎉 Super <span className="text-secondary">Combos</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {combos.map((c, i) => (<div key={c.id} className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="h-40 bg-gradient-to-br from-secondary/30 to-primary/20 overflow-hidden">
                      {c.image ? (<img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy"/>) : (<img src={comboBanner} alt={c.name} className="w-full h-full object-cover" loading="lazy"/>)}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl mb-1">{c.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{c.items}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground line-through text-sm">₹{c.originalPrice}</span>
                        <span className="font-display text-xl text-primary">₹{c.comboPrice}</span>
                        <span className="ml-auto bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded-full">
                          SAVE ₹{c.originalPrice - c.comboPrice}
                        </span>
                      </div>
                    </div>
                  </div>))}
              </div>
            </div>
          </section>
        </Section>)}

      {/* Reviews marquee */}
      {reviews.length > 0 && (<Section>
          <section className="bg-cream py-16">
            <div className="container">
              <h2 className="font-display text-3xl text-center mb-10">
                What Our <span className="text-primary">Customers</span> Say
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {reviews.map((r, i) => (<ReviewCard key={r.id} review={r} index={i}/>))}
              </div>
              <div className="text-center mt-8">
                <Link to="/reviews" className="text-primary font-bold hover:underline">See all reviews →</Link>
              </div>
            </div>
          </section>
        </Section>)}

      {/* CTA */}
      <Section>
        <section className="py-20 text-center">
          <div className="container max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to <span className="text-primary">Indulge</span>?</h2>
            <p className="text-muted-foreground mb-8">Visit us today or explore our full menu of ice creams, brownies, and shakes!</p>
            <div className="flex justify-center gap-4">
              <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                View Menu
              </Link>
              <Link to="/reviews" className="bg-muted text-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Reviews
              </Link>
            </div>
          </div>
        </section>
      </Section>
    </div>);
};
export default Home;
