import { api } from "../lib/axios";

export default {
    crearProductoApi(data) {
        return api.post("/productos", data);
    },
    obtenerProductosApi() {
        return api.get("/productos");
    },
    eliminarProductoApi(id) {
        return api.delete("/productos/" + id);
    },
    obtenerProductoApi(id) {
        return api.get("/productos/" + id);
    },
    actualizarProductoApi(id, data) {
        return api.patch("/productos/" + id, data)
    }
}