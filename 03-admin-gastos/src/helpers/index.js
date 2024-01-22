export const formatearCantidad = (cantidad) => {
    return Number(cantidad).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const generarId = () => {
    const random = Math.random().toString(36).substring(2) 
    const fecha = Date.now().toString(36)
    return random + fecha
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: "numeric",
        mont: "long",
        day: "2-digit"
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}