import { useState, useRef } from 'react'

const CATEGORIES = ['Sets', 'Hauts', 'Bas', 'T-Shirts', 'Accessoires']

// couleurs prédéfinies pour le sélecteur rapide
const PRESET_COLORS = [
  { label: 'Noir',        hex: '#111111' },
  { label: 'Blanc',       hex: '#f0ebe3' },
  { label: 'Gris',        hex: '#9e9e9e' },
  { label: 'Sable',       hex: '#d4b896' },
  { label: 'Bleu ciel',   hex: '#8ec6dc' },
  { label: 'Bleu canard', hex: '#1a7b8a' },
  { label: 'Rose',        hex: '#e8a4a4' },
  { label: 'Jaune',       hex: '#e8d5a3' },
  { label: 'Vert',        hex: '#4caf7d' },
  { label: 'Marron',      hex: '#8b5e3c' },
]

function isLight(hex) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return (r*299 + g*587 + b*114) / 1000 > 140
}

// ── sélecteur couleur avec dropdown ──────────────────────────
function ColorPicker({ color, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selectPreset = (p) => {
    onChange({ ...color, label: p.label, hex: p.hex })
    setOpen(false)
  }

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <button type="button" onClick={() => setOpen(v => !v)} style={{
        display: 'flex', alignItems: 'center', gap: '.6rem',
        background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
        padding: '.6rem .85rem', width: '100%', cursor: 'pointer', textAlign: 'left',
      }}>
        <span style={{
          width: 20, height: 20, background: color.hex, flexShrink: 0,
          border: '1px solid rgba(255,255,255,.15)',
          display: 'inline-block',
        }} />
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '13px', color: 'var(--white)', flex: 1 }}>
          {color.label || 'Choisir une couleur'}
        </span>
        <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '10px' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: '#1a1a1a', border: '1px solid rgba(255,255,255,.12)',
          zIndex: 50, maxHeight: 280, overflowY: 'auto',
        }}>
          {PRESET_COLORS.map(p => (
            <button key={p.hex} type="button" onClick={() => selectPreset(p)} style={{
              display: 'flex', alignItems: 'center', gap: '.75rem',
              width: '100%', padding: '.6rem .85rem',
              background: color.hex === p.hex ? 'rgba(255,255,255,.06)' : 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              transition: 'background .12s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
            onMouseLeave={e => e.currentTarget.style.background = color.hex === p.hex ? 'rgba(255,255,255,.06)' : 'none'}>
              <span style={{
                width: 20, height: 20, background: p.hex, flexShrink: 0,
                border: '1px solid rgba(255,255,255,.15)',
              }} />
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,.7)' }}>
                {p.label}
              </span>
              {color.hex === p.hex && (
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,.4)', fontSize: '10px' }}>✓</span>
              )}
            </button>
          ))}
          {/* couleur personnalisée */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '.6rem .85rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <input type="color" value={color.hex}
              onChange={e => onChange({ ...color, hex: e.target.value, label: color.label || 'Personnalisé' })}
              style={{ width: 20, height: 20, border: 'none', background: 'none', padding: 0, cursor: 'pointer' }} />
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,.3)' }}>
              Couleur personnalisée
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── upload image ──────────────────────────────────────────────
function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(value || '')
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target.result
      setPreview(dataUrl)
      onChange(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div>
      {/* zone drop */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `1px dashed ${dragging ? 'rgba(255,255,255,.4)' : 'rgba(255,255,255,.15)'}`,
          background: dragging ? 'rgba(255,255,255,.04)' : 'transparent',
          cursor: 'pointer', transition: 'border-color .15s, background .15s',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '.5rem', padding: preview ? '0' : '1.5rem',
          minHeight: preview ? 0 : 90, position: 'relative', overflow: 'hidden',
        }}>
        {preview ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <img src={preview} alt="" style={{
              width: '100%', height: 120, objectFit: 'cover', objectPosition: 'top', display: 'block',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,.4)', opacity: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--white)' }}>
                Changer
              </span>
            </div>
          </div>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '11px', letterSpacing: '.08em', color: 'rgba(255,255,255,.25)', textAlign: 'center' }}>
              Glisser une image ou cliquer
            </span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '10px', color: 'rgba(255,255,255,.15)' }}>
              JPG, PNG, WEBP
            </span>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />

      {/* ou saisir une URL */}
      <input
        value={value?.startsWith('data:') ? '' : value}
        onChange={e => { onChange(e.target.value); setPreview(e.target.value) }}
        placeholder="ou coller une URL /images/prod99.jpg"
        style={{ ...inputStyle, marginTop: '4px', fontSize: '11px', color: 'rgba(255,255,255,.4)' }}
      />
    </div>
  )
}

