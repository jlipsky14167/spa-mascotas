import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import type { Option } from "react-bootstrap-typeahead/types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY;

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
  const [convAmount, setConvAmount] = useState("");
  const [convUnit, setConvUnit] = useState("pound");
  interface ConvResult {
    amount: number;
    unit: string;
    conversions: Record<string, number>;
  }
  const [convResult, setConvResult] = useState<ConvResult | null>(null);
  const [convLoading, setConvLoading] = useState(false);
  const [convError, setConvError] = useState<string | null>(null);

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

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setConvLoading(true);
    setConvResult(null);
    setConvError(null);
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/unitconversion?amount=${encodeURIComponent(
          convAmount
        )}&unit=${encodeURIComponent(convUnit)}`,
        {
          headers: { "X-Api-Key": API_NINJAS_KEY }
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error en la conversión");
      }
      const data = await res.json();
      setConvResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setConvError(err.message || "Error en la conversión");
      } else {
        setConvError("Error en la conversión");
      }
    }
    setConvLoading(false);
  };

  return (
    <div>
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
      <section id="conversor" className="p-4 rounded shadow mb-4">
        <h2>Conversor de Unidades (Mashup API Ninjas)</h2>
        <form className="row g-2 align-items-end" onSubmit={handleConvert}>
          <div className="col-auto">
            <label className="form-label">Cantidad</label>
            <input
              className="form-control"
              type="number"
              value={convAmount}
              onChange={e => setConvAmount(e.target.value)}
              required
              min={0}
              step="any"
              disabled={convLoading}
            />
          </div>
          <div className="col-auto">
            <label className="form-label">Unidad</label>
            <select
              className="form-select"
              value={convUnit}
              onChange={e => setConvUnit(e.target.value)}
              disabled={convLoading}
            >
              <option value="pound">Libra (pound)</option>
              <option value="kilogram">Kilogramo (kg)</option>
              <option value="ounce">Onza (ounce)</option>
              <option value="gram">Gramo (gram)</option>
            </select>
          </div>
          <div className="col-auto">
            <button className="btn btn-info" type="submit" disabled={convLoading}>
              Convertir
            </button>
          </div>
        </form>
        <div className="mt-2" style={{ fontSize: 13, color: "#555" }}>
          Datos obtenidos de <a href="https://api-ninjas.com/api/unitconversion" target="_blank" rel="noopener noreferrer">API Ninjas UnitConversion</a> (Mashup)
        </div>
        {convLoading && <div>Cargando conversión...</div>}
        {convError && <div className="alert alert-danger">{convError}</div>}
        {convResult && (
          <div className="alert alert-success mt-2">
            <div>
              <strong>{convResult.amount} {convResult.unit}</strong> equivale a:
            </div>
            <ul className="mb-0">
              {Object.entries(convResult.conversions || {}).map(([unit, value]) => (
                <li key={unit}>
                  {String(value)} {unit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default CompraConcentrado
