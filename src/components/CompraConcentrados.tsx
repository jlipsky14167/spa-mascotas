
const CompraConcentrados = () => (
  <section id="compras" className="p-4 rounded shadow mb-4">
    <h2>Compra Concentrados</h2>
    <form>
      <div className="mb-3"><label className="form-label">Marca</label><input className="form-control" required /></div>
      <div className="mb-3"><label className="form-label">Cantidad (kg)</label><input type="number" className="form-control" required /></div>
      <div className="mb-3"><label className="form-label">Fecha</label><input type="date" className="form-control" required /></div>
      <button className="btn btn-warning">Registrar</button>
    </form>
  </section>
)

export default CompraConcentrados
