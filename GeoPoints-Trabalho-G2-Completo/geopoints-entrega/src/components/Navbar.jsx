import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="container nav-content">
        <Link to="/pontos" className="brand" aria-label="GeoPoints - página inicial">
          <span className="brand-mark">G</span>
          <span>Geo<span className="brand-light">Points</span><small>ATITUS EDUCAÇÃO</small></span>
        </Link>
        <nav className="nav-links" aria-label="Navegação principal">
          <NavLink to="/pontos" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pontos</NavLink>
          <NavLink to="/pontos/novo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Cadastrar ponto</NavLink>
        </nav>
      </div>
    </header>
  )
}
