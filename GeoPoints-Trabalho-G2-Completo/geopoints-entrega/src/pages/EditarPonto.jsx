import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormPonto from '../components/FormPonto'
import Status from '../components/Status'
import { atualizarPonto, buscarPonto } from '../services/api'

export default function EditarPonto() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [ponto, setPonto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true
    buscarPonto(id).then((dados) => { if (ativo) setPonto(dados) })
      .catch((e) => { if (ativo) setErro(e.message) })
      .finally(() => { if (ativo) setCarregando(false) })
    return () => { ativo = false }
  }, [id])

  async function salvar(dados) {
    await atualizarPonto(id, dados)
    navegar(`/pontos/${id}`, { replace: true })
  }

  return (
    <section className="narrow-page">
      <div className="breadcrumb"><Link to="/pontos">Pontos</Link><span>/</span>{ponto ? <Link to={`/pontos/${id}`}>{ponto.name}</Link> : 'Editar'}<span>/</span><span>Editar</span></div>
      <div className="page-heading"><div><span className="eyebrow">ATUALIZAÇÃO</span><h1>Editar ponto</h1><p>Altere as informações e salve as atualizações.</p></div></div>
      {carregando ? <Status>Carregando dados do ponto...</Status> : erro ? <Status tipo="erro">{erro}</Status> : ponto ? <FormPonto pontoInicial={ponto} textoBotao="Salvar alterações" onSalvar={salvar} /> : <Status tipo="erro">Ponto não encontrado.</Status>}
    </section>
  )
}
