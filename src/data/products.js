const products = [
  {
    id: 'iphone-15',
    brand: 'Apple',
    model: 'iPhone 15',
    category: 'Apple',
    price: 69999,
    previousPrice: 79999,
    badge: 'Best Seller',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1695048133142-1f5c7d2a4dd8?auto=format&fit=crop&w=900&q=80',
    colors: ['Blue', 'Black', 'White'],
    storage: ['128GB', '256GB'],
    specs: ['A16 Bionic chip', '48MP dual camera', 'Dynamic Island', 'USB-C charging'],
    description: 'A premium everyday flagship designed for smooth performance and reliable everyday use.',
  },
  {
    id: 'galaxy-s24',
    brand: 'Samsung',
    model: 'Galaxy S24',
    category: 'Samsung',
    price: 64999,
    previousPrice: 73999,
    badge: 'Hot Pick',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet'],
    storage: ['128GB', '256GB'],
    specs: ['Snapdragon 8 Gen 3', 'AI camera enhancements', '6.2-inch AMOLED', 'Fast charging'],
    description: 'Balanced camera quality and bright display for students and working professionals.',
  },
  {
    id: 'oneplus-12',
    brand: 'OnePlus',
    model: 'OnePlus 12',
    category: 'OnePlus',
    price: 58999,
    previousPrice: 66999,
    badge: 'Limited Demo',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    colors: ['Flowy Silver', 'Black Ruin'],
    storage: ['128GB', '256GB'],
    specs: ['120Hz AMOLED display', 'Triple rear camera', 'Dual SIM support', 'Ultra-fast charging'],
    description: 'A smooth, premium flagship with a sleek finish and strong overall battery performance.',
  },
  {
    id: 'vivo-x100',
    brand: 'Vivo',
    model: 'Vivo X100',
    category: 'Vivo',
    price: 52999,
    previousPrice: 59999,
    badge: 'Camera Focus',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    colors: ['Sunset Gold', 'Midnight Black'],
    storage: ['128GB', '256GB'],
    specs: ['50MP ZEISS camera', '120Hz screen', 'Strong low-light imaging', 'Large battery'],
    description: 'Perfect for photography lovers who want sharp results and a premium feel.',
  },
  {
    id: 'redmi-note-13-pro',
    brand: 'Redmi',
    model: 'Redmi Note 13 Pro',
    category: 'Redmi',
    price: 23999,
    previousPrice: 29999,
    badge: 'Value Pick',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    colors: ['Coral Purple', 'Forest Green', 'Midnight Black'],
    storage: ['128GB', '256GB'],
    specs: ['108MP camera', '5500mAh battery', '120Hz AMOLED', 'Great value for money'],
    description: 'A high-value option for everyday tasks, photography, and long browsing sessions.',
  },
  {
    id: 'iphone-14',
    brand: 'Apple',
    model: 'iPhone 14',
    category: 'Apple',
    price: 55999,
    previousPrice: 62999,
    badge: 'Popular',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1671604966140-31cb0f4eefbb?auto=format&fit=crop&w=900&q=80',
    colors: ['Midnight', 'Product Red', 'Starlight'],
    storage: ['128GB', '256GB'],
    specs: ['A15 Bionic chip', 'Dual camera layout', 'Super Retina display', 'Reliable performance'],
    description: 'A dependable premium device with great ecosystem support and everyday reliability.',
  },
  {
    id: 'galaxy-a54',
    brand: 'Samsung',
    model: 'Galaxy A54',
    category: 'Samsung',
    price: 31999,
    previousPrice: 36999,
    badge: 'Family Favourite',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
    colors: ['Awesome Lime', 'Awesome Violet', 'Awesome White'],
    storage: ['128GB', '256GB'],
    specs: ['5G ready', 'OIS camera', 'Vibrant screen', 'Strong battery backup'],
    description: 'A versatile mid-range phone for families who want value, reliability, and style.',
  },
  {
    id: 'oneplus-nord',
    brand: 'OnePlus',
    model: 'OnePlus Nord CE4',
    category: 'OnePlus',
    price: 26999,
    previousPrice: 32999,
    badge: 'Smart Value',
    status: 'Illustrative demo availability',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    colors: ['Dark Chrome', 'Celadon'],
    storage: ['128GB', '256GB'],
    specs: ['90Hz fluid screen', 'Dual camera setup', 'Fast charging', 'Smooth daily performance'],
    description: 'A clean everyday smartphone with a lightweight feel and impressive value.',
  },
]

export const categories = [
  {
    name: 'Smartphones',
    subtitle: 'Everyday essentials and flagship picks',
    image:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Premium Phones',
    subtitle: 'Luxury performance with standout features',
    image:
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Budget Phones',
    subtitle: 'Smart value without compromising essentials',
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Chargers & Cables',
    subtitle: 'Fast charging essentials that keep up',
    image:
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Earphones & Headphones',
    subtitle: 'Clear audio for travel and work',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Cases & Screen Protectors',
    subtitle: 'Protection that feels polished and practical',
    image:
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Smartwatches',
    subtitle: 'Wearables for health, notifications, and style',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Power Banks',
    subtitle: 'Reliable backup charging for busy days',
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
  },
]

export default products
