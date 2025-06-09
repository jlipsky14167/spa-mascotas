import { useEffect, useState } from "react";
import type { Mascota } from "../interfaces/mascota.interface";
import { NavLink } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ListarMascotas() {
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/pets`)
            .then(res => res.json())
            .then(data => {
                setMascotas(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div>
            <h3>Lista de Mascotas</h3>
            {loading ? (
                <div>Cargando...</div>
            ) : mascotas.length === 0 ? (
                <div>No hay mascotas registradas.</div>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Dueño</th>
                            <th>Veterinario</th>
                            <th>Raza</th>
                            <th>Fecha Nacimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.map((m) => (
                            <tr key={m.pet_id}>
                                <td>{m.pet_id}</td>
                                <td>{m.name}</td>
                                <td>{m.main_owner_id}) {m.main_owner_name}</td>
                                <td>{m.vet_id}) {m.vet_name}</td>
                                <td>{m.breed_id}) {m.breed_name} </td>
                                <td>{m.birthdate}</td>
                                <td>
                                    {m.pet_id && (
                                        <NavLink to={`/mascotas/${m.pet_id}`} className="btn btn-primary btn-sm">Editar</NavLink>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
