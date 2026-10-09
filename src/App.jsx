import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Headphones,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Trash2,
  X,
} from 'lucide-react'
import products, { categories } from './data/products'

const whatsappNumber = '917639240479'
const brands = ['All Phones', 'Apple', 'Samsung', 'OnePlus', 'Vivo', 'Redmi']

const benefits = [
  { icon: ShieldCheck, title: 'Genuine Products', note: 'Sample placeholder — verify product authenticity with the shop.' },
  { icon: Store, title: 'Friendly Local Support', note: 'Real guidance from a trusted neighbourhood team.' },
  { icon: Headphones, title: 'Accessories for Every Day', note: 'Cases, chargers, buds, and essentials for daily use.' },
  { icon: MessageCircle, title: 'Easy WhatsApp Enquiries', note: 'Quick communication before you visit or buy.' },
]

const accessoryItems = [
  'Wireless earbuds',
  'Wired earphones',
  'Fast chargers',
  'USB-C cables',
  'Protective cases',
  'Tempered glass',
  'Power banks',
  'Smartwatches',
]

const reviews = [
  {
    name: 'Sample customer',
    text: 'Sample testimonial — replace with an approved customer review.',
  },
  {
    name: 'Sample customer',
    text: 'Sample testimonial — replace with an approved customer review.',
  },
  {
    name: 'Sample customer',
    text: 'Sample testimonial — replace with an approved customer review.',
  },
]

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Phones')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mobi-demo-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [toast, setToast] = useState('')
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    localStorage.setItem('mobi-demo-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const nextProducts = products.filter((product) => {
      const matchCategory =
        selectedCategory === 'All Phones' || product.brand === selectedCategory
      const matchQuery =
        !query ||
        [product.brand, product.model, product.description, product.category]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchCategory && matchQuery
    })

    return [...nextProducts].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return a.model.localeCompare(b.model)
    })
  }, [searchTerm, selectedCategory, sortBy])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const showToast = (message) => setToast(message)

  const openWhatsApp = (label, productName = '') => {
    const message = productName
      ? `Hi MOBILE HUB, I'm interested in ${productName}. Could you please share the current price, availability, and details?`
      : `Hi MOBILE HUB, I would like to enquire about ${label}. Please share the current price and details.`

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  const addToCart = (product, selectedColor = product.colors[0], selectedStorage = product.storage[0]) => {
    const cartKey = `${product.id}-${selectedColor}-${selectedStorage}`

    setCart((current) => {
      const existing = current.find((item) => item.id === cartKey)

      if (existing) {
        return current.map((item) =>
          item.id === cartKey ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...current,
        {
          id: cartKey,
          productId: product.id,
          name: `${product.brand} ${product.model}`,
          price: product.price,
          color: selectedColor,
          storage: selectedStorage,
          quantity: 1,
          image: product.image,
        },
      ]
    })

    setCartOpen(true)
    showToast(`${product.brand} ${product.model} added to cart`)
  }

  const updateQuantity = (id, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeCartItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
    showToast('Cart cleared')
  }

  const continueOnWhatsApp = () => {
    if (!cart.length) {
      showToast('Your cart is empty')
      return
    }

    const itemText = cart
      .map(
        (item) => `${item.quantity} x ${item.name}${item.color ? ` (${item.color})` : ''}${item.storage ? ` / ${item.storage}` : ''}`,
      )
      .join('\n')

    const message = `Hi MOBILE HUB, I would like to enquire about these items from the demo cart:\n${itemText}\nPlease confirm the price and availability.`
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const errors = {}

    if (formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name.'
    }

    if (!/^\d{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid phone number.'
    }

    if (formData.message.trim().length < 12) {
      errors.message = 'Please enter a brief enquiry message.'
    }

    setFormErrors(errors)

    if (Object.keys(errors).length) {
      showToast('Please correct the form fields')
      return
    }

    showToast('Frontend demo only — no message sent')
    setFormData({ name: '', phone: '', message: '' })
    setFormErrors({})
  }

  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>WEBSITE CONCEPT PREVIEW</span>
          <span className="demo-pill">Demo Mode</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="MOBILE HUB home">
            <span className="brand-mark">M</span>
            <span>MOBILE HUB</span>
          </a>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#featured">Smartphones</a>
            <a href="#accessories">Accessories</a>
            <a href="#deals">Deals</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-button"
              onClick={() => setIsSearchOpen((value) => !value)}
              aria-label="Toggle product search"
            >
              <Search size={18} />
            </button>
            <button type="button" className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <a href="#contact" className="cta-button whatsapp-nav">
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <button type="button" className="menu-button" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="container search-panel">
            <div className="search-input-wrap">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search phones and accessories"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
        )}
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Find Your Perfect Phone</span>
              <h1>Your Next Phone. Your Best Choice.</h1>
              <p>
                Discover smartphones, everyday essentials, and accessories that fit your lifestyle and budget.
              </p>
              <div className="demo-note">Sample pricing and demo business details only.</div>
              <div className="hero-actions">
                <a href="#featured" className="cta-button primary">
                  Explore Smartphones
                </a>
                <button type="button" className="cta-button secondary" onClick={() => openWhatsApp('a product enquiry')}>
                  Chat on WhatsApp
                </button>
              </div>
              <div className="trust-row" aria-label="Local store trust message">
                <BadgeCheck size={18} />
                Trusted local store insights for Coimbatore customers
              </div>
            </div>

            <div className="hero-visual" aria-label="Featured smartphone illustration">
              <div className="hero-phone-card">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80"
                  alt="Premium smartphone"
                />
              </div>
              <div className="floating-badge hero-badge-top">
                <Sparkles size={16} />
                Smart picks for every budget
              </div>
              <div className="floating-card hero-card-one">
                <span className="mini-label">New arrival</span>
                <strong>Galaxy S24</strong>
                <small>₹64,999</small>
              </div>
              <div className="floating-card hero-card-two">
                <span className="mini-label">Popular choice</span>
                <strong>iPhone 15</strong>
                <small>₹69,999</small>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-wrap">
          <div className="container benefits-grid">
            {benefits.map(({ icon: Icon, title, note }) => (
              <div key={title} className="benefit-card">
                <div className="icon-box">
                  <Icon size={22} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="category-section container" aria-label="Shop by category">
          <div className="section-heading">
            <span className="eyebrow muted">Shop by category</span>
            <h2>Find what fits your routine.</h2>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                className="category-card"
                onClick={() => {
                  setSelectedCategory(category.name === 'Smartphones' ? 'All Phones' : category.name)
                  setIsSearchOpen(false)
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <img src={category.image} alt={category.name} />
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="featured" className="products-section">
          <div className="container">
            <div className="section-heading split-header">
              <div>
                <span className="eyebrow muted">Featured smartphones</span>
                <h2>Smartphones built for daily life.</h2>
              </div>
              <div className="toolbar">
                <div className="filter-box">
                  <Filter size={16} />
                  <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    aria-label="Filter phones by brand"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-box">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    aria-label="Sort products"
                  >
                    <option value="name">Name: A to Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <Smartphone size={30} />
                <h3>No phones match your search.</h3>
                <p>Try a different keyword or switch the filter.</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="product-card">
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.model} />
                      <span className="product-badge">{product.badge}</span>
                    </div>
                    <div className="product-content">
                      <div className="product-meta-row">
                        <span>{product.brand}</span>
                        <span className="status-label">{product.status}</span>
                      </div>
                      <h3>{product.model}</h3>
                      <p>{product.description}</p>
                      <div className="variant-row">
                        <span>{product.storage[0]}</span>
                        <span>{product.colors[0]}</span>
                      </div>
                      <div className="price-row">
                        <strong>{formatPrice(product.price)}</strong>
                        {product.previousPrice && (
                          <span className="previous-price">{formatPrice(product.previousPrice)}</span>
                        )}
                      </div>
                      <div className="card-actions">
                        <button type="button" className="secondary-button" onClick={() => setSelectedProduct(product)}>
                          View Details
                        </button>
                        <button type="button" className="primary-button" onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      </div>
                      <button type="button" className="link-button" onClick={() => openWhatsApp('this phone', `${product.brand} ${product.model}`)}>
                        Enquire on WhatsApp
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="accessories" className="offers-section">
          <div className="container offers-grid">
            <div className="offers-copy">
              <span className="eyebrow muted">Accessories</span>
              <h2>Small Upgrades. Better Everyday Tech.</h2>
              <p>
                Sample pricing shown here is placeholder data for presentation purposes until the shop owner confirms final rates.
              </p>
              <div className="offer-list">
                {accessoryItems.map((item) => (
                  <div key={item} className="offer-pill">
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="cta-button primary" onClick={() => setSelectedCategory('All Phones')}>
                Explore Accessories
              </button>
            </div>
            <div className="offer-visual">
              <div className="offer-card highlight-card">
                <span>Sample pricing</span>
                <strong>₹999</strong>
                <small>Wireless earbuds</small>
              </div>
              <div className="offer-card mini-card">
                <span>Demo deal</span>
                <strong>₹1,599</strong>
                <small>Power bank</small>
              </div>
            </div>
          </div>
        </section>

        <section className="why-section" id="deals">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow muted">Why choose this shop?</span>
              <h2>Personal guidance that goes beyond the price tag.</h2>
            </div>
            <div className="value-grid">
              <div className="value-card">
                <div className="icon-box"><Sparkles size={22} /></div>
                <h3>Personalised Product Recommendations</h3>
                <p>Help customers find a phone that matches their work, budget, and lifestyle.</p>
              </div>
              <div className="value-card">
                <div className="icon-box"><Store size={22} /></div>
                <h3>Local Customer Support</h3>
                <p>Friendly, face-to-face guidance from a nearby business that understands local needs.</p>
              </div>
              <div className="value-card">
                <div className="icon-box"><Headphones size={22} /></div>
                <h3>Accessories and Essentials</h3>
                <p>Complete the setup with cases, chargers, audio gear, and practical add-ons.</p>
              </div>
              <div className="value-card">
                <div className="icon-box"><MessageCircle size={22} /></div>
                <h3>Convenient Enquiries Before Visiting</h3>
                <p>Customers can ask questions before heading to the shop and compare options quickly.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="reviews-section">
          <div className="container">
            <div className="section-heading split-header">
              <div>
                <span className="eyebrow muted">Customer reviews</span>
                <h2>Demo mode testimonials.</h2>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-link">
                View Google Business Profile <ChevronRight size={16} />
              </a>
            </div>
            <div className="review-grid">
              {reviews.map((review, index) => (
                <article key={`${review.name}-${index}`} className="review-card">
                  <div className="review-stars" aria-label="Sample rating">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={`${review.name}-${starIndex}`} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p>{review.text}</p>
                  <strong>{review.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container about-grid">
            <div className="about-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1000&q=80"
                alt="Local mobile shop interior"
              />
            </div>
            <div className="about-copy">
              <span className="eyebrow muted">About the shop</span>
              <h2>Your Neighbourhood Tech Destination.</h2>
              <p>
                A small mobile shop can help customers compare devices, pick the right accessories, and choose products that match their needs without the stress of online-only browsing.
              </p>
              <ul className="about-list">
                <li>Editable shop history and owner introduction placeholder</li>
                <li>Years of operation placeholder to be confirmed by the owner</li>
                <li>Actual services, store photography, and local offerings can be added here</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div className="contact-card info-card">
              <span className="eyebrow muted">Store location & contact</span>
              <h2>MOBILE HUB</h2>
              <div className="info-line">
                <MapPin size={18} />
                <span>Editable street address, Coimbatore, Tamil Nadu</span>
              </div>
              <div className="info-line">
                <Phone size={18} />
                <span>Business phone placeholder: +91 98765 43210</span>
              </div>
              <div className="info-line">
                <MessageCircle size={18} />
                <span>WhatsApp placeholder: 91 98765 43210</span>
              </div>
              <div className="info-line">
                <Clock3 size={18} />
                <span>Opening hours placeholder: Mon-Sat, 9:00 AM to 9:00 PM</span>
              </div>
              <div className="contact-actions">
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="secondary-button">
                  Directions
                </a>
                <button type="button" className="primary-button" onClick={() => openWhatsApp('the shop', 'MOBILE HUB store enquiry')}>
                  Chat on WhatsApp
                </button>
              </div>
            </div>

            <form className="contact-card form-card" onSubmit={handleContactSubmit} noValidate>
              <span className="eyebrow muted">Quick enquiry</span>
              <h3>Ask before you visit.</h3>
              <div className="field-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder="Your name"
                />
                {formErrors.name && <small>{formErrors.name}</small>}
              </div>

              <div className="field-group">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  placeholder="Your contact number"
                />
                {formErrors.phone && <small>{formErrors.phone}</small>}
              </div>

              <div className="field-group">
                <label htmlFor="message">Enquiry message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  placeholder="Tell us what you are looking for"
                />
                {formErrors.message && <small>{formErrors.message}</small>}
              </div>

              <button type="submit" className="cta-button primary submit-button">
                Send enquiry
              </button>
              <p className="demo-form-note">Frontend demo only — this does not send a real message.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand brand-footer">
              <span className="brand-mark">M</span>
              <span>MOBILE HUB</span>
            </div>
            <p>
              Premium mobile shop concept for local buyers looking for trustworthy guidance, value, and quick WhatsApp enquiries.
            </p>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#featured">Smartphones</a></li>
              <li><a href="#accessories">Accessories</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Categories</h4>
            <ul>
              <li><a href="#featured">Apple</a></li>
              <li><a href="#featured">Samsung</a></li>
              <li><a href="#featured">OnePlus</a></li>
              <li><a href="#featured">Vivo</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Coimbatore, TN</li>
              <li>WhatsApp placeholder</li>
              <li><a href="mailto:hello@mobilehub-demo.com">hello@mobilehub-demo.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>Privacy policy placeholder</span>
          <span>Terms and conditions placeholder</span>
          <span>© {new Date().getFullYear()} MOBILE HUB</span>
        </div>
      </footer>

      <button type="button" className="floating-whatsapp" onClick={() => openWhatsApp('a product enquiry')} aria-label="Chat on WhatsApp">
        <MessageCircle size={24} />
      </button>

      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h3>Cart</h3>
          <button type="button" className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={26} />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-copy">
                    <div className="cart-top-row">
                      <strong>{item.name}</strong>
                      <button type="button" className="trash-button" aria-label={`Remove ${item.name}`} onClick={() => removeCartItem(item.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <small>{item.color} • {item.storage}</small>
                    <div className="qty-row">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease quantity for ${item.name}`}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase quantity for ${item.name}`}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <button type="button" className="text-button" onClick={clearCart}>
                Clear cart
              </button>
            </div>

            <button type="button" className="cta-button primary full-width" onClick={continueOnWhatsApp}>
              Continue on WhatsApp
            </button>
            <p className="demo-payment-note">Demo enquiry only — no real payment or order processing.</p>
          </>
        )}
      </aside>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-button modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product detail">
              <X size={18} />
            </button>
            <div className="modal-image-wrap">
              <img src={selectedProduct.image} alt={selectedProduct.model} />
            </div>
            <div className="modal-copy">
              <div className="product-meta-row">
                <span>{selectedProduct.brand}</span>
                <span className="status-label">Illustrative demo</span>
              </div>
              <h3>{selectedProduct.model}</h3>
              <div className="price-row modal-price">
                <strong>{formatPrice(selectedProduct.price)}</strong>
                {selectedProduct.previousPrice && (
                  <span className="previous-price">{formatPrice(selectedProduct.previousPrice)}</span>
                )}
              </div>

              <div className="modal-options">
                <div>
                  <label>Color</label>
                  <div className="option-pills">
                    {selectedProduct.colors.map((color) => (
                      <button key={color} type="button" className="option-pill active">
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>Storage</label>
                  <div className="option-pills">
                    {selectedProduct.storage.map((storage) => (
                      <button key={storage} type="button" className="option-pill active">
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="spec-list">
                {selectedProduct.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => addToCart(selectedProduct)}>
                  Add to Cart
                </button>
                <button type="button" className="primary-button" onClick={() => openWhatsApp('this product', `${selectedProduct.brand} ${selectedProduct.model}`)}>
                  Enquire on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}

export default App
