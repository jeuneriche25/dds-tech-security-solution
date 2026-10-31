// Vues de caméras dessinées : quatre scènes nettes, sans photo ni droit d'auteur.
const SCENES = {
  entree: (
    <>
      <rect className="s-wall" width="160" height="70" />
      <rect className="s-floor" y="70" width="160" height="30" />
      <path className="s-line" d="M0 70H160M20 100L50 70M140 100L110 70" />
      <rect className="s-glow" x="56" y="16" width="48" height="52" />
      <rect className="s-obj" x="52" y="12" width="56" height="58" rx="2" />
      <path className="s-line" d="M80 12V70M52 36H108" />
      <g className="s-person">
        <circle cx="122" cy="46" r="5" />
        <rect x="115" y="52" width="14" height="26" rx="6" />
      </g>
      <rect className="s-box" x="110" y="38" width="26" height="44" />
      <text className="s-tag" x="110" y="35">
        PERSONNE
      </text>
    </>
  ),
  accueil: (
    <>
      <rect className="s-wall" width="160" height="72" />
      <rect className="s-floor" y="72" width="160" height="28" />
      <circle className="s-glow" cx="40" cy="6" r="26" />
      <circle className="s-glow" cx="124" cy="6" r="22" />
      <rect className="s-obj" x="40" y="40" width="24" height="14" rx="1.5" />
      <path className="s-line" d="M52 54v4" />
      <g className="s-person">
        <circle cx="86" cy="38" r="5.5" />
        <rect x="78" y="44" width="16" height="16" rx="6" />
      </g>
      <rect className="s-obj" x="22" y="58" width="86" height="22" rx="2" />
      <rect className="s-top" x="18" y="55" width="94" height="4" rx="1" />
      <rect className="s-obj" x="130" y="62" width="10" height="16" rx="1" />
      <circle className="s-plant" cx="135" cy="54" r="10" />
      <rect className="s-box" x="74" y="30" width="24" height="32" />
      <text className="s-tag" x="74" y="27">
        PERSONNE
      </text>
    </>
  ),
  entrepot: (
    <>
      <rect className="s-wall" width="160" height="70" />
      <rect className="s-floor" y="70" width="160" height="30" />
      <path className="s-line" d="M0 100L44 70M160 100L116 70M80 100V70" />
      {[8, 62, 116].map((x) => (
        <g key={x}>
          <rect className="s-rack" x={x} y="8" width="36" height="62" />
          <path className="s-line" d={`M${x} 29H${x + 36}M${x} 50H${x + 36}`} />
          <rect className="s-item" x={x + 3} y="14" width="12" height="15" />
          <rect className="s-item" x={x + 19} y="18" width="14" height="11" />
          <rect className="s-item" x={x + 4} y="35" width="16" height="15" />
          <rect className="s-item" x={x + 23} y="38" width="10" height="12" />
          <rect className="s-item" x={x + 3} y="56" width="14" height="14" />
          <rect className="s-item" x={x + 20} y="58" width="13" height="12" />
        </g>
      ))}
      <rect className="s-box" x="64" y="52" width="32" height="30" />
      <text className="s-tag" x="64" y="49">
        PALETTE
      </text>
    </>
  ),
  parking: (
    <>
      <rect className="s-wall" width="160" height="46" />
      <path className="s-skyline" d="M0 46V30h14V22h12v12h10V26h16v20zM108 46V28h12V18h14v14h8V24h18v22z" />
      <rect className="s-floor" y="46" width="160" height="54" />
      <path className="s-line" d="M0 70H160M44 100L58 46M118 100L104 46" />
      <g className="s-car">
        <rect x="22" y="66" width="46" height="14" rx="5" />
        <path d="M30 66l6-10h20l6 10z" />
        <circle cx="34" cy="81" r="4.5" />
        <circle cx="58" cy="81" r="4.5" />
      </g>
      <g className="s-car s-car--far">
        <rect x="104" y="56" width="30" height="9" rx="3" />
        <path d="M110 56l4-7h12l4 7z" />
        <circle cx="112" cy="66" r="3" />
        <circle cx="128" cy="66" r="3" />
      </g>
      <rect className="s-box" x="18" y="52" width="54" height="36" />
      <text className="s-tag" x="18" y="49">
        VÉHICULE
      </text>
    </>
  ),
}

export default function CamFeed({ scene, label }) {
  return (
    <figure className={`cam cam--${scene}`}>
      <svg className="cam__scene" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" focusable="false">
        {SCENES[scene]}
      </svg>
      <span className="cam__rec">
        <i className="dot dot--rec" />
        REC
      </span>
      <figcaption className="cam__label">{label}</figcaption>
    </figure>
  )
}
