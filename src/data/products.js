export const WA_NUMBER = '221785273187'

// ── ANCIEN MODÈLE T-SHIRT : sérigraphie "OUTSIDE / BLAME YOUR SELF NOT THE WORLD" texte gras
// prod3=sable, prod7=blanc, prod8=bleu, prod9=noir, prod10=rose

// ── NOUVEAU MODÈLE T-SHIRT : eagle badge recto, "OUTSIDE™" en arc poitrine
// prod15=sable, prod16=blanc, prod17=noir, prod18=bleu, prod19=rose

// ── DÉBARDEUR : eagle badge dos, "OUTSIDE™" en arc poitrine
// prod20=noir (logo rose), prod21=noir (logo blanc), prod22=bleu, prod23=blanc

// ── JOGGING SHERPA : ensemble sherpa logo brodé
// prod11=noir, prod12=blanc

// ── JOGGING OUTSIDE (coton) : sérigraphie verticale jambe + badge aigle cuisse
// prod26=blanc, prod27=noir, prod28=bleu canard

// ── HOODIE classique : aigle badge dos + "OUTSIDE™" poitrine
// prod13=noir (recto/verso), prod14=blanc (recto/verso) ← images double vue
// prod2=hoodie noir (ancienne), prod6=hoodie blanc (ancienne)

export const PRODUCTS = [
  // ─── SET EAGLE (sherpa) ───
  {
    id: 'jogging-sherpa',
    name: 'Ensemble Outside™',
    category: 'Sets',
    tagline: 'Ensemble Sherpa — Logo aigle brodé — Coupe ample',
    price: 25000,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { label: 'Noir',  hex: '#111',    img: '/images/prod11.jpg' },
      { label: 'Blanc', hex: '#f0ebe3', img: '/images/prod12.jpg', light: true },
    ],
  },
  // ─── JOGGING OUTSIDE (coton) ───
  {
    id: 'jogging-outside',
    name: 'Jogging Outside™',
    category: 'Bas',
    tagline: 'Coton 380g — Sérigraphie verticale jambe — Badge aigle cuisse',
    price: 8000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Noir',        hex: '#111',    img: '/images/prod27.jpg' },
      { label: 'Blanc',       hex: '#f0ebe3', img: '/images/prod26.jpg', light: true },
      { label: 'Bleu canard', hex: '#1a7b8a', img: '/images/prod28.jpg', light: false },
    ],
  },
  // ─── HOODIE ───
  {
    id: 'hoodie-noir',
    name: 'Hoodie Outside™',
    category: 'Hauts',
    tagline: 'Coton lourd — Badge aigle dos — Coupe oversize',
    price: 15000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Noir',  hex: '#111',    img: '/images/prod13.jpg' },
      { label: 'Blanc', hex: '#f0ebe3', img: '/images/prod14.jpg', light: true },
    ],
  },
  // ─── T-SHIRT EAGLE BADGE (nouveau modèle) ───
  {
    id: 'tee-eagle',
    name: 'T-Shirt Eagle™',
    category: 'T-Shirts',
    tagline: 'Oversize — Badge aigle dos — Logo arc poitrine',
    price: 10000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Noir',       hex: '#111',    img: '/images/prod17.jpg' },
      { label: 'Blanc',      hex: '#f0ebe3', img: '/images/prod16.jpg', light: true },
      { label: 'Sable',      hex: '#d4b896', img: '/images/prod15.jpg', light: true },
      { label: 'Bleu ciel',  hex: '#8ec6dc', img: '/images/prod18.jpg', light: true },
      { label: 'Rose',       hex: '#e8a4a4', img: '/images/prod19.jpg', light: true },
    ],
  },
  // ─── T-SHIRT BLAME (ancien modèle sérigraphie texte) ───
  {
    id: 'tee-blame',
    name: 'T-Shirt Blame™',
    category: 'T-Shirts',
    tagline: 'Oversize 280g — Sérigraphie texte avant',
    price: 10000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Noir',       hex: '#111',    img: '/images/prod9.jpg' },
      { label: 'Blanc',      hex: '#f0ebe3', img: '/images/prod7.jpg', light: true },
      { label: 'Sable',      hex: '#d4b896', img: '/images/prod3.jpg', light: true },
      { label: 'Bleu ciel',  hex: '#8ec6dc', img: '/images/prod8.jpg', light: true },
      { label: 'Rose',       hex: '#e8a4a4', img: '/images/prod10.jpg', light: true },
    ],
  },
  // ─── DÉBARDEUR ───
  {
    id: 'debardeur',
    name: 'Débardeur Eagle™',
    category: 'T-Shirts',
    tagline: 'Coupe muscle — Badge aigle dos — Unisexe',
    price: 9000,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { label: 'Noir',       hex: '#111',    img: '/images/prod21.jpg' },
      { label: 'Blanc',      hex: '#f0ebe3', img: '/images/prod23.jpg', light: true },
      { label: 'Bleu ciel',  hex: '#8ec6dc', img: '/images/prod22.jpg', light: true },
    ],
  },
  // ─── BONNET ───
  {
    id: 'bonnet',
    name: 'Bonnet Outside™',
    category: 'Accessoires',
    tagline: 'Coton stretch — Logo brodé — Taille unique',
    price: 4000,
    sizes: ['Unique'],
    colors: [
      { label: 'Noir',  hex: '#111',    img: '/images/prod24.jpg' },
      { label: 'Blanc', hex: '#f0ebe3', img: '/images/prod25.jpg', light: true },
      { label: 'Gris',  hex: '#9e9e9e', img: '/images/prod29.jpg', light: true },
    ],
  },
]

export const CATEGORIES = ['Tous', ...new Set(PRODUCTS.map(p => p.category))]
