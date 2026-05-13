const Contact = () => {
    // TODO: Update these with actual contact details
    const phone = "+911234567890";
    const whatsapp = "911234567890";
    const email = "hello@scoopiez.com";
    // TODO: Update with actual Google Maps embed URL
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153209!3d-37.81627997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ4JzU4LjYiUyAxNDTCsDU3JzEzLjQiRQ!5e0!3m2!1sen!2sau!4v1";
    return (<div className="pt-24 pb-16">
      <div className="container max-w-3xl">
        <h1 className="font-display text-4xl text-center mb-2 animate-fade-up">
          Get In <span className="text-primary">Touch</span>
        </h1>
        <p className="text-muted-foreground text-center mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          We'd love to hear from you! Reach out anytime.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Call */}
          <a href={`tel:${phone}`} className="bg-card rounded-2xl shadow-md p-6 text-center hover:scale-105 transition-transform animate-fade-up">
            <span className="text-4xl block mb-2">📞</span>
            <h3 className="font-display text-lg mb-1">Call Us</h3>
            <p className="text-muted-foreground text-sm">Tap to call directly</p>
          </a>

          {/* WhatsApp */}
          <a href={`https://wa.me/${whatsapp}?text=Hi%20Scoopiez!`} target="_blank" rel="noopener noreferrer" className="bg-card rounded-2xl shadow-md p-6 text-center hover:scale-105 transition-transform animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-4xl block mb-2">💬</span>
            <h3 className="font-display text-lg mb-1">WhatsApp</h3>
            <p className="text-muted-foreground text-sm">Chat with us on WhatsApp</p>
          </a>

          {/* Email */}
          <a href={`mailto:${email}`} className="bg-card rounded-2xl shadow-md p-6 text-center hover:scale-105 transition-transform animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-4xl block mb-2">📧</span>
            <h3 className="font-display text-lg mb-1">Email</h3>
            <p className="text-muted-foreground text-sm">{email}</p>
          </a>

          {/* Social */}
          <div className="bg-card rounded-2xl shadow-md p-6 text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <span className="text-4xl block mb-2">🌐</span>
            <h3 className="font-display text-lg mb-3">Follow Us</h3>
            <div className="flex justify-center gap-4 text-2xl">
              {/* TODO: Replace # with actual social links */}
              <a href="#" aria-label="Instagram" className="hover:scale-125 transition-transform">📸</a>
              <a href="#" aria-label="Facebook" className="hover:scale-125 transition-transform">👍</a>
              <a href="#" aria-label="Twitter" className="hover:scale-125 transition-transform">🐦</a>
              <a href="#" aria-label="YouTube" className="hover:scale-125 transition-transform">▶️</a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-md animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <iframe src={mapUrl} width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Scoopiez Location"/>
        </div>
      </div>
    </div>);
};
export default Contact;
