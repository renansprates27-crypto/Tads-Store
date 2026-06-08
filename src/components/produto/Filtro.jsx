import React from 'react';
import './filtro.css';

function Filtro({ categorias, categoriaSelecionada, onChange }) {
  return (
    <div className="filtro">
      <label className="filtro-label">Categorias:</label>
      <div className="filtro-opcoes">
        <button
          className={`filtro-btn ${categoriaSelecionada === '' ? 'ativo' : ''}`}
          onClick={() => onChange('')}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`filtro-btn ${categoriaSelecionada === cat ? 'ativo' : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filtro;
