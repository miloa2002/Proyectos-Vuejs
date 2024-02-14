<script setup>
    import { RouterView, RouterLink } from "vue-router"
</script>

<template>
    <header class="w-full flex justify-between items-center p-4 bg-emerald-500">
        <RouterLink :to="{name: 'home'}">
            <h1 class="text-white">CRUD - REST API, AXIOS, VUE ROUTER</h1>
        </RouterLink>

        <RouterLink 
            class="text-white bg-amber-600 rounded-md px-8 py-2 cursor-pointer hover:bg-amber-700 transition-colors"
            :to="{name: 'productos-nuevo'}">
            Agregar <br/> producto +
        </RouterLink>
    </header>

    <RouterView />
</template>