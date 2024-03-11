import { onMounted, reactive, ref } from "vue";
import { defineStore } from "pinia";
import services from "@/services/services";

export const useNotesStore = defineStore('notes', () => {

    const notes = ref([])
    const editingNote = ref(null)

    const note = reactive({
        id: "",
        title: "",
        category: "",
        description: ""
    })

    onMounted(async () => {
       getNotes()
    })

    async function getNotes() {
        try {
            const { data } = await services.getNotesApi()
            notes.value = data
        } catch (error) {
            console.log(error);
        }
    }

    return {
        notes,
        getNotes,
        editingNote,
        note
    }
})