import React from "react";
import type { Cachorro } from "../interfaces/cachorro.interface";

type ListadoCachorrosProps = {
    listaCachorros: Cachorro[]
};

export const ListadoCachorros: React.FC<ListadoCachorrosProps> = ({
    listaCachorros
}) => (

    listaCachorros && (
        <div id="listaCachorrosmascotas-resumen" className="mt-4">
            <h3>Lista de Cachorros</h3>
            <ul>
                {listaCachorros.map((mascota: Cachorro, idx: number) => (
                    <li key={idx}>
                        {mascota.name} (ID: {mascota.pet_id}, Nacido: {mascota.birthdate})
                    </li>
                ))}
            </ul>
        </div>
    )
)