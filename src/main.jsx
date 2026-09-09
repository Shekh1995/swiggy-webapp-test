import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, ShoppingBag, MapPin, ChevronDown, Clock3, Star,
  Plus, Minus, X, Heart, CircleUserRound, ArrowRight
} from "lucide-react";
import "./styles.css";

const categories = [
  ["🍕", "Pizza"], ["🍔", "Burgers"], ["🍗", "Chicken"], ["🍜", "Chinese"],
  ["🥘", "Biryani"], ["🍰", "Desserts"], ["☕", "Cafe"], ["🥗", "Healthy"]
];

const restaurants = [
  { id: 1, name: "Spice Route", cuisine: "North Indian • Biryani", rating: 4.6, time: "25–30 min", price: "₹300 for two", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", offer: "50% OFF up to ₹100" },
  { id: 2, name: "Burger District", cuisine: "Burgers • Fast Food", rating: 4.5, time: "20–25 min", price: "₹350 for two", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80", offer: "₹125 OFF above ₹399" },
  { id: 3, name: "Wok & Bowl", cuisine: "Chinese • Asian", rating: 4.4, time: "30–35 min", price: "₹450 for two", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80", offer: "20% OFF" },
  { id: 4, name: "Dosa House", cuisine: "South Indian", rating: 4.7, time: "15–20 min", price: "₹250 for two", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80", offer: "FREE delivery" },
  { id: 5, name: "Sweet Theory", cuisine: "Desserts • Bakery", rating: 4.8, time: "20–25 min", price: "₹300 for two", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80", offer: "Buy 1 Get 1" },
  { id: 6, name: "Green Bowl", cuisine: "Healthy • Salads", rating: 4.5, time: "25–30 min", price: "₹400 for two", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", offer: "20% OFF up to ₹150" }
];

const menu = [
  { id: 101, name: "Paneer Tikka Bowl", restaurant: "Spice Route", price: 249, description: "Smoky paneer, fragrant rice, fresh salad and mint chutney.", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=600&q=80" },
  { id: 102, name: "Classic Chicken Biryani", restaurant: "Spice Route", price: 299, description: "Long-grain basmati rice layered with aromatic chicken and spices.", image: "https://images.unsplash.com/photo-1563379091339-03246963d29c?auto=format&fit=crop&w=600&q=80" },
  { id: 103, name: "Double Smash Burger", restaurant: "Burger District", price: 279, description: "Two smashed patties, cheddar, onions and signature sauce.", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80" },
  { id: 104, name: "Veg Hakka Noodles", restaurant: "Wok & Bowl", price: 219, description: "Wok-tossed noodles with vegetables and house seasoning.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" }
];

function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const categoryMatch = activeCategory === "All" || r.cuisine.toLowerCase().includes(activeCategory.toLowerCase());
      const text = `${r.name} ${r.cuisine}`.toLowerCase();
      return categoryMatch && text.includes(query.toLowerCase());
    });
  }, [query, activeCategory]);

  const addToCart = (item) => {
    setCart((current) => {
      const found = current.find((x) => x.id === item.id);
      if (found) return current.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...current, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((current) =>
      current.flatMap((x) => x.id === id ? (x.qty + delta > 0 ? [{ ...x, qty: x.qty + delta }] : []) : [x])
    );
  };

  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-inner">
          <div className="brand">Food<span>Rush</span></div>
          <button className="location"><MapPin size={18}/><span>Bengaluru</span><ChevronDown size={16}/></button>
          <div className="nav-search"><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for restaurant or dish"/></div>
          <button className="nav-link" onClick={() => setShowLogin(true)}><CircleUserRound size={19}/> Sign In</button>
          <button className="cart-btn" onClick={() => setShowCart(true)}><ShoppingBag size={20}/> Cart {cart.length > 0 && <b>{cart.reduce((s,x)=>s+x.qty,0)}</b>}</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">DELIVERING HAPPINESS</p>
            <h1>Great food, delivered<br/><span>to your doorstep.</span></h1>
            <p className="hero-copy">Discover the best restaurants and dishes around you, order in seconds, and track your meal from kitchen to door.</p>
            <div className="hero-search"><MapPin/><input placeholder="Enter delivery location"/><button>Find Food</button></div>
          </div>
          <div className="hero-art">
            <div className="plate">🍛</div>
            <div className="float-card"><Clock3 size={17}/> 25 min delivery</div>
            <div className="float-card second"><Star size={17} fill="currentColor"/> 4.8 rated</div>
          </div>
        </section>

        <section className="section">
          <div className="section-head"><div><p className="eyebrow">EXPLORE</p><h2>What's on your mind?</h2></div><span>Swipe to explore →</span></div>
          <div className="categories">
            <button className={activeCategory === "All" ? "category active" : "category"} onClick={() => setActiveCategory("All")}><div>✨</div><span>All</span></button>
            {categories.map(([icon, name]) => <button key={name} className={activeCategory === name ? "category active" : "category"} onClick={() => setActiveCategory(name)}><div>{icon}</div><span>{name}</span></button>)}
          </div>
        </section>

        <section className="section">
          <div className="section-head"><div><p className="eyebrow">TOP PICKS</p><h2>Restaurants near you</h2></div><button className="view-all">View all <ArrowRight size={16}/></button></div>
          <div className="restaurant-grid">
            {filteredRestaurants.map(r => <article className="restaurant-card" key={r.id}>
              <div className="image-wrap"><img src={r.image} alt={r.name}/><span className="offer">{r.offer}</span><button className="heart"><Heart size={18}/></button></div>
              <div className="card-body">
                <div className="title-row"><h3>{r.name}</h3><span className="rating"><Star size={14} fill="currentColor"/>{r.rating}</span></div>
                <p>{r.cuisine}</p>
                <div className="meta"><span><Clock3 size={14}/>{r.time}</span><span>{r.price}</span></div>
              </div>
            </article>)}
          </div>
        </section>

        <section className="section menu-section">
          <div className="section-head"><div><p className="eyebrow">QUICK ORDER</p><h2>Popular dishes</h2></div></div>
          <div className="menu-grid">
            {menu.map(item => <article className="menu-card" key={item.id}>
              <img src={item.image} alt={item.name}/>
              <div className="menu-content"><h3>{item.name}</h3><strong>₹{item.price}</strong><p>{item.description}</p><button onClick={() => addToCart(item)}><Plus size={17}/> Add</button></div>
            </article>)}
          </div>
        </section>
      </main>

      <footer><div className="brand">Food<span>Rush</span></div><p>© 2026 FoodRush — educational food-delivery UI project.</p></footer>

      {showCart && <div className="overlay" onClick={() => setShowCart(false)}><aside className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head"><h2>Your Cart</h2><button onClick={() => setShowCart(false)}><X/></button></div>
        {cart.length === 0 ? <div className="empty"><ShoppingBag size={46}/><h3>Your cart is empty</h3><p>Add something delicious to get started.</p></div> :
          <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image}/><div><h3>{item.name}</h3><p>₹{item.price}</p><div className="qty"><button onClick={() => changeQty(item.id,-1)}><Minus size={14}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)}><Plus size={14}/></button></div></div></div>)}</div>
          <div className="bill"><div><span>Item total</span><b>₹{total}</b></div><div><span>Delivery fee</span><b>₹39</b></div><div className="grand"><span>To pay</span><b>₹{total + 39}</b></div><button className="checkout">Proceed to Checkout</button></div></>}
      </aside></div>}

      {showLogin && <div className="overlay" onClick={() => setShowLogin(false)}><div className="login-modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setShowLogin(false)}><X/></button><div className="login-icon">👋</div><h2>Welcome back</h2><p>Sign in to continue your food journey.</p><input placeholder="Phone number"/><button className="primary">Continue</button><small>By continuing, you agree to our Terms & Privacy Policy.</small></div></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);