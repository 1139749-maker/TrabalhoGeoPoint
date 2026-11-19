# GeoPoints — Trabalho G2 | Atitus Educação

Frontend React para gerenciamento de pontos geográficos, consumindo a GeoPoint API. O projeto implementa as quatro operações do CRUD e as rotas solicitadas no enunciado.

## Integrantes
- Nome: preencher
- Nome: preencher

## Tecnologias
- React + Vite
- React Router
- JavaScript (ES Modules)
- CSS responsivo
- Fetch API com async/await e tratamento de erros

## API utilizada
`https://geopoint-6x4u.onrender.com/api/points`

A URL fica centralizada em `src/services/api.js`. Para configurar outro ambiente, copie `.env.example` para `.env` e altere `VITE_API_URL`.

## Como executar
Requisitos: Node.js compatível com a versão atual do Vite e npm.

```bash
npm install
npm run dev
```

Abra o endereço indicado pelo Vite (normalmente http://localhost:5173).

Para validar a versão de produção:

```bash
npm run build
npm run preview
```

## Rotas implementadas

| Rota | Finalidade |
|---|---|
| `/pontos` | Listagem, filtro e exclusão |
| `/pontos/novo` | Cadastro |
| `/pontos/:id` | Detalhes e exclusão |
| `/pontos/:id/editar` | Edição |
| `*` | Página não encontrada |

## Funcionalidades
- Listagem carregada da API.
- Filtro local por nome e descrição, sem diferenciar maiúsculas/minúsculas.
- Cadastro e edição com formulário controlado e validação.
- Latitude e longitude convertidas para `Number`.
- Detalhe consultado pelo UUID.
- Exclusão com confirmação e tratamento correto do status `204 No Content`.
- Estados de carregamento, erro e lista vazia.
- Botão de envio desabilitado durante a requisição.
- Interface responsiva para desktop e celular.

## Estrutura

```text
src/
├── components/
│   ├── FiltroPontos.jsx
│   ├── FormPonto.jsx
│   ├── Navbar.jsx
│   ├── Status.jsx
│   └── TabelaPontos.jsx
├── pages/
│   ├── CadastroPonto.jsx
│   ├── DetalhePonto.jsx
│   ├── EditarPonto.jsx
│   ├── ListaPontos.jsx
│   └── NaoEncontrado.jsx
├── services/
│   └── api.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Checklist de validação manual
1. Abrir `/pontos` e confirmar a listagem.
2. Cadastrar um ponto e confirmar que aparece na listagem.
3. Filtrar pelo nome e pela descrição.
4. Abrir o detalhe e conferir UUID e coordenadas.
5. Editar o ponto e conferir os dados atualizados.
6. Excluir o ponto e confirmar que desaparece da listagem.
7. Testar campos vazios, limites de latitude/longitude e API indisponível.
8. Acessar uma rota inexistente e conferir a página 404.

## Capturas de tela para completar antes da entrega
O enunciado solicita prints de listagem, filtro, cadastro, detalhe e edição. Após executar o projeto, salve as capturas na pasta `docs/screenshots/` e insira-as abaixo:

- `docs/screenshots/listagem.png`
- `docs/screenshots/filtro.png`
- `docs/screenshots/cadastro.png`
- `docs/screenshots/detalhe.png`
- `docs/screenshots/edicao.png`

> Os prints devem ser capturados com a aplicação real conectada à API. Não foram incluídas imagens fictícias.

## Observação sobre disponibilidade da API
A API pode demorar para responder quando o serviço estiver inativo/hibernando. A aplicação apresenta mensagens de carregamento e erro; isso não substitui o teste completo de integração antes da entrega.
