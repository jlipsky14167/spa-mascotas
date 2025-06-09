import { createBrowserRouter } from "react-router";

import App from "./App";
import Panel from "./components/Panel";
import MascotaListado from "./components/MascotaListado";
import MascotaDetalle from "./components/MascotaDetalle";
import EventoDetalle from "./components/EventoDetalle";
import CompraConcentrado from "./components/CompraConcentrado";
import EventoListado from "./components/EventoListado";
import { ClimaPronostico } from "./components/ClimaPronostico";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App, // <-- aquí usamos Component
    children: [
      { index: true, Component: Panel }, // ruta “/”
      { path: "panel", Component: Panel },
      { path: "mascotas", Component: MascotaListado },
      { path: "mascotas/:pet_id", Component: MascotaDetalle },
      { path: "agregar_mascota", Component: MascotaDetalle },
      { path: "eventos", Component: EventoListado },
      { path: "eventos/:event_id", Component: EventoDetalle },
      { path: "registrar_evento", Component: EventoDetalle },
      { path: "compras", Component: CompraConcentrado },
      { path: "pronosticoDelClima", Component: ClimaPronostico },
      { path: "*", Component: () => <h2>404 – Página no encontrada</h2> },
    ],
  },
], {
  basename: "/spa-mascotas", // <-- aquí defines el base path
}
);