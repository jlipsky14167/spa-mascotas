import { useEffect, useState } from "react";
import PanelSummary from "./PanelSummary";

const API_NINJAS_KEY = "6SNOzoX4oDPMpGPnaO0gRg==STEVN57wTCpHm2VE"; // Reemplaza con tu API Key real

interface WeatherData {
    temp?: number;
    feels_like?: number;
    humidity?: number;
    wind_speed?: number;
    [key: string]: unknown;
}

export const Clima = () => {

    // Estado para el clima
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [weatherLoading, setWeatherLoading] = useState(true);

    useEffect(() => {
        // Intenta obtener la ubicación del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    fetchWeather(pos.coords.latitude, pos.coords.longitude);
                },
                () => {
                    // Si el usuario no da permiso, usa Bogotá por defecto
                    fetchWeather(4.6, -74);
                }
            );
        } else {
            fetchWeather(4.6, -74);
        }

        function fetchWeather(lat: number, lon: number) {
            setWeatherLoading(true);
            fetch(`https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`, {
                headers: { "X-Api-Key": API_NINJAS_KEY }
            })
                .then(res => res.json())
                .then(data => {
                    setWeather(data);
                    setWeatherLoading(false);
                })
                .catch(() => setWeatherLoading(false));
        }
    }, []);

    return (<PanelSummary
        title="Clima actual"
        mainValue={
            weatherLoading
                ? "Cargando..."
                : weather && weather.temp !== undefined
                    ? `${weather.temp}°C`
                    : "Sin datos"
        }
        metrics={
            weather && !weatherLoading
                ? [
                    { label: "Sensación", value: weather.feels_like !== undefined ? `${weather.feels_like}°C` : "-" },
                    { label: "Humedad", value: weather.humidity !== undefined ? `${weather.humidity}%` : "-" },
                    { label: "Viento", value: weather.wind_speed !== undefined ? `${weather.wind_speed} m/s` : "-" }
                ]
                : [
                    { label: "Sensación", value: "-" },
                    { label: "Humedad", value: "-" },
                    { label: "Viento", value: "-" }
                ]
        }
    />
    );
}