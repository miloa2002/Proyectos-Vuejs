import api from "../lib/axios";

export default {
    obtenerCategorias() {
        return api('/list.php?c=list')
    },
    buscarReecetas({categoria, nombre}) {
        return api(`/filter.php?c=${categoria}&i=${nombre}`)
    },
    buscarReceta(id) {
        return api(`/lookup.php?i=${id}`)
    }
}