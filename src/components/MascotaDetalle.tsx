import { useState, useEffect } from "react";
import type { Mascota } from "../interfaces/mascota.interface";
import { useParams } from "react-router";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type UserOption = { user_id: number; username: string };
type BreedOption = { breed_id: number; name_es: string };

export default function MascotaDetalle() {
  const [form, setForm] = useState({
    name: "",
    main_owner_id: "",
    vet_id: "",
    breed_id: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editable, setEditable] = useState(true);
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [mainOwnerSelected, setMainOwnerSelected] = useState<UserOption[]>([]);
  const [vetSelected, setVetSelected] = useState<UserOption[]>([]);
  const [breedSelected, setBreedSelected] = useState<BreedOption[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [breeds, setBreeds] = useState<BreedOption[]>([]);
  const [breedsLoading, setBreedsLoading] = useState(false);

  const { pet_id } = useParams<{ pet_id?: string }>();

  // Cargar usuarios y razas para Typeahead
  useEffect(() => {
    setUsersLoading(true);
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
        setUsersLoading(false);
      })
      .catch(() => setUsersLoading(false));
    setBreedsLoading(true);
    fetch(`${API_URL}/breeds`)
      .then(res => res.json())
      .then(data => {
        setBreeds(Array.isArray(data) ? data : []);
        setBreedsLoading(false);
      })
      .catch(() => setBreedsLoading(false));
  }, []);

  useEffect(() => {
    if (pet_id) {
      setLoading(true)
      fetch(`${API_URL}/pets/${pet_id}`)
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          setMascota(data);
          if (!data || !data.pet_id) {
            setError("Mascota no encontrada");
            return;
          }
          // Ajustar birthdate a formato YYYY-MM-DD si viene con tiempo
          let birthdate = data.birthdate || "";
          if (birthdate && birthdate.length > 10) {
            birthdate = birthdate.slice(0, 10);
          }
          setForm({
            name: data.name || "",
            main_owner_id: data.main_owner_id?.toString() || "",
            vet_id: data.vet_id?.toString() || "",
            breed_id: data.breed_id?.toString() || "",
            birthdate,
          });
          // Prellenar selects
          setMainOwnerSelected(
            data.main_owner_id && users.length
              ? users.filter(u => u.user_id === data.main_owner_id)
              : []
          );
          setVetSelected(
            data.vet_id && users.length
              ? users.filter(u => u.user_id === data.vet_id)
              : []
          );
          setBreedSelected(
            data.breed_id && breeds.length
              ? breeds.filter(b => b.breed_id === data.breed_id)
              : []
          );
        })
        .catch(() => {
          setLoading(false);
          setError("Error al cargar los datos de la mascota");
        });

      setEditable(true);
    } else {
      setForm({
        name: "",
        main_owner_id: "",
        vet_id: "",
        breed_id: "",
        birthdate: "",
      });
      setMainOwnerSelected([]);
      setVetSelected([]);
      setBreedSelected([]);
      setEditable(true);
    }
    setSuccessMsg(null);
    setError(null);
    // eslint-disable-next-line
  }, [pet_id, users, breeds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const method = mascota ? "PUT" : "POST";
      const url = mascota
        ? `${API_URL}/pets/${mascota.pet_id}`
        : `${API_URL}/pets`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          main_owner_id: Number(form.main_owner_id),
          vet_id: Number(form.vet_id),
          breed_id: Number(form.breed_id),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error en la operación");
      }
      setLoading(false);
      setSuccessMsg(mascota ? "Mascota editada correctamente." : "Mascota agregada correctamente.");
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
      <h3>{mascota ? "Editar Mascota" : "Agregar Mascota"}</h3>
      <div className="mb-2">
        <label>Nombre</label>
        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={!editable}
        />
      </div>
      <div className="mb-2">
        <label>ID Dueño</label>
        <Typeahead
          id="typeahead-main-owner"
          labelKey={option => typeof option === "string" ? option : `${option.user_id}-${option.username}`}
          options={users}
          selected={mainOwnerSelected}
          onChange={selected => {
            const selectedUser = selected as UserOption[];
            setMainOwnerSelected(selectedUser);
            setForm({ ...form, main_owner_id: selectedUser[0]?.user_id?.toString() || "" });
          }}
          isLoading={usersLoading}
          placeholder="Buscar dueño..."
          disabled={!editable}
          minLength={0}
          renderMenuItemChildren={(option) =>
            typeof option === "string" ? (
              <span>{option}</span>
            ) : (
              <span>{option.user_id}-{option.username}</span>
            )
          }
        />
      </div>
      <div className="mb-2">
        <label>ID Veterinario</label>
        <Typeahead
          id="typeahead-vet"
          labelKey={option => typeof option === "string" ? option : `${option.user_id}-${option.username}`}
          options={users}
          selected={vetSelected}
          onChange={selected => {
            const selectedUser = selected as UserOption[];
            setVetSelected(selectedUser);
            setForm({ ...form, vet_id: selectedUser[0]?.user_id?.toString() || "" });
          }}
          isLoading={usersLoading}
          placeholder="Buscar veterinario..."
          disabled={!editable}
          minLength={0}
          renderMenuItemChildren={(option) =>
            typeof option === "string" ? (
              <span>{option}</span>
            ) : (
              <span>{option.user_id}-{option.username}</span>
            )
          }
        />
      </div>
      <div className="mb-2">
        <label>ID Raza</label>
        <Typeahead
          id="typeahead-breed"
          labelKey={option => typeof option === "string" ? option : `${option.breed_id}-${option.name_es}`}
          options={breeds}
          selected={breedSelected}
          onChange={selected => {
            const selectedBreed = selected as BreedOption[];
            setBreedSelected(selectedBreed);
            setForm({ ...form, breed_id: selectedBreed[0]?.breed_id?.toString() || "" });
          }}
          isLoading={breedsLoading}
          placeholder="Buscar raza..."
          disabled={!editable}
          minLength={0}
          renderMenuItemChildren={(option) =>
            typeof option === "string" ? (
              <span>{option}</span>
            ) : (
              <span>{option.breed_id}-{option.name_es}</span>
            )
          }
        />
      </div>
      <div className="mb-2">
        <label>Fecha de nacimiento</label>
        <input
          className="form-control"
          name="birthdate"
          value={form.birthdate}
          onChange={handleChange}
          required
          type="date"
          disabled={!editable}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
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
          {mascota ? "Guardar cambios" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
