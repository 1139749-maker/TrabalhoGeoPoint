import { useState } from 'react'

const inicial = { name: '', description: '', latitude: '', longitude: '' }

export default function FormPonto({ pontoInicial, textoBotao, onSalvar }) {
  const [form, setForm] = useState(() => pontoInicial ? {
    name: pontoInicial.name ?? '',
    description: pontoInicial.description ?? '',
    latitude: String(pontoInicial.latitude ?? ''),
    longitude: String(pontoInicial.longitude ?? ''),
  } : inicial)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  function alterar(e) {
    setForm((atual) => ({ ...atual, [e.target.name]: e.target.value }))
  }

  async function enviar(e) {
    e.preventDefault()
    setErro('')
    const nome = form.name.trim()
    const descricao = form.description.trim()
    const latitude = Number(form.latitude)
    const longitude = Number(form.longitude)

    if (!nome) return setErro('Informe o nome do ponto.')
    if (nome.length > 100) return setErro('O nome deve ter no máximo 100 caracteres.')
    if (descricao.length > 255) return setErro('A descrição deve ter no máximo 255 caracteres.')
    if (form.latitude.trim() === '' || !Number.isFinite(latitude) || latitude < -90 || latitude > 90)
      return setErro('Informe uma latitude válida entre -90 e 90.')
    if (form.longitude.trim() === '' || !Number.isFinite(longitude) || longitude < -180 || longitude > 180)
      return setErro('Informe uma longitude válida entre -180 e 180.')

    setSalvando(true)
    try {
      await onSalvar({ name: nome, description: descricao, latitude, longitude })
    } catch (e) {
      setErro(e.message || 'Não foi possível salvar o ponto.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <form className="form-card" onSubmit={enviar} noValidate>
      <div className="form-grid">
        <div className="field field-full">
          <label htmlFor="name">Nome do ponto <span>*</span></label>
          <input id="name" name="name" value={form.name} onChange={alterar} maxLength="100" placeholder="Ex.: Praça Central" required />
          <small>{form.name.length}/100 caracteres</small>
        </div>
        <div className="field field-full">
          <label htmlFor="description">Descrição</label>
          <textarea id="description" name="description" value={form.description} onChange={alterar} maxLength="255" rows="3" placeholder="Descreva brevemente este local (opcional)" />
          <small>{form.description.length}/255 caracteres</small>
        </div>
        <div className="field">
          <label htmlFor="latitude">Latitude <span>*</span></label>
          <input id="latitude" name="latitude" type="number" step="any" min="-90" max="90" value={form.latitude} onChange={alterar} placeholder="-28.2825" required />
          <small>Valor entre -90 e 90</small>
        </div>
        <div className="field">
          <label htmlFor="longitude">Longitude <span>*</span></label>
          <input id="longitude" name="longitude" type="number" step="any" min="-180" max="180" value={form.longitude} onChange={alterar} placeholder="-52.7869" required />
          <small>Valor entre -180 e 180</small>
        </div>
      </div>
      {erro && <div className="form-error" role="alert">{erro}</div>}
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={salvando}>{salvando ? 'Salvando...' : textoBotao}</button>
      </div>
    </form>
  )
}
