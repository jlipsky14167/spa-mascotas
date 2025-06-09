import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { useState } from 'react';

const menuItems = [
    { path: '/mascotas', label: 'Mascotas' },
    { path: 'agregar_mascota', label: 'Agregar Mascota' },
    { path: '/eventos', label: 'Eventos' },
    { path: 'registrar_evento', label: 'Registrar Evento' },
    { path: '/compras', label: 'Compra de Concentrados' },
    { path: '/pronosticoDelClima', label: 'Pronostico' },
];

export default function Layout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div style={{ display: 'flex' }}>
            {/* Botón para abrir/cerrar el menú en pantallas pequeñas */}
            <button
                className="btn btn-primary d-md-none"
                style={{
                    position: "fixed",
                    top: 16,
                    right: 16,
                    zIndex: 1100,
                    borderRadius: 8,
                    padding: "6px 14px"
                }}
                onClick={() => setSidebarOpen(o => !o)}
                aria-label="Abrir menú"
            >
                ☰
            </button>
            <aside
                className={`sidebar ${sidebarOpen ? "open" : ""}`}
                style={{
                    minWidth: 220,
                    maxWidth: 260,
                    padding: 24,
                    transition: "left 0.2s",
                    left: sidebarOpen ? 0 : -300,
                    top: 0,
                    bottom: 0,
                    position: "fixed",
                    zIndex: 1050,
                    height: "100vh",
                    boxShadow: "2px 0 8px #0001",
                    display: "flex",
                    flexDirection: "column",
                    // Ocultar en md+ si no está abierto, mostrar siempre en md+
                    ...(window.innerWidth >= 768
                        ? { position: "relative", left: 0, height: "auto", boxShadow: "none" }
                        : {})
                }}
            >
                <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 32 }}>
                    MASCOT <span style={{ color: '#3b7ddd' }}>APP</span>
                </div>
                <nav>
                    <NavLink to="/" className="nav-link">Inicio</NavLink>
                    {menuItems.map((item, idx) => (
                        <div key={idx} className="nav-item text-nowrap">
                            <NavLink to={item.path} className="nav-link">{item.label}</NavLink>
                        </div>
                    ))}
                </nav>
                {/* Botón para cerrar menú en móvil */}
                <button
                    className="btn btn-link d-md-none mt-4"
                    onClick={() => setSidebarOpen(false)}
                    style={{ color: "#3b7ddd" }}
                >
                    Cerrar menú
                </button>
            </aside>
            <main
                className="main-content"
                style={{
                    flex: 1,
                    marginLeft: window.innerWidth >= 768 ? 260 : (sidebarOpen ? 220 : 0),
                    transition: "margin-left 0.2s"
                }}
                onClick={() => {
                    // Cierra el menú si se hace click fuera en móvil
                    if (sidebarOpen && window.innerWidth < 768) setSidebarOpen(false);
                }}
            >
                {children}
            </main>
        </div>
    );
}