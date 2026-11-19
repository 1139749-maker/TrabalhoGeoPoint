export default function FiltroPontos({ valor, onChange, total, encontrados }) {
  return (
    <div className="filter-area">
      <label className="search-box">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar por nome ou descrição..."
          aria-label="Filtrar pontos por nome ou descrição"
        />
        {valor && <button type="button" className="clear-search" onClick={() => onChange('')} aria-label="Limpar busca">×</button>}
      </label>
      <span className="result-count">{valor ? `${encontrados} de ${total} pontos` : `${total} ${total === 1 ? 'ponto cadastrado' : 'pontos cadastrados'}`}</span>
    </div>
  )
}
