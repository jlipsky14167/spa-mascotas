import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import PanelSummary from "./PanelSummary";
import { Clima } from "./Clima";
import type { Cachorro } from "../interfaces/cachorro.interface";

interface Evento {
  event_type_name: string;
  pet_name: string;
  pet_id: number | string;
  event_type_id: number | string;
  body: string;
  alarm_at?: string;
  status: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Panel = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);



  // Mascotas resumen
  const [resumen, setResumen] = useState<{
    total: number;
    mediaEdad: number;
    porcentajeCachorros: number;
    listaCachorros: Cachorro[];
  } | null>(null);



  useEffect(() => {
    fetch(`${API_URL}/upcoming-events`)
      .then(res => res.json())
      .then(data => {
        setEventos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/pets/summary`)
      .then(res => res.json())
      .then(data => setResumen(data))
      .catch(() => setResumen(null));
  }, []);


  return (


    <section id="panel" className="p-4 rounded shadow mb-4">
      <Container fluid>
        <Row>
          {resumen && (
            <Col md={3}>
              <PanelSummary
                title="Mascotas registradas"
                mainValue={resumen.total}
                metrics={[
                  { label: "Media Edad", value: resumen.mediaEdad?.toFixed(2) + " años" },
                  { label: "Cachorros", value: resumen.listaCachorros.length },
                  { label: "% Cachorros", value: resumen.porcentajeCachorros?.toFixed(1) + "%" },
                ]}
              />
            </Col>
          )}

          {/* Panel del clima */}
          <Col md={3}><Clima /></Col>
        </Row>
      </Container>

      <h2>Próximos eventos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mascota (ID)</th>
            <th>Tipo de Evento</th>
            <th>Descripción</th>
            <th>Fecha programada</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>Cargando...</td>
            </tr>
          ) : eventos.length === 0 ? (
            <tr>
              <td colSpan={5}>No hay eventos próximos</td>
            </tr>
          ) : (
            eventos.map((evento, idx) => (
              <tr key={idx}>
                <td>{evento.pet_id}) {evento.pet_name}</td>
                <td>{evento.event_type_id}) {evento.event_type_name}</td>
                <td>{evento.body}</td>
                <td>{evento.alarm_at ? new Date(evento.alarm_at).toLocaleString() : ""}</td>
                <td>{evento.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Mapa Universidad EAN */}
      <div className="mt-4" style={{ width: "100%", height: 350 }}>
        <h3>Ubicación: Universidad EAN</h3>
        <iframe
          title="Mapa Universidad EAN"
          width="100%"
          height="320"
          style={{ border: 0, borderRadius: 8 }}
          src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0652,4.6564,-74.0592,4.6604&layer=mapnik&marker=4.6584,-74.0622"
          allowFullScreen
        ></iframe>
        <div>
          <a
            href="https://www.openstreetmap.org/?mlat=4.6584&mlon=-74.0622#map=18/4.6584/-74.0622"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver mapa más grande
          </a>
        </div>
      </div>

    </section>
  );
};

export default Panel
