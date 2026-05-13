const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
const ReviewCard = ({ review, index = 0 }) => (<div className="bg-card rounded-2xl shadow-md p-6 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="flex items-center justify-between mb-2">
      <span className="font-bold text-foreground">{review.name}</span>
      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground capitalize">
        {review.type}
      </span>
    </div>
    <p className="text-secondary-foreground text-lg mb-1">{stars(review.rating)}</p>
    <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
    <p className="text-xs text-muted-foreground mt-3">{review.date}</p>
  </div>);
export default ReviewCard;
