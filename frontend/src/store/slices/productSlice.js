import { createSlice } from "@reduxjs/toolkit";
import p1Img from "@/assets/p1-pistachio.png";
import p2Img from "@/assets/p2-truffle.png";
import p3Img from "@/assets/p3-wildberry.png";
import p4Img from "@/assets/p4-vanilla.png";
import p5Img from "@/assets/p5-caramel.png";
import p6Img from "@/assets/p6-espresso.png";
import p7Img from "@/assets/p7-brownie-double.png";
import p8Img from "@/assets/p8-brownie-toffee.png";
import p9Img from "@/assets/p9-brownie-hazelnut.png";
import p10Img from "@/assets/p10-shake-biscoff.png";
import p11Img from "@/assets/p11-shake-nutella.png";

// Re-using existing high-quality foodie photos for the remaining items
import p12Img from "@/assets/product-shake.png";
import p13Img from "@/assets/product-shake.png";

import c1Img from "@/assets/product-icecream.png";
import c2Img from "@/assets/hero-icecream.png";
import c3Img from "@/assets/combo-banner.png"; // Perfect for "Grand Feast" (merged items)

import o1Img from "@/assets/offer-banner.png"; // Perfect for "Summer Artisan Fest"
import o2Img from "@/assets/product-brownie.png";
import o3Img from "@/assets/offer-banner.png";

const PRODUCTS_KEY = "scoopiez_products_v4";
const COMBOS_KEY = "scoopiez_combos_v4";
const OFFERS_KEY = "scoopiez_offers_v4";

const defaultProducts = [
  { id: "p1", name: "Sicilian Pistachio", category: "icecream", price: 69, image: p1Img, description: "Authentic roasted Bronte pistachios blended into silky gelato" },
  { id: "p2", name: "Midnight Truffle", category: "icecream", price: 79, image: p2Img, description: "70% dark cocoa with swirls of chocolate ganache and truffle bits" },
  { id: "p3", name: "Wildberry Swirl", category: "icecream", price: 69, image: p3Img, description: "Tangy summer berries folded into fresh cream with a hint of lemon" },
  { id: "p4", name: "Madagascar Bourbon", category: "icecream", price: 69, image: p4Img, description: "Premium vanilla bean infused with aromatic bourbon notes" },
  { id: "p5", name: "Sea Salt Caramel", category: "icecream", price: 69, image: p5Img, description: "Hand-burnt caramel with a touch of Himalayan pink salt" },
  { id: "p6", name: "Espresso Roast", category: "icecream", price: 79, image: p6Img, description: "Rich Arabica coffee beans cold-brewed for an intense caffeine kick" },
  { id: "p7", name: "Double Chunk Brownie", category: "brownie", price: 89, image: p7Img, description: "Decadent fudgy base with oversized white and dark chocolate chunks" },
  { id: "p8", name: "Salted Toffee Brownie", category: "brownie", price: 109, image: p8Img, description: "Warm brownie topped with sticky toffee and crunchy sea salt" },
  { id: "p9", name: "Hazelnut Praline Brownie", category: "brownie", price: 99, image: p9Img, description: "Roasted hazelnuts embedded in a rich cocoa-butter base" },
  { id: "p10", name: "Biscoff Speculoos Shake", category: "shake", price: 129, image: p10Img, description: "Creamy vanilla blended with Lotus Biscoff spread and cookie crumbles" },
  { id: "p11", name: "Nutella Gold Shake", category: "shake", price: 139, image: p11Img, description: "The ultimate hazelnut chocolate experience with gold leaf flakes" },
  { id: "p12", name: "Rose Petal Shake", category: "shake", price: 119, image: p12Img, description: "Delicate floral notes with crushed dried rose petals and organic honey" },
  { id: "p13", name: "Matcha Zen Shake", category: "shake", price: 129, image: p13Img, description: "Ceremonial grade Japanese matcha whisked into a refreshing cold shake" },
];

const defaultCombos = [
  { id: "c1", name: "Taster's Palette", items: "3 Mini Scoops + 1 Brownie Bite", originalPrice: 280, comboPrice: 199, image: c1Img },
  { id: "c2", name: "The Indulgence", items: "1 Gourmet Shake + 1 Salted Toffee Brownie", originalPrice: 248, comboPrice: 189, image: c2Img },
  { id: "c3", name: "Grand Feast", items: "5 Large Scoops + 2 Shakes + 2 Brownies", originalPrice: 850, comboPrice: 649, image: c3Img },
];

const defaultOffers = [
  { id: "o1", title: "Summer Artisan Fest", description: "15% off on all floral and berry flavors", discount: 15, validTill: "2026-06-30", image: o1Img, badge: "🌿 FRESH" },
  { id: "o2", title: "Brownie Bliss Hour", description: "Buy any brownie, get a scoop of Vanilla free", discount: 25, validTill: "2026-07-15", image: o2Img, badge: "🍫 SPECIAL" },
  { id: "o3", title: "Weekend Mixology", description: "Free customizable toppings on all shakes", discount: 0, validTill: "2026-12-31", image: o3Img, badge: "🥤 WEEKLY" },
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
  products: loadJSON(PRODUCTS_KEY, defaultProducts),
  combos: loadJSON(COMBOS_KEY, defaultCombos),
  offers: loadJSON(OFFERS_KEY, defaultOffers),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push({ ...action.payload, id: "p" + Date.now() });
      saveJSON(PRODUCTS_KEY, state.products);
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveJSON(PRODUCTS_KEY, state.products);
    },
    addCombo(state, action) {
      state.combos.push({ ...action.payload, id: "c" + Date.now() });
      saveJSON(COMBOS_KEY, state.combos);
    },
    deleteCombo(state, action) {
      state.combos = state.combos.filter((c) => c.id !== action.payload);
      saveJSON(COMBOS_KEY, state.combos);
    },
    addOffer(state, action) {
      state.offers.push({ ...action.payload, id: "o" + Date.now() });
      saveJSON(OFFERS_KEY, state.offers);
    },
    deleteOffer(state, action) {
      state.offers = state.offers.filter((o) => o.id !== action.payload);
      saveJSON(OFFERS_KEY, state.offers);
    },
  },
});

export const { 
  addProduct, deleteProduct, 
  addCombo, deleteCombo, 
  addOffer, deleteOffer 
} = productSlice.actions;

export default productSlice.reducer;
