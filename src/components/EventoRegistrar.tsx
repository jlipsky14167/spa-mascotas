
const EventoRegistrar = () => (
  <section id="eventos" className="p-4 rounded shadow mb-4">
    <h2>Registrar Evento</h2>
    <form>
      <div className="mb-3"><label className="form-label">Tipo Evento</label><input className="form-control" required /></div>
      <div className="mb-3"><label className="form-label">Fecha</label><input type="date" className="form-control" required /></div>
      <div className="mb-3"><label className="form-label">Comentario</label><textarea className="form-control" /></div>
      <button type="submit" className="btn btn-secondary">Registrar</button>
    </form>
  </section>
)

export default EventoRegistrar
