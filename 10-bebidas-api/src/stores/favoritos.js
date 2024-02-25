import { ref, watch, onMounted } from "vue"
import { defineStore } from "pinia"
import { useBebidasStore } from "./bebidas"

export const useFavoritosStore = defineStore('favoritos', () => {

    const bebidas = useBebidasStore()
    const favoritos = ref([])

    watch(favoritos, () => {
        sincronizarLocal()
    }, {
        deep: true
    })

    const sincronizarLocal = () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    function existeFavorito(id) {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
    }

    const handleClickFavorito = () => {

        if(existeFavorito(bebidas.receta.idDrink)) {

        }else {
            favoritos.value.push(bebidas.receta)
        }
    }

    return {
        handleClickFavorito,
        favoritos
    }
})