import { useState } from 'react'

const CATEGORIES = ['Sets', 'Hauts', 'Bas', 'T-Shirts', 'Accessoires']

const EMPTY = {
  id: '', name: '', category: 'T-Shirts', tagline: '',
  price: '', sizes: 'S,M,L,XL',
  colors: [{ label: 'Noir', hex: '#111111', img: '' }],
}

function ColorRow({ c, i, onChange, onRemove, total }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 90px 1fr 36px',
      gap: '.5rem', alignItems: 'center',
    }}>
      <input value={c.label} onChange={e => onChange(i, 'label', e.target.value)}
        placeholder="Nom couleur" style={inputStyle} />
      <input type="color" value={c.hex} onChange={e => onChange(i, 'hex', e.target.value)}
        style={{ ...inputStyle, padding: '2px 4px', height: 38 }} />
      <input value={c.img} onChange={e => onChange(i, 'img', e.target.value)}
        placeholder="/images/prod99.jpg" style={inputStyle} />
      <button onClick={() => onRemove(i)} disabled={total <= 1} style={{
        background: 'none', border: '1px solid rgba(255,255,255,.1)',
        color: 'rgba(255,255,255,.4)', width: 36, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: total <= 1 ? 'default' : 'pointer', opacity: total <= 1 ? .3 : 1,
      }}>×</button>
    </div>
  )
}

export default function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? {
    ...initial,
    sizes: initial.sizes.join(','),
    colors: initial.colors.map(c => ({ ...c })),
  } : { ...EMPTY })
  const [err, setErr] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const setColor = (i, k, v) => {
    const cols = form.colors.map((c, ci) => ci === i ? { ...c, [k]: v } : c)
    setForm(f => ({ ...f, colors: cols }))
  }
  const addColor = () => setForm(f => ({ ...f, colors: [...f.colors, { label: '', hex: '#cccccc', img: '' }] }))
  const removeColor = i => setForm(f => ({ ...f, colors: f.colors.filter((_, ci) => ci !== i) }))

  const handleSave = () => {
    if (!form.name.trim()) return setErr('Nom requis.')
    if (!form.price || isNaN(Number(form.price))) return setErr('Prix invalide.')
    if (form.colors.some(c => !c.label || !c.img)) return setErr('Chaque couleur doit avoir un nom et une image.')
    const sizes = form.sizes.split(',').map(s => s.trim()).filter(Boolean)
    if (!sizes.length) return setErr('Au moins une taille requise.')
    const id = form.id || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    onSave({ ...form, id, price: Number(form.price), sizes, colors: form.colors })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
        <Field label="Nom du produit">
          <input value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} placeholder="Hoodie Outside™" />
        </Field>
        <Field label="Catégorie">
          <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Tagline">
        <input value={form.tagline} onChange={e => set('tagline', e.target.value)} style={inputStyle} placeholder="Description courte — détails matière" />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
        <Field label="Prix (F CFA)">
          <input type="number" value={form.price} onChange={e => set('price', e.target.value)} style={inputStyle} placeholder="15000" />
        </Field>
        <Field label="Tailles (séparées par virgule)">
          <input value={form.sizes} onChange={e => set('sizes', e.target.value)} style={inputStyle} placeholder="S,M,L,XL,XXL" />
        </Field>
      </div>

      <Field label="Couleurs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 90px 1fr 36px',
            gap: '.5rem', marginBottom: '.25rem',
          }}>
            {['Nom', 'Hex', 'Image (/images/...)', ''].map((h, i) => (
              <span key={i} style={{
                fontFamily: 'var(--sans)', fontWeight: 300,
                fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,.2)',
              }}>{h}</span>
            ))}
          </div>
          {form.colors.map((c, i) => (
            <ColorRow key={i} c={c} i={i} onChange={setColor} onRemove={removeColor} total={form.colors.length} />
          ))}
          <button onClick={addColor} style={{
            alignSelf: 'flex-start', background: 'none',
            border: '1px dashed rgba(255,255,255,.15)', color: 'rgba(255,255,255,.35)',
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '11px', letterSpacing: '.1em',
            padding: '.5rem 1rem', cursor: 'pointer',
          }}>+ Ajouter une couleur</button>
        </div>
      </Field>

      {err && <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: '#e05c5c' }}>{err}</p>}

      <div style={{ display: 'flex', gap: '1rem', paddingTop: '.5rem' }}>
        <button onClick={handleSave} style={{
          background: 'var(--white)', color: 'var(--black)', border: 'none',
          fontFamily: 'var(--sans)', fontWeight: 400,
          fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
          padding: '.85rem 2rem', cursor: 'pointer', minHeight: 46,
        }}>Enregistrer</button>
        <button onClick={onCancel} style={{
          background: 'none', border: '1px solid rgba(255,255,255,.12)',
          color: 'rgba(255,255,255,.4)',
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
          padding: '.85rem 1.5rem', cursor: 'pointer',
        }}>Annuler</button>
      </div>

      <style>{`
        @media (max-width: 600px) { .form-grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
      <label style={{
        fontFamily: 'var(--sans)', fontWeight: 300,
        fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,.3)',
      }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = {
  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
  color: 'var(--white)', fontFamily: 'var(--sans)', fontWeight: 300,
  fontSize: '13px', padding: '.7rem .85rem',
  outline: 'none', width: '100%', boxSizing: 'border-box',
}
