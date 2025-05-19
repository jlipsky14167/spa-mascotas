
const AgregarMascota = () => (
  <section id="agregar" className="p-4 rounded shadow mb-4">
    <h2>Agregar Mascota</h2>
    <form>
      <div className="mb-3"><label className="form-label">Nombre</label><input type="text" className="form-control" required autoFocus autoComplete="name" /></div>
      <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" required /></div>
      <div className="mb-3"><label className="form-label">Fecha Nac</label><input type="date" className="form-control" required /></div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  </section>
)

export default AgregarMascota
