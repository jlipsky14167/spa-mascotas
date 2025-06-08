import { useEffect, useState } from "react";

const API_NINJAS_KEY = "6SNOzoX4oDPMpGPnaO0gRg==STEVN57wTCpHm2VE"; // Reemplaza con tu API Key real
const DEFAULT_LAT = 4.6;
const DEFAULT_LON = -74;

type ForecastItem = {
    timestamp: number;
    temp: number;
    min_temp: number;
    max_temp: number;
    humidity: number;
    wind_speed: number;
    weather?: string;
};

export function ClimaPronostico() {
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        function fetchForecast(lat: number, lon: number) {
            setLoading(true);
            setError(null);
            fetch(
                `https://api.api-ninjas.com/v1/weatherforecast?lat=${lat}&lon=${lon}`,
                { headers: { "X-Api-Key": API_NINJAS_KEY } }
            )
                .then((res) => {
                    if (!res.ok) throw new Error("Error al obtener el pronóstico");
                    return res.json();
                })
                .then((data) => {
                    console.log("Pronóstico del clima:", data);
                    setForecast(data || []);
                    setLoading(false);
                })
                .catch(() => {
                    setError("No se pudo obtener el pronóstico del clima.");
                    setLoading(false);
                });
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchForecast(pos.coords.latitude, pos.coords.longitude),
                () => fetchForecast(DEFAULT_LAT, DEFAULT_LON)
            );
        } else {
            fetchForecast(DEFAULT_LAT, DEFAULT_LON);
        }
    }, []);

    return (
        <div>
            <h3>Pronóstico del Clima</h3>
            <div className="mb-2" style={{ fontSize: 13, color: "#555" }}>
                Datos obtenidos de{" "}
                <a
                    href="https://api-ninjas.com/api/weatherforecast"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    API Ninjas WeatherForecast
                </a>{" "}
                (Mashup)
            </div>
            {loading && <div>Cargando...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Temperatura (°C)</th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Humedad (%)</th>
                            <th>Viento (m/s)</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecast.map((f, idx) => (
                            <tr key={idx}>
                                <td>{new Date(f.timestamp * 1000).toLocaleString()}</td>
                                <td>{f.temp}</td>
                                <td>{f.min_temp}</td>
                                <td>{f.max_temp}</td>
                                <td>{f.humidity}</td>
                                <td>{f.wind_speed}</td>
                                <td>{f.weather || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
