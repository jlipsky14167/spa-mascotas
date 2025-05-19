// src/components/ErrorBoundary.jsx
import React, { type ErrorInfo } from 'react'

type ErrorBoundaryProps = React.PropsWithChildren<object>;
type ErrorBoundaryState = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error) {
        // Actualiza el estado para renderizar el fallback UI
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Aquí puedes loguear el error a un servicio externo
        console.error('Error capturado por ErrorBoundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // UI de respaldo
            return (
                <div className="p-6 bg-red-100 text-red-800 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">¡Algo salió mal!</h2>
                    <p>{this.state.error?.message}</p>
                </div>
            )
        }

        // Si no hay error, se renderiza normalmente
        return this.props.children
    }
}