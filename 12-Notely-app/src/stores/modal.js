import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', () => {

    const modal = ref(false)
    const error = ref("")

    function showModal() {
        modal.value = true
    }

    function closewModal() {
        modal.value = false
    }

    return {
        modal,
        error,
        showModal,
        closewModal
    }
})