import React from 'react'
import dogImg from '../assets/images/dog.jpg'

const CompraConcentrados = () => (
  <section id="alimentacion" className="bg-white p-4 rounded shadow-sm">
    <h2>Registro de Compra de Concentrados</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="marca" className="form-label">Marca de Alimento</label>
        <input type="text" id="marca" className="form-control" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="cantidad" className="form-label">Cantidad (kg)</label>
        <input type="number" id="cantidad" className="form-control" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="fechaCompra" className="form-label">Fecha de Compra</label>
        <input type="date" id="fechaCompra" className="form-control" required/>
      </div>
      <button type="submit" className="btn btn-warning">Registrar Compra</button>
    </form>
    <figure>
      <img src={dogImg} alt="Perro tratando de entender" className="img-fluid my-3 rounded" />
      <figcaption>
            <a
              href="https://www.freepik.com/free-photo/cute-dog-with-bright-brown-eyes-staring_10758899.htm#fromView=search&page=1&position=9&uuid=092c3698-8f14-4a08-abad-279ed45997e5&query=confused+dog"
              >Image by wirestock on Freepik</a
            >
          </figcaption>
      </figure>
    <video controls className="w-100 rounded"><source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>Tu navegador no soporta videos HTML5.</video>
  </section>
)

export default CompraConcentrados
