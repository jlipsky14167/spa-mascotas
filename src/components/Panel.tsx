

const Panel = () => (
  <section id="panel" className="bg-light p-4 rounded shadow mb-4">
    <h2>Resumen de Salud</h2>
    <table className="table table-striped">
      <thead><tr><th>Mascota</th><th>Última Vacuna</th><th>Próxima Cita</th></tr></thead>
      <tbody><tr><td>Max</td><td>Rabia (10/04/2024)</td><td>01/06/2024</td></tr></tbody>
    </table>
  </section>
)

export default Panel
