import { useEffect, useState } from "react";
import PanelSummary from "./PanelSummary";

export default function PanelDogImage() {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(data => {
                setImgUrl(data?.message || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <PanelSummary
            showMetrics={false}
            title="Foto aleatoria de perro"
            mainValue={
                loading ? (
                    "Cargando..."
                ) : imgUrl ? (
                    <div
                        style={{
                            width: "100%",
                            height: "120px",
                            minHeight: 100,
                            borderRadius: 8,
                            background: `url(${imgUrl}) center center / cover no-repeat`,
                            backgroundColor: "#333",
                            display: "block",
                            margin: "0 auto"
                        }}
                        aria-label="Perro aleatorio"
                    />
                ) : (
                    "No disponible"
                )
            }
            metrics={[]}
        />
    );
}
