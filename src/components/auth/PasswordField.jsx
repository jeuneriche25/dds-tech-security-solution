import { useState } from 'react'
import Icon from '../ui/Icon.jsx'

export default function PasswordField({ id, label, value, onChange, autoComplete, error, hint }) {
  const [shown, setShown] = useState(false)
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <div className="password">
        <input
          id={id}
          name={id}
          className="field__control"
          type={shown ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        />
        <button
          type="button"
          className="password__toggle"
          onClick={() => setShown((v) => !v)}
          aria-label={shown ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          aria-pressed={shown}
        >
          <Icon name={shown ? 'eyeoff' : 'eye'} size="sm" />
        </button>
      </div>
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : (
        hint && (
          <p className="field__hint" id={`${id}-hint`}>
            {hint}
          </p>
        )
      )}
    </div>
  )
}
