import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Reviews from "@/pages/Reviews";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
    const [loading, setLoading] = useState(true);
    const handleDone = useCallback(() => setLoading(false), []);

    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {loading && <Preloader onDone={handleDone}/>}
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/reviews" element={<Reviews />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/admin" element={<Admin />}/>
                <Route path="*" element={<NotFound />}/>
              </Routes>
              <Footer />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    );
};

export default App;
