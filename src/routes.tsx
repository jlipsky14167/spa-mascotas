import { createBrowserRouter } from "react-router";

import App from "./App";
import Panel from "./components/Panel";
import MascotaListado from "./components/MascotaListado";
import MascotaDetalle from "./components/MascotaDetalle";
import RegistrarEvento from "./components/RegistrarEvento";
import CompraConcentrados from "./components/CompraConcentrados";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App, // <-- aquí usamos Component
    children: [
      { index: true, Component: Panel }, // ruta “/”
      { path: "panel", Component: Panel },
      { path: "mascotas", Component: MascotaListado },
      { path: "agregar", Component: MascotaDetalle },
      { path: "mascotas/:pet_id", Component: MascotaDetalle },
      { path: "eventos", Component: RegistrarEvento },
      { path: "compras", Component: CompraConcentrados },
      { path: "*", Component: () => <h2>404 – Página no encontrada</h2> },
    ],
  },
], {
  basename: "/spa-mascotas", // <-- aquí defines el base path
}
);
