import { Outlet, ScrollRestoration } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Header />
          <main className="container my-5">
            <Outlet />   {/* renderiza la ruta hija */}
            <ScrollRestoration /> {/* Administra la posición de desplazamiento para las transiciones del lado del cliente */}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

