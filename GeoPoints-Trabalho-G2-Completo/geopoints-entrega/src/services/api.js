// A URL base fica centralizada aqui. Pode ser sobrescrita por VITE_API_URL no .env.
const API_URL = (import.meta.env.VITE_API_URL || 'https://geopoint-6x4u.onrender.com/api/points').replace(/\/$/, '')

async function requisicao(url, options = {}) {
  let resposta
  try {
    resposta = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        Accept: 'application/json',
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Não foi possível conectar à GeoPoint API. Verifique sua conexão e tente novamente.')
  }

  if (resposta.status === 204) return null

  const texto = await resposta.text()
  let dados = null
  if (texto) {
    try { dados = JSON.parse(texto) } catch { dados = texto }
  }

  if (!resposta.ok) {
    const mensagem = dados && typeof dados === 'object'
      ? (dados.message || dados.error || dados.detail)
      : null
    throw new Error(mensagem || `A API respondeu com erro HTTP ${resposta.status}.`)
  }
  return dados
}

export const listarPontos = () => requisicao(API_URL)
export const buscarPonto = (id) => requisicao(`${API_URL}/${encodeURIComponent(id)}`)
export const criarPonto = (ponto) => requisicao(API_URL, {
  method: 'POST',
  body: JSON.stringify(ponto),
})
export const atualizarPonto = (id, ponto) => requisicao(`${API_URL}/${encodeURIComponent(id)}`, {
  method: 'PUT',
  body: JSON.stringify(ponto),
})
export const excluirPonto = (id) => requisicao(`${API_URL}/${encodeURIComponent(id)}`, {
  method: 'DELETE',
})
