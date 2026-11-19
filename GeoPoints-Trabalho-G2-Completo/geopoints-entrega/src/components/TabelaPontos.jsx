import { Link } from 'react-router-dom'

export default function TabelaPontos({ pontos, onExcluir, excluindoId }) {
  if (!pontos.length) return null
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Nome</th><th>Descrição</th><th>Latitude</th><th>Longitude</th><th className="actions-heading">Ações</th></tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.id}>
              <td data-label="Nome"><Link className="point-name" to={`/pontos/${ponto.id}`}>{ponto.name}</Link></td>
              <td data-label="Descrição" className="description-cell">{ponto.description || '—'}</td>
              <td data-label="Latitude" className="coordinate">{ponto.latitude}</td>
              <td data-label="Longitude" className="coordinate">{ponto.longitude}</td>
              <td data-label="Ações">
                <div className="row-actions">
                  <Link className="icon-action view-action" to={`/pontos/${ponto.id}`} title="Ver detalhes" aria-label={`Ver ${ponto.name}`}>Ver</Link>
                  <Link className="icon-action edit-action" to={`/pontos/${ponto.id}/editar`} title="Editar ponto" aria-label={`Editar ${ponto.name}`}>Editar</Link>
                  <button className="icon-action delete-action" type="button" onClick={() => onExcluir(ponto)} disabled={excluindoId === ponto.id}>
                    {excluindoId === ponto.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
