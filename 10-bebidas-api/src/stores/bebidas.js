import { ref, reactive, onMounted } from "vue"
import { defineStore } from "pinia";
import apiService from "../services/apiService";
import { useModalStore } from "./modal";

export const useBebidasStore = defineStore('bebidas', () => {

    const modal = useModalStore()
    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })
    const recetas = ref([])
    const receta = ref({})

    onMounted(async function() {
        const { data: { drinks } } = await apiService.obtenerCategorias()

        categorias.value = drinks
    })

    async function obtenerRecetas() {
        const {data: {drinks}} = await apiService.buscarReecetas(busqueda)
        recetas.value = drinks
    }

    async function seleccionarBebida(id) {
        const { data: { drinks } } = await apiService.buscarReceta(id)
        receta.value = drinks[0]

        modal.handleClickModal()
    }

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
        receta
    }
})