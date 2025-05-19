import { addYears } from "date-fns";

function obtenerListaMascotas() {
  return [
    { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Labrador', edad: 5 },
    { id: 2, nombre: 'Luna', especie: 'Gato', raza: 'Siamés', edad: 3 },
    { id: 3, nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog', edad: 4 },
    { id: 4, nombre: 'Mia', especie: 'Gato', raza: 'Persa', edad: 2 },
    { id: 5, nombre: 'Toby', especie: 'Perro', raza: 'Beagle', edad: 6 },
    { id: 6, nombre: 'Nina', especie: 'Gato', raza: 'Bengalí', edad: 1 },
    { id: 7, nombre: 'Coco', especie: 'Perro', raza: 'Poodle', edad: 3 },
    { id: 8, nombre: 'Bella', especie: 'Gato', raza: 'Sphynx', edad: 4 },
    { id: 9, nombre: 'Duke', especie: 'Perro', raza: 'Rottweiler', edad: 7 },
  ]
}

const mascotas = obtenerListaMascotas();

const listaMascotas = mascotas.map(mascota => {
  const nuevaMascota = { ...mascota, cachorro: '' };
  nuevaMascota.cachorro = mascota.edad < 2 ? 'Sí' : 'No';
  return nuevaMascota
}).filter(mascota => mascota.cachorro === 'Sí');


const mediaEdad = mascotas.reduce((suma, mascota) => suma + mascota.edad, 0) / mascotas.length;

const Panel = () => (
  <section id="panel" className="p-4 rounded shadow mb-4">
    <h2>Resumen de Salud</h2>
    <table className="table table-striped">
      <thead><tr><th>Mascota</th><th>Última Vacuna</th><th>Próxima Cita</th></tr></thead>
      <tbody>
        {mascotas.map((item, idx) => (
          <tr key={idx}><td>{item.nombre}</td><td>Rabia ({new Date().toDateString()})</td><td>{addYears(new Date(), 1).toDateString()}</td></tr>
        ))}

      </tbody>
    </table>

    <h3>Resumen de Mascotas</h3>
    <p>Total de Mascotas: {mascotas.length}</p>
    <p>Media de Edad: {mediaEdad.toFixed(2)} años</p>
    <p>Porcentaje de Cachorros: {((listaMascotas.length / mascotas.length) * 100).toFixed(2)}%</p>
    <p>Lista de Cachorros:</p>
    <ul>
      {listaMascotas.map((mascota, idx) => (
        <li key={idx}>{mascota.nombre} ({mascota.especie}, {mascota.raza}, {mascota.edad} años)</li>
      ))}
    </ul>
  </section>
)

export default Panel
