import React from 'react'

const AgregarMascota = () => (
  <section id="agregarMascota" className="mb-5 bg-white p-4 rounded shadow-sm">
    <h2>Agregar Nueva Mascota</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" id="nombre" className="form-control" required autoFocus autoComplete="name"/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email de contacto</label>
        <input type="email" id="email" className="form-control" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
        <input type="date" id="fechaNacimiento" className="form-control" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo de Mascota</label>
        <select id="tipo" className="form-select" required>
          <option>Perro</option>
          <option>Gato</option>
          <option>Otro</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  </section>
)

export default AgregarMascota
