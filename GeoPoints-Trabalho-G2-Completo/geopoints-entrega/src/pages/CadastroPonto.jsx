import { Link, useNavigate } from 'react-router-dom'
import FormPonto from '../components/FormPonto'
import { criarPonto } from '../services/api'

export default function CadastroPonto() {
  const navegar = useNavigate()
  async function salvar(dados) {
    await criarPonto(dados)
    navegar('/pontos', { replace: true, state: { mensagem: 'Ponto cadastrado com sucesso!' } })
  }
  return (
    <section className="narrow-page">
      <div className="breadcrumb"><Link to="/pontos">Pontos</Link><span>/</span><span>Novo cadastro</span></div>
      <div className="page-heading"><div><span className="eyebrow">NOVO REGISTRO</span><h1>Cadastrar ponto</h1><p>Preencha os dados do local que deseja registrar.</p></div></div>
      <FormPonto textoBotao="Cadastrar ponto" onSalvar={salvar} />
      <p className="required-note"><span>*</span> Campos obrigatórios</p>
    </section>
  )
}
