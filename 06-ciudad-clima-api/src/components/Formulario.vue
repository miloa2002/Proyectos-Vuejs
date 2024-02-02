<script setup>
import { reactive, ref } from "vue"
import Alerta from "./Alerta.vue"

const busqueda = reactive({
    ciudad: "",
    pais: ""
})

const errror = ref("")

const emit = defineEmits(['obtener-clima'])

const paises = [
    { codigo: 'US', nombre: 'Estados Unidos' },
    { codigo: 'MX', nombre: 'México' },
    { codigo: 'AR', nombre: 'Argentina' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'CR', nombre: 'Costa Rica' },
    { codigo: 'ES', nombre: 'España' },
    { codigo: 'PE', nombre: 'Perú' }
]

const consultarClima = () => {
    if(Object.values(busqueda).includes("")) {
        errror.value = "Todos los campos son obligatorios"
        return
    }

    errror.value = ""
    emit('obtener-clima', busqueda)
}

</script>

<template>
    <form
        class="formulario"     
        @submit.prevent="consultarClima"   
    >
        <Alerta v-if="errror">{{ errror }}</Alerta>
        <div class="campo">
            <label for="ciudad">Ciudad</label>
            <input 
                type="text"
                id="ciudad"
                placeholder="Ciudad"
                v-model="busqueda.ciudad"
            >
        </div>

        <div class="campo">
            <label for="pais">País</label>
            <select 
                id="pais"
                v-model="busqueda.pais"
            >
                <option value="">-- Seleccione un país --</option>
                <option v-for="pais in paises" :value="pais.codigo">{{ pais.nombre }}</option>
            </select>
        </div>

        <input type="submit" value="Consultar clima">
    </form>
</template>