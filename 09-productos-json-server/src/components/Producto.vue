<script setup>
import { RouterLink } from "vue-router"

defineEmits(["eliminar-producto"])

defineProps({
    producto: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <tr>
        <td class="border border-gray-300 px-4 py-2">{{ producto.nombre }}</td>
        <td class="border border-gray-300 px-4 py-2">${{ producto.precio }}</td>
        <td class="border border-gray-300 px-4 py-2 flex">
            <RouterLink :to="{name: 'productos-nuevo-id', params: {id: producto.id}}">
                <button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mr-2">Editar</button>
            </RouterLink>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="$emit('eliminar-producto', producto.id)">Eliminar</button>
        </td>
    </tr>
</template>