import { api } from "@/lib/api";

export default {
    addNoteApi(data) {
        return api.post("/notes", data)
    },

    getNotesApi() {
        return api.get("/notes")
    },

    deleteNoteApi(id) {
        return api.delete("/notes/" + id)
    },

    updatteNoteApi(id, note) {
        return api.patch("/notes/" + id, note)
    }
}