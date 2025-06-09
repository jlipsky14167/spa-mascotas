import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

const menuItems = [

    { path: '/mascotas', label: 'Mascotas' },
    { path: 'agregar_mascota', label: 'Agregar Mascota' },
    { path: '/eventos', label: 'Eventos' },
    { path: 'registrar_evento', label: 'Registrar Evento' },
    { path: '/compras', label: 'Compra de Concentrados' },
    { path: '/pronosticoDelClima', label: 'Pronostico' },
];

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div style={{ display: 'flex' }}>
            <aside className="sidebar">
                <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 32 }}>MASCOT <span style={{ color: '#3b7ddd' }}>APP</span></div>
                <nav>
                    <NavLink to="/" className="nav-link">Inicio</NavLink>
                    {menuItems.map((item, idx) => (
                        <div key={idx} className="nav-item text-nowrap">
                            <NavLink to={item.path} className="nav-link">{item.label}</NavLink>
                        </div>
                    ))}
                </nav>
            </aside>
            <main className="main-content" style={{ flex: 1 }}>
                {children}
            </main>
        </div>
    );
}