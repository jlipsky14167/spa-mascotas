import { NavLink } from "react-router";


const menuItems = [
  { path: '/panel', label: 'Panel' },
  { path: '/agregar', label: 'Agregar Mascota' },
  { path: '/eventos', label: 'Registrar Evento' },
  { path: '/compras', label: 'Compra de Concentrados' },
];

const Header = () => (
  <header className="navbar navbar-expand-lg shadow p-4 sticky-top">
    <div className="container-fluid">
      <NavLink to="/" className="navbar-brand">Gestor de Salud de Mascotas</NavLink>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <nav className="navbar-nav">
        {menuItems.map((item, idx) => (
          <div key={idx} className="nav-item text-nowrap">
            <NavLink to={item.path} className="nav-link">{item.label}</NavLink>
          </div>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
