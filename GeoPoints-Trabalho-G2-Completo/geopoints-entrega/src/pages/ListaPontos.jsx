import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { excluirPonto, listarPontos } from '../services/api'
import FiltroPontos from '../components/FiltroPontos'
import TabelaPontos from '../components/TabelaPontos'
import Status from '../components/Status'

export default function ListaPontos() {
  const location = useLocation()
  const [pontos, setPontos] = useState([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [excluindoId, setExcluindoId] = useState(null)

  const carregar = useCallback(async () => {
    setCarregando(true)
    setErro('')
    try {
      const dados = await listarPontos()
      if (!Array.isArray(dados)) throw new Error('A resposta da API não está no formato esperado.')
      setPontos(dados)
    } catch (e) {
      setErro(e.message || 'Não foi possível carregar os pontos.')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => { carregar() }, [carregar])

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR')
    if (!termo) return pontos
    return pontos.filter((p) =>
      `${p.name || ''} ${p.description || ''}`.toLocaleLowerCase('pt-BR').includes(termo))
  }, [pontos, busca])

  async function remover(ponto) {
    if (!window.confirm(`Tem certeza de que deseja excluir "${ponto.name}"?`)) return
    setExcluindoId(ponto.id)
    setErro('')
    try {
      await excluirPonto(ponto.id)
      setPontos((atuais) => atuais.filter((p) => p.id !== ponto.id))
    } catch (e) {
      setErro(e.message || 'Não foi possível excluir o ponto.')
    } finally {
      setExcluindoId(null)
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div><span className="eyebrow">GESTÃO DE LOCAIS</span><h1>Pontos geográficos</h1><p>Cadastre, consulte e gerencie os pontos registrados.</p></div>
        <Link className="button button-primary" to="/pontos/novo"><span aria-hidden="true">＋</span> Novo ponto</Link>
      </div>
      <div className="content-card">
        <div className="card-heading"><div><h2>Todos os pontos</h2><p>Consulte os locais cadastrados na GeoPoint API.</p></div><span className="live-label"><i /> API</span></div>
        <FiltroPontos valor={busca} onChange={setBusca} total={pontos.length} encontrados={filtrados.length} />
        {location.state?.mensagem && <Status tipo="sucesso">{location.state.mensagem}</Status>}
        {erro && <Status tipo="erro">{erro} <button className="text-button" onClick={carregar} type="button">Tentar novamente</button></Status>}
        {carregando ? <Status>Carregando pontos...</Status> :
          erro ? null :
          pontos.length === 0 ? <Status>Nenhum ponto cadastrado ainda. Utilize “Novo ponto” para começar.</Status> :
          filtrados.length === 0 ? <Status>Nenhum ponto encontrado para “{busca}”.</Status> :
          <TabelaPontos pontos={filtrados} onExcluir={remover} excluindoId={excluindoId} />}
        <div className="card-footnote">Os dados exibidos são carregados diretamente da GeoPoint API.</div>
      </div>
    </section>
  )
}
