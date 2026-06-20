import { createContext, useContext, useState, useEffect } from 'react'
import { PRODUCTS as BASE } from '../data/products'

const KEY = 'outside_admin_products'

function loadCustom() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] }
  catch { return [] }
}

const ProductsContext = createContext([])

export function ProductsProvider({ children }) {
  const [custom, setCustom] = useState(loadCustom)

  // keep in sync if admin updates in same tab
  useEffect(() => {
    const onStorage = () => setCustom(loadCustom())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const merged = [
    ...BASE.map(base => {
      const override = custom.find(c => c.id === base.id)
      return override ? { ...base, ...override } : base
    }).filter(p => !p._hidden),
    ...custom.filter(c => c._custom && !c._hidden),
  ]

  return <ProductsContext.Provider value={merged}>{children}</ProductsContext.Provider>
}

export const useProducts = () => useContext(ProductsContext)
