import React from 'react'

const RegistrarEvento = () => (
  <section id="eventos" className="mb-5 bg-white p-4 rounded shadow-sm">
    <h2>Registrar Evento Médico</h2>
    <ul className="list-unstyled">
      <li>Vacunas</li><li>Desparasitación</li><li>Citas Médicas</li><li>Resultados Médicos</li>
    </ul>
    <form>
      <div className="mb-3">
        <label htmlFor="tipoEvento" className="form-label">Tipo de Evento</label>
        <input type="text" id="tipoEvento" className="form-control" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="fechaEvento" className="form-label">Fecha</label>
        <input type="date" id="fechaEvento" className="form-control" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="comentario" className="form-label">Comentario</label>
        <textarea id="comentario" className="form-control" rows="3"></textarea>
      </div>
      <button type="submit" className="btn btn-secondary">Registrar Evento</button>
    </form>
  </section>
)

export default RegistrarEvento
