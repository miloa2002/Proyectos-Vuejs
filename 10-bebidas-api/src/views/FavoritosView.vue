<script setup>
    import Receta from '../components/Receta.vue';
    import { useFavoritosStore } from '../stores/favoritos';

    const favoritos = useFavoritosStore()

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })
</script>

<template>
    <h1 class="text-6xl font-extrabold">Favoritos</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
        <Receta
            v-for="receta in favoritos.favoritos"
            :receta="receta"
            :key="receta.idDrink"
        />
    </div>
</template>
