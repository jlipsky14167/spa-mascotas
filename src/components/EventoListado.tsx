import { useEffect, useState } from "react";
import type { Evento } from "../interfaces/evento.interface";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PAGE_SIZE = 10;

export default function EventoListado() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/events?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`)
            .then(res => res.json())
            .then(data => {
                setEventos(Array.isArray(data.rows) ? data.rows : []);
                setTotal(data.total || 0);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [page]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div>
            <h3>Listado de Eventos</h3>
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Mascota</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Alarma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.map(ev => (
                                <tr key={ev.event_id}>
                                    <td>{ev.event_id}</td>
                                    <td>{ev.pet_id}</td>
                                    <td>{ev.event_type_id}</td>
                                    <td>{ev.body}</td>
                                    <td>{ev.status}</td>
                                    <td>{ev.created_at ? new Date(ev.created_at).toLocaleString() : ""}</td>
                                    <td>{ev.alarm_at ? new Date(ev.alarm_at).toLocaleString() : ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center">
                        <button
                            className="btn btn-secondary"
                            disabled={page === 0}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                        >
                            Anterior
                        </button>
                        <span>
                            Página {page + 1} de {totalPages || 1}
                        </span>
                        <button
                            className="btn btn-secondary"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
