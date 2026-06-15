import { createContext, useContext, useReducer, useCallback } from 'react'

const Ctx = createContext(null)

function reducer(state, a) {
  switch (a.type) {
    case 'ADD': {
      const key = `${a.item.id}|${a.item.color}|${a.item.size}`
      const ex  = state.items.find(i => i.key === key)
      return ex
        ? { ...state, items: state.items.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) }
        : { ...state, items: [...state.items, { ...a.item, key, qty: 1 }] }
    }
    case 'REMOVE': return { ...state, items: state.items.filter(i => i.key !== a.key) }
    case 'QTY':    return { ...state, items: state.items.map(i => i.key === a.key ? { ...i, qty: Math.max(1, a.qty) } : i) }
    case 'CLEAR':  return { ...state, items: [] }
    case 'OPEN':   return { ...state, open: true }
    case 'CLOSE':  return { ...state, open: false }
    default:       return state
  }
}

export function CartProvider({ children }) {
  const [s, dispatch] = useReducer(reducer, { items: [], open: false })
  const add    = useCallback(item       => dispatch({ type: 'ADD',    item }),       [])
  const remove = useCallback(key        => dispatch({ type: 'REMOVE', key }),        [])
  const setQty = useCallback((key, qty) => dispatch({ type: 'QTY',    key, qty }),   [])
  const clear  = useCallback(()         => dispatch({ type: 'CLEAR' }),              [])
  const openCart  = useCallback(()      => dispatch({ type: 'OPEN'  }),              [])
  const closeCart = useCallback(()      => dispatch({ type: 'CLOSE' }),              [])
  const count  = s.items.reduce((t, i) => t + i.qty, 0)
  const total  = s.items.reduce((t, i) => t + (i.price || 0) * i.qty, 0)
  return (
    <Ctx.Provider value={{ ...s, add, remove, setQty, clear, openCart, closeCart, count, total }}>
      {children}
    </Ctx.Provider>
  )
}

export const useCart = () => useContext(Ctx)
