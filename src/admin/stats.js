const KEY = 'outside_stats'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} }
  catch { return {} }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function trackWhatsApp() {
  const d = load()
  d.waClicks = (d.waClicks || 0) + 1
  d.lastOrder = Date.now()
  d.orders = d.orders || []
  d.orders.push({ ts: Date.now() })
  if (d.orders.length > 200) d.orders = d.orders.slice(-200)
  save(d)
}

export function trackCartAdd(productId) {
  const d = load()
  d.cartAdds = (d.cartAdds || 0) + 1
  d.productAdds = d.productAdds || {}
  d.productAdds[productId] = (d.productAdds[productId] || 0) + 1
  save(d)
}

export function trackPageView() {
  const d = load()
  d.pageViews = (d.pageViews || 0) + 1
  d.lastVisit = Date.now()
  save(d)
}

export function getStats() {
  return load()
}
