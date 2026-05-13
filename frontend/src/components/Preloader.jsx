import { useState, useEffect } from "react";
const Preloader = ({ onDone }) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(onDone, 300);
                    return 100;
                }
                return p + 2;
            });
        }, 40);
        return () => clearInterval(timer);
    }, [onDone]);
    return (<div className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-opacity duration-300 ${progress >= 100 ? "opacity-0" : "opacity-100"}`}>
      {/* TODO: Replace with your logo image */}
      <div className="relative mb-8">
        <div className="text-7xl animate-bounce-slow">🍦</div>
        <div className="absolute -inset-4 rounded-full border-4 border-primary/30 animate-spin" style={{ animationDuration: "3s" }}/>
      </div>
      <h1 className="font-display text-3xl text-primary mb-2">Scoopiez</h1>
      <p className="text-muted-foreground text-sm mb-6">Loading sweetness...</p>
      <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-100" style={{ width: `${progress}%` }}/>
      </div>
    </div>);
};
export default Preloader;
