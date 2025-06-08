import React from "react";

type PanelSummaryProps = {
    title: string;
    mainValue: string | number;
    mainValueLabel?: string;
    mainValueColor?: string;
    metrics: { label: string; value: string | number }[];
    onClose?: () => void;
};

const PanelSummary: React.FC<PanelSummaryProps> = ({
    title,
    mainValue,
    mainValueLabel,
    mainValueColor = "#fff",
    metrics,
    onClose,
}) => (
    <div
        style={{
            background: "#23295a",
            borderRadius: 12,
            padding: 20,
            color: "#fff",
            minWidth: 250,
            maxWidth: 320,
            position: "relative",
            boxShadow: "0 2px 8px #0002",
            marginBottom: 24,
        }}
    >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 18, opacity: 0.85 }}>{title}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: 18,
                        cursor: "pointer",
                        opacity: 0.7,
                    }}
                    aria-label="Cerrar"
                >
                    ×
                </button>
            )}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <span style={{ fontSize: 38, fontWeight: 600, color: mainValueColor }}>
                {mainValue}
            </span>

        </div>
        {mainValueLabel && (
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 10 }}>
                {mainValueLabel}
            </div>
        )}
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 18,
                fontSize: 15,
                opacity: 0.85,
            }}
        >
            {metrics.map((m, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 500 }}>{m.value}</div>
                    <div style={{ fontSize: 13, opacity: 0.7 }}>{m.label}</div>
                </div>
            ))}
        </div>
    </div>
);

export default PanelSummary;
