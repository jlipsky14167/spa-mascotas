import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import type { Option } from "react-bootstrap-typeahead/types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface MascotaOption { pet_id: number; name: string };

const CompraConcentrado = () => {
  const [marca, setMarca] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [petId, setPetId] = useState<string>("");
  const [mascotaSelected, setMascotaSelected] = useState<MascotaOption[]>([]);
  const [mascotas, setMascotas] = useState<MascotaOption[]>([]);
  const [mascotasLoading, setMascotasLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Buscar mascotas por nombre (asincrónico)
  const handleMascotaSearch = (query: string) => {
    if (!query) {
      setMascotas([]);
      return;
    }
    setMascotasLoading(true);
    fetch(`${API_URL}/pets/searchByName?search=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setMascotas(Array.isArray(data) ? data : []);
        setMascotasLoading(false);
      })
      .catch(() => setMascotasLoading(false));
  };

  const handleMascotaSelect = (selected: Option[]) => {
    // Filter out string options, only keep MascotaOption
    const selectedMascota = selected.filter(
      (item): item is MascotaOption => typeof item === "object" && item !== null && "pet_id" in item && "name" in item
    );
    setMascotaSelected(selectedMascota);
    setPetId(selectedMascota[0]?.pet_id?.toString() || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setError(null);
    try {
      if (!petId) throw new Error("Debe seleccionar una mascota");
      const status = "pendiente";
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type_id: 5,
          body: `Compra de ${marca} (${cantidad}kg)`,
          pet_id: Number(petId),
          status,
          alarm_at: fecha ? new Date(fecha).toISOString() : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al registrar compra");
      }
      setMsg("Compra registrada correctamente.");
      setMarca("");
      setCantidad("");
      setFecha("");
      setPetId("");
      setMascotaSelected([]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al registrar compra");
      } else {
        setError("Error al registrar compra");
      }
    }
    setLoading(false);
  };

  return (
    <section id="compras" className="p-4 rounded shadow mb-4">
      <h2>Compra Concentrados</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Mascota</label>
          <Typeahead
            id="typeahead-mascota-compra"
            labelKey={option => typeof option === "string" ? option : `${option.pet_id}-${option.name}`}
            onInputChange={handleMascotaSearch}
            onChange={handleMascotaSelect}
            options={mascotas}
            selected={mascotaSelected}
            isLoading={mascotasLoading}
            placeholder="Buscar mascota por nombre..."
            minLength={1}
            disabled={loading}
            renderMenuItemChildren={(option: Option) => {
              if (typeof option === "object" && option !== null && "pet_id" in option && "name" in option) {
                const mascota = option as MascotaOption;
                return <span>{mascota.pet_id}-{mascota.name}</span>;
              }
              return <span>{String(option)}</span>;
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input
            className="form-control"
            required
            value={marca}
            onChange={e => setMarca(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad (kg)</label>
          <input
            type="number"
            className="form-control"
            required
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            required
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            disabled={loading}
          />
        </div>
        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-warning" disabled={loading}>
          Registrar
        </button>
      </form>
    </section>
  );
};

export default CompraConcentrado
