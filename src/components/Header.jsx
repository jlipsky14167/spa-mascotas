import React from 'react'

const Header = () => (
  <header className="text-center p-4 bg-white shadow-sm">
    <h1>Gestor de Salud de Mascotas</h1>
    <nav className="d-flex justify-content-center">
      <a href="#panel" className="mx-3 text-primary text-decoration-none">Panel General</a>
      <a href="#agregarMascota" className="mx-3 text-primary text-decoration-none">Agregar Mascota</a>
      <a href="#eventos" className="mx-3 text-primary text-decoration-none">Registrar Evento</a>
      <a href="#alimentacion" className="mx-3 text-primary text-decoration-none">Compra de Concentrados</a>
    </nav>
  </header>
)

export default Header
