<script setup>
    import Formulario from './components/Formulario.vue';
    import Clima from './components/Clima.vue';
    import UseClima from './composables/UseClima';

    const { obtenerClima, clima, mostrarClima } = UseClima()

</script>

<template>
    <h1 class="titulo">Buscador de clima</h1>

    <div class="contenedor buscador-clima">
        <Formulario 
            @obtener-clima="obtenerClima"
        />
        <Clima 
            v-if="mostrarClima"
            :clima="clima"
        />
    </div>
</template>
