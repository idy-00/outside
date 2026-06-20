import { useState, useEffect } from 'react'
import { PRODUCTS } from '../data/products'

const KEY = 'outside_admin_products'

function loadCustom() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] }
  catch { return [] }
}

function saveCustom(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function useAdminProducts() {
  const [custom, setCustom] = useState(loadCustom)

  const allProducts = [...PRODUCTS, ...custom]

  function addProduct(p) {
    const newList = [...custom, { ...p, _custom: true }]
    setCustom(newList)
    saveCustom(newList)
  }

  function updateProduct(id, updates) {
    // base products: store override
    const isBase = PRODUCTS.find(p => p.id === id)
    if (isBase) {
      const override = custom.find(p => p.id === id)
      if (override) {
        const newList = custom.map(p => p.id === id ? { ...p, ...updates } : p)
        setCustom(newList)
        saveCustom(newList)
      } else {
        const base = PRODUCTS.find(p => p.id === id)
        const newList = [...custom, { ...base, ...updates, _override: true }]
        setCustom(newList)
        saveCustom(newList)
      }
    } else {
      const newList = custom.map(p => p.id === id ? { ...p, ...updates } : p)
      setCustom(newList)
      saveCustom(newList)
    }
  }

  function deleteProduct(id) {
    const isBase = PRODUCTS.find(p => p.id === id)
    if (isBase) {
      // mark as hidden
      const existing = custom.find(p => p.id === id)
      if (existing) {
        const newList = custom.map(p => p.id === id ? { ...p, _hidden: true } : p)
        setCustom(newList)
        saveCustom(newList)
      } else {
        const base = PRODUCTS.find(p => p.id === id)
        const newList = [...custom, { ...base, _hidden: true }]
        setCustom(newList)
        saveCustom(newList)
      }
    } else {
      const newList = custom.filter(p => p.id !== id)
      setCustom(newList)
      saveCustom(newList)
    }
  }

  function restoreProduct(id) {
    const newList = custom.map(p => p.id === id ? { ...p, _hidden: false } : p)
    setCustom(newList)
    saveCustom(newList)
  }

  // merged view: base products + custom overrides, excluding hidden
  const merged = PRODUCTS
    .map(base => {
      const override = custom.find(p => p.id === base.id)
      return override ? { ...base, ...override } : base
    })
    .filter(p => !p._hidden)
    .concat(custom.filter(p => p._custom && !p._hidden))

  return { merged, allProducts, custom, addProduct, updateProduct, deleteProduct, restoreProduct }
}
