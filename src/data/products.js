export const WA_NUMBER = '221785273187'

export const PRODUCTS = [
  {
    id: 'tee-oversized',
    name: 'T-SHIRT OVERSIZED',
    category: 'Hauts',
    tagline: 'Coton lourd 280g — Unisexe',
    price: 0, // à renseigner
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Noir',      hex: '#111',    img: '/images/look3.jpg' },
      { label: 'Blanc',     hex: '#f5f0eb', img: '/images/look10.jpg', light: true },
      { label: 'Marron',    hex: '#6b4226', img: '/images/look1.jpg' },
      { label: 'Bleu ciel', hex: '#8ec6dc', img: '/images/look2.jpg' },
    ],
  },
  {
    id: 'hoodie-tracksuit',
    name: 'HOODIE TRACKSUIT',
    category: 'Sets',
    tagline: 'Ensemble complet — Coupe ample',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Noir',  hex: '#111',    img: '/images/look5.jpg' },
      { label: 'Blanc', hex: '#f5f0eb', img: '/images/look6.jpg', light: true },
      { label: 'Rose',  hex: '#e4a7b5', img: '/images/look7.jpg' },
      { label: 'Crème', hex: '#e8d98a', img: '/images/look7.jpg' },
    ],
  },
  {
    id: 'debardeur',
    name: 'DÉBARDEUR',
    category: 'Hauts',
    tagline: 'Sans manches — Logo dos aigle',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { label: 'Marron',    hex: '#6b4226', img: '/images/look11.jpg' },
      { label: 'Bleu ciel', hex: '#8ec6dc', img: '/images/look11.jpg' },
    ],
  },
  {
    id: 'bonnet',
    name: 'BONNET OUTSIDE',
    category: 'Accessoires',
    tagline: 'Acrylique — Logo brodé',
    price: 0,
    sizes: ['Unique'],
    colors: [
      { label: 'Blanc', hex: '#f5f0eb', img: '/images/look1.jpg',  light: true },
      { label: 'Gris',  hex: '#888',    img: '/images/look4.jpg' },
      { label: 'Noir',  hex: '#111',    img: '/images/look3.jpg' },
    ],
  },
]

export const CATEGORIES = ['Tous', ...new Set(PRODUCTS.map(p => p.category))]
