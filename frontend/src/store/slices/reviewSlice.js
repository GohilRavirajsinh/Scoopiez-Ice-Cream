import { createSlice } from "@reduxjs/toolkit";

const REVIEWS_KEY = "scoopiez_reviews_v2";

const defaultReviews = [
  {
    id: "demo-1",
    name: "Aarav Mehta",
    rating: 5,
    comment: "The Sicilian Pistachio is out of this world! You can really taste the quality of the nuts. Best gelato I've had outside Italy. 🍦",
    date: "2026-05-10",
    type: "review",
  },
  {
    id: "demo-2",
    name: "Sanya Kapoor",
    rating: 5,
    comment: "I'm obsessed with the Rose Petal Shake. It's so delicate and not too sweet. The aesthetics of this place are just as good as the treats! ✨",
    date: "2026-05-12",
    type: "review",
  },
  {
    id: "demo-3",
    name: "Vikram Singh",
    rating: 4,
    comment: "The Salted Toffee Brownie was warm and gooey. Paired it with the Espresso Roast and it was the perfect afternoon pick-me-up. ☕🍫",
    date: "2026-05-13",
    type: "feedback",
  },
];

const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  reviews: loadJSON(REVIEWS_KEY, defaultReviews),
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview(state, action) {
      const newReview = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      };
      state.reviews.unshift(newReview);
      saveJSON(REVIEWS_KEY, state.reviews);
    },
    deleteReview(state, action) {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
      saveJSON(REVIEWS_KEY, state.reviews);
    },
  },
});

export const { addReview, deleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
