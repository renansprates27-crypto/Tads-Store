import React from 'react';
import './buscador.css';

function Buscador({ valor, onChange, placeholder = "Buscar produtos..." }) {
  return (
    <div className="buscador">
      <input
        type="text"
        className="buscador-input"
        placeholder={placeholder}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="buscador-icon">🔍</span>
    </div>
  );
}

export default Buscador;
