import { Outlet, ScrollRestoration } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./Layout";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <Layout>
      <Header />
      <Container fluid className="main-container">
        <Row>
          <Outlet />   {/* renderiza la ruta hija */}
          <ScrollRestoration /> {/* Administra la posición de desplazamiento para las transiciones del lado del cliente */}
        </Row>
      </Container>
      <Footer />
    </Layout>
  );
}

export default App;

