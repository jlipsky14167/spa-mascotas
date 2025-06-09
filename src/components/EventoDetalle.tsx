import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Evento } from "../interfaces/evento.interface";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import type { Option } from "react-bootstrap-typeahead/types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type EventType = { event_type_id: number; title: string };
type MascotaOption = { pet_id: number; name: string };

export default function EventoRegistrar() {
  const { event_id } = useParams<{ event_id?: string }>();
  const [form, setForm] = useState({
    event_type_id: "",
    body: "",
    pet_id: "",
    status: "",
    alarm_at: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editable, setEditable] = useState(true);
  const [evento, setEvento] = useState<Evento | null>(null);

  // Tipos de evento
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  // Mascotas para el typeahead
  const [mascotas, setMascotas] = useState<MascotaOption[]>([]);
  const [mascotaSelected, setMascotaSelected] = useState<MascotaOption[]>([]);
  const [mascotasLoading, setMascotasLoading] = useState(false);

  // Cargar tipos de evento al montar
  useEffect(() => {
    fetch(`${API_URL}/event_types`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener tipos de evento");
        return res.json();
      })
      .then(data => setEventTypes(Array.isArray(data) ? data : []))
      .catch((err) => {
        setEventTypes([]);
        setError("Error al cargar tipos de evento: " + (err?.message || ""));
      });
  }, []);

  // Cargar detalle del evento si viene event_id por URL
  useEffect(() => {
    if (event_id) {
      setLoading(true);
      fetch(`${API_URL}/events/${event_id}`)
        .then(res => {
          if (!res.ok) throw new Error("Error al obtener el evento");
          return res.json();
        })
        .then(data => {
          setEvento(data && data.event_id ? data : null);
          if (data && data.event_id) {
            setForm({
              event_type_id: data.event_type_id?.toString() || "",
              body: data.body || "",
              pet_id: data.pet_id?.toString() || "",
              status: data.status || "",
              alarm_at: data.alarm_at ? data.alarm_at.slice(0, 16) : "",
            });
            // Prellenar mascota seleccionada
            if (data.pet_id && data.name) {
              setMascotaSelected([{ pet_id: data.pet_id, name: data.name }]);
            } else if (data.pet_id) {
              // Si no viene el nombre, buscarlo
              fetch(`${API_URL}/pets/${data.pet_id}`)
                .then(res => res.json())
                .then(mascota => {
                  if (mascota && mascota.pet_id && mascota.name) {
                    setMascotaSelected([{ pet_id: mascota.pet_id, name: mascota.name }]);
                  }
                });
            }
          } else {
            setError("Evento no encontrado");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Error al cargar el evento: " + (err?.message || ""));
          setLoading(false);
        });
      setEditable(true);
      setSuccessMsg(null);
    } else {
      setEvento(null);
      setForm({
        event_type_id: "",
        body: "",
        pet_id: "",
        status: "",
        alarm_at: "",
      });
      setMascotaSelected([]);
      setEditable(true);
      setSuccessMsg(null);
      setError(null);
    }
  }, [event_id]);

  // Buscar mascotas por nombre (asincrónico)
  const handleMascotaSearch = (query: string) => {
    if (!query) {
      setMascotas([]);
      return;
    }
    setMascotasLoading(true);
    fetch(`${API_URL}/pets/searchByName?search=${encodeURIComponent(query)}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al buscar mascotas");
        return res.json();
      })
      .then(data => {
        setMascotas(Array.isArray(data) ? data : []);
        setMascotasLoading(false);
      })
      .catch((err) => {
        setMascotasLoading(false);
        setError("Error al buscar mascotas: " + (err?.message || ""));
      });
  };

  const handleMascotaSelect = (selected: Option[]) => {
    // Only keep MascotaOption objects, ignore string options
    const selectedMascotas = selected.filter(
      (item): item is MascotaOption =>
        typeof item === "object" &&
        item !== null &&
        "pet_id" in item &&
        "name" in item
    );
    setMascotaSelected(selectedMascotas);
    setForm({ ...form, pet_id: selectedMascotas[0]?.pet_id?.toString() || "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const method = evento && evento.event_id ? "PUT" : "POST";
      const url = evento && evento.event_id
        ? `${API_URL}/events/${evento.event_id}`
        : `${API_URL}/events`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          event_type_id: Number(form.event_type_id),
          pet_id: Number(form.pet_id),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error en la operación");
      }
      setLoading(false);
      setSuccessMsg(evento && evento.event_id ? "Evento editado correctamente." : "Evento creado correctamente.");
      setEditable(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error en la operación");
      } else {
        setError("Error en la operación");
      }
      setLoading(false);
    }
  };

  const handleEditar = () => {
    setEditable(true);
    setSuccessMsg(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h3>{evento && evento.event_id ? "Editar Evento" : "Registrar Evento"}</h3>
      {loading && <div>Cargando evento...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-2">
        <label>Tipo de Evento</label>
        <select
          className="form-control"
          name="event_type_id"
          value={form.event_type_id}
          onChange={handleChange}
          required
          disabled={!editable}
        >
          <option value="">Seleccione...</option>
          {eventTypes.map((et) => (
            <option key={et.event_type_id} value={et.event_type_id}>
              {et.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label>Descripción</label>
        <input
          className="form-control"
          name="body"
          value={form.body}
          onChange={handleChange}
          required
          disabled={!editable}
        />
      </div>
      <div className="mb-2">
        <label>Mascota</label>
        <Typeahead
          id="typeahead-mascota"
          labelKey={option => typeof option === "string" ? option : `${option.pet_id}-${option.name}`}
          onInputChange={handleMascotaSearch}
          onChange={handleMascotaSelect}
          options={mascotas}
          selected={mascotaSelected}
          isLoading={mascotasLoading}
          placeholder="Buscar mascota por nombre..."
          disabled={!editable}
          minLength={1}
          renderMenuItemChildren={(option) => (
            <span>
              {(option as MascotaOption).pet_id}-{(option as MascotaOption).name}
            </span>
          )}
        />
      </div>
      <div className="mb-2">
        <label>Estado</label>
        <input
          className="form-control"
          name="status"
          value={form.status}
          readOnly
          disabled={true}
        />
      </div>
      <div className="mb-2">
        <label>Fecha y hora de alarma</label>
        <input
          className="form-control"
          name="alarm_at"
          value={form.alarm_at}
          onChange={handleChange}
          type="datetime-local"
          disabled={!editable}
        />
      </div>
      {successMsg && (
        <div className="alert alert-success d-flex justify-content-between align-items-center">
          <span>{successMsg}</span>
          {!editable && (
            <button
              type="button"
              className="btn btn-link btn-sm"
              onClick={handleEditar}
            >
              Editar nuevamente
            </button>
          )}
        </div>
      )}
      <div>
        <button className="btn btn-primary" type="submit" disabled={loading || !editable}>
          {evento && evento.event_id ? "Guardar cambios" : "Registrar"}
        </button>
      </div>
    </form>
  );
}
