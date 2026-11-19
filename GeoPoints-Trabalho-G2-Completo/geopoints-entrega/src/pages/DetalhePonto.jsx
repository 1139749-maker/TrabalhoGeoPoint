import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { buscarPonto, excluirPonto } from '../services/api'
import Status from '../components/Status'

export default function DetalhePonto() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [ponto, setPonto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [excluindo, setExcluindo] = useState(false)

  useEffect(() => {
    let ativo = true
    buscarPonto(id).then((dados) => { if (ativo) setPonto(dados) })
      .catch((e) => { if (ativo) setErro(e.message) })
      .finally(() => { if (ativo) setCarregando(false) })
    return () => { ativo = false }
  }, [id])

  async function remover() {
    if (!window.confirm(`Tem certeza de que deseja excluir "${ponto.name}"?`)) return
    setExcluindo(true)
    try {
      await excluirPonto(id)
      navegar('/pontos', { replace: true })
    } catch (e) {
      setErro(e.message)
      setExcluindo(false)
    }
  }

  return (
    <section className="narrow-page">
      <div className="breadcrumb"><Link to="/pontos">Pontos</Link><span>/</span><span>Detalhes</span></div>
      {carregando ? <Status>Carregando dados do ponto...</Status> : erro ? <Status tipo="erro">{erro}</Status> : ponto ? <>
        <div className="page-heading detail-heading"><div><span className="eyebrow">DETALHES DO REGISTRO</span><h1>{ponto.name}</h1><p>Informações completas do ponto geográfico.</p></div><div className="heading-actions"><Link className="button button-secondary" to={`/pontos/${id}/editar`}>Editar</Link><button className="button button-danger" onClick={remover} disabled={excluindo}>{excluindo ? 'Excluindo...' : 'Excluir'}</button></div></div>
        <div className="detail-card">
          <div className="detail-top"><span className="detail-pin">⌖</span><div><span className="eyebrow">PONTO GEOGRÁFICO</span><h2>{ponto.name}</h2></div></div>
          <div className="detail-grid">
            <div className="detail-item detail-full"><span>Descrição</span><p>{ponto.description || 'Nenhuma descrição informada.'}</p></div>
            <div className="detail-item"><span>Latitude</span><strong>{ponto.latitude}</strong></div>
            <div className="detail-item"><span>Longitude</span><strong>{ponto.longitude}</strong></div>
            <div className="detail-item detail-full"><span>Identificador (UUID)</span><code>{ponto.id}</code></div>
          </div>
          <div className="detail-footer"><Link to="/pontos" className="back-link">← Voltar para listagem</Link></div>
        </div>
      </> : <Status tipo="erro">Ponto não encontrado.</Status>}
    </section>
  )
}
