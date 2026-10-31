// Carte vitrée avec halo cyan qui suit le curseur.
export default function GlowCard({ as: Tag = 'article', className = '', style, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag className={`glow-card ${className}`.trim()} style={style} onPointerMove={onMove}>
      {children}
    </Tag>
  )
}
