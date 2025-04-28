import React from 'react'

const Panel = () => (
  <section id="panel" className="mb-5 bg-white p-4 rounded shadow-sm">
    <h2>Resumen de Salud</h2>
    <table className="table table-hover">
      <thead>
        <tr><th>Mascota</th><th>Última Vacuna</th><th>Próxima Cita</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Max</td>
          <td>Rabia (10/04/2024)</td>
          <td>Chequeo anual (01/06/2024)</td>
        </tr>
      </tbody>
    </table>
    <audio controls className="my-3">
      <source src="https://cdn.freesound.org/previews/800/800938_12880153-lq.ogg" type="audio/ogg"/>
      Tu navegador no soporta audio HTML5.
    </audio>
  </section>
)

export default Panel
