import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "./styles/App.scss";
import './styles/light-blue.scss';

import { router } from "./routes";
import ErrorBoundary from './components/ErrorBoundary';

const root = document.getElementById("root");
if (!root) {
  throw new Error("No se encontró el elemento raíz");
}

ReactDOM.createRoot(root).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);