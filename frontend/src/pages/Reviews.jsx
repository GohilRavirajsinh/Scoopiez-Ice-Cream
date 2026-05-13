import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addReview as addReviewAction } from "@/store/slices/reviewSlice";
// import { useAppContext } from "@/context/AppContext";
const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
const ReviewCard3D = ({ review, index }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
        } }, { threshold: 0.2 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    const delay = (index % 6) * 0.1;
    const direction = index % 2 === 0 ? "translate-x-[-60px]" : "translate-x-[60px]";
    return (<div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0 rotate-0 scale-100" : `opacity-0 ${direction} rotate-3 scale-90`}`} style={{ transitionDelay: `${delay}s` }}>
      <div className="bg-card rounded-2xl shadow-lg p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        {review.photo && (<div className="mb-3 rounded-xl overflow-hidden h-48">
            <img src={review.photo} alt={`${review.name}'s photo`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>
          </div>)}
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-foreground">{review.name}</span>
          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground capitalize">{review.type}</span>
        </div>
        <p className="text-secondary-foreground text-lg mb-1">{stars(review.rating)}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
        <p className="text-xs text-muted-foreground mt-3">{review.date}</p>
      </div>
    </div>);
};
/* Auto-scrolling horizontal marquee for featured reviews */
const ReviewMarquee = ({ reviews }) => {
    if (reviews.length < 2)
        return null;
    const doubled = [...reviews, ...reviews];
    return (<div className="overflow-hidden mb-12">
      <h3 className="font-display text-xl text-center mb-4 text-muted-foreground">✨ Featured Reviews</h3>
      <div className="flex gap-4 animate-marquee">
        {doubled.map((r, i) => (<div key={`${r.id}-${i}`} className="flex-shrink-0 w-72 bg-card rounded-xl shadow p-4">
            {r.photo && <img src={r.photo} alt="" className="w-full h-28 object-cover rounded-lg mb-2" loading="lazy"/>}
            <p className="font-bold text-sm">{r.name}</p>
            <p className="text-secondary-foreground text-sm">{stars(r.rating)}</p>
            <p className="text-muted-foreground text-xs line-clamp-2">{r.comment}</p>
          </div>))}
      </div>
    </div>);
};
const Reviews = () => {
    const reviews = useSelector((state) => state.reviews.reviews);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [type, setType] = useState("review");
    const [photo, setPhoto] = useState();
    const [submitted, setSubmitted] = useState(false);
    const handlePhoto = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        if (file.size > 2 * 1024 * 1024) {
            alert("Photo must be under 2MB");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setPhoto(reader.result);
        reader.readAsDataURL(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim())
            return;
        dispatch(addReviewAction({ name, rating, comment, type, photo }));
        setName("");
        setComment("");
        setRating(5);
        setPhoto(undefined);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2500);
    };
    return (<div className="pt-24 pb-16">
      <div className="container max-w-4xl">
        <h1 className="font-display text-4xl text-center mb-2 animate-fade-up">
          Reviews & <span className="text-primary">Feedback</span>
        </h1>
        <p className="text-muted-foreground text-center mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Share your Scoopiez experience with photos! 📸
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-md p-6 space-y-4 animate-scale-in mb-12">
          <h3 className="font-display text-xl text-foreground">Share Your Experience</h3>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="w-full px-4 py-2 rounded-lg bg-muted text-foreground border border-border focus:ring-2 focus:ring-ring outline-none"/>

          <div className="flex gap-4 items-center">
            <label className="text-sm font-semibold text-muted-foreground">Rating:</label>
            {[1, 2, 3, 4, 5].map((n) => (<button key={n} type="button" onClick={() => setRating(n)} className="text-xl">{n <= rating ? "★" : "☆"}</button>))}
          </div>

          <div className="flex gap-3">
            {["review", "feedback"].map((t) => (<button key={t} type="button" onClick={() => setType(t)} className={`px-4 py-1 rounded-full text-sm font-semibold border transition-colors capitalize ${type === t ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"}`}>
                {t}
              </button>))}
          </div>

          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us what you think..." rows={3} required className="w-full px-4 py-2 rounded-lg bg-muted text-foreground border border-border focus:ring-2 focus:ring-ring outline-none resize-none"/>

          {/* Photo upload */}
          <div>
            <label className="text-sm font-semibold text-muted-foreground block mb-2">📷 Add a photo (optional)</label>
            <input type="file" accept="image/*" onChange={handlePhoto} className="text-sm text-muted-foreground"/>
            {photo && (<div className="mt-2 relative inline-block">
                <img src={photo} alt="Preview" className="w-24 h-24 object-cover rounded-lg"/>
                <button type="button" onClick={() => setPhoto(undefined)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">✕</button>
              </div>)}
          </div>

          <Button type="submit" className="w-full">Submit Review</Button>
          {submitted && <p className="text-accent font-semibold text-center animate-fade-up">🎉 Thank you for your {type}!</p>}
        </form>

        {/* Marquee */}
        <ReviewMarquee reviews={reviews}/>

        {/* All reviews - animated masonry */}
        <h2 className="font-display text-2xl mb-6">All Reviews ({reviews.length})</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (<ReviewCard3D key={r.id} review={r} index={i}/>))}
        </div>
      </div>
    </div>);
};
export default Reviews;