// ── ligne couleur ─────────────────────────────────────────────
function ColorRow({ c, i, onChange, onRemove, total }) {
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,.07)',
      padding: '1rem',
      background: 'rgba(255,255,255,.02)',
      display: 'flex', flexDirection: 'column', gap: '.75rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)' }}>
          Couleur {i + 1}
        </span>
        <button onClick={() => onRemove(i)} disabled={total <= 1} style={{
          background: 'none', border: 'none', color: total <= 1 ? 'rgba(255,255,255,.1)' : 'rgba(220,80,80,.6)',
          cursor: total <= 1 ? 'default' : 'pointer', fontSize: '11px', letterSpacing: '.1em',
          fontFamily: 'var(--sans)', fontWeight: 300,
        }}>Supprimer</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }} className="color-row-grid">
        <div>
          <p style={labelStyle}>Couleur</p>
          <ColorPicker color={c} onChange={v => onChange(i, v)} />
        </div>
        <div>
          <p style={labelStyle}>Nom personnalisé</p>
          <input value={c.label} onChange={e => onChange(i, { ...c, label: e.target.value })}
            placeholder="ex: Bleu nuit" style={inputStyle} />
        </div>
      </div>

      <div>
        <p style={labelStyle}>Image</p>
        <ImageUpload value={c.img} onChange={v => onChange(i, { ...c, img: v })} />
      </div>
    </div>
  )
}

// ── form principal ────────────────────────────────────────────
const EMPTY = {
  id: '', name: '', category: 'T-Shirts', tagline: '',
  price: '', sizes: 'S,M,L,XL',
  colors: [{ label: 'Noir', hex: '#111111', img: '' }],
}

export default function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? {
    ...initial,
    sizes: initial.sizes.join(','),
    colors: initial.colors.map(c => ({ ...c })),
  } : { ...EMPTY })
  const [err, setErr] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const setColor = (i, updates) => {
    const cols = form.colors.map((c, ci) => ci === i ? (typeof updates === 'object' && !updates.label ? { ...c, ...updates } : updates) : c)
    setForm(f => ({ ...f, colors: cols }))
  }
  const addColor = () => setForm(f => ({ ...f, colors: [...f.colors, { label: '', hex: '#cccccc', img: '' }] }))
  const removeColor = i => setForm(f => ({ ...f, colors: f.colors.filter((_, ci) => ci !== i) }))

  const handleSave = () => {
    if (!form.name.trim()) return setErr('Nom requis.')
    if (!form.price || isNaN(Number(form.price))) return setErr('Prix invalide.')
    if (form.colors.some(c => !c.label)) return setErr('Chaque couleur doit avoir un nom.')
    const sizes = form.sizes.split(',').map(s => s.trim()).filter(Boolean)
    if (!sizes.length) return setErr('Au moins une taille requise.')
    const id = form.id || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const colors = form.colors.map(c => ({ ...c, light: isLight(c.hex) }))
    onSave({ ...form, id, price: Number(form.price), sizes, colors })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

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

      <Field label={`Couleurs (${form.colors.length})`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {form.colors.map((c, i) => (
            <ColorRow key={i} c={c} i={i} onChange={setColor} onRemove={removeColor} total={form.colors.length} />
          ))}
          <button type="button" onClick={addColor} style={{
            alignSelf: 'flex-start', background: 'none',
            border: '1px dashed rgba(255,255,255,.15)', color: 'rgba(255,255,255,.4)',
            fontFamily: 'var(--sans)', fontWeight: 300,
            fontSize: '11px', letterSpacing: '.1em',
            padding: '.55rem 1.1rem', cursor: 'pointer',
            transition: 'border-color .15s, color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; e.currentTarget.style.color = 'var(--white)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; e.currentTarget.style.color = 'rgba(255,255,255,.4)' }}>
            + Ajouter une couleur
          </button>
        </div>
      </Field>

      {err && <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: '#e05c5c' }}>{err}</p>}

      <div style={{ display: 'flex', gap: '1rem', paddingTop: '.5rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={handleSave} style={{
          background: 'var(--white)', color: 'var(--black)', border: 'none',
          fontFamily: 'var(--sans)', fontWeight: 400,
          fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
          padding: '.85rem 2rem', cursor: 'pointer', minHeight: 46,
        }}>Enregistrer</button>
        <button type="button" onClick={onCancel} style={{
          background: 'none', border: '1px solid rgba(255,255,255,.12)',
          color: 'rgba(255,255,255,.4)',
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase',
          padding: '.85rem 1.5rem', cursor: 'pointer',
        }}>Annuler</button>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .color-row-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

const labelStyle = {
  fontFamily: 'var(--sans)', fontWeight: 300,
  fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,.3)', margin: 0,
}

const inputStyle = {
  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
  color: 'var(--white)', fontFamily: 'var(--sans)', fontWeight: 300,
  fontSize: '13px', padding: '.7rem .85rem',
  outline: 'none', width: '100%', boxSizing: 'border-box',
}
