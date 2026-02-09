import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="brand">Product Discovery</div>
        <nav className="nav__links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}>
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
