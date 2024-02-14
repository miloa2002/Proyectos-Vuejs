<script setup>
import { ref, onMounted } from "vue";
import Producto from '../components/Producto.vue';
import ProductosServices from "../services/ProductosServices";

defineProps({
    titulo: {
        type: String,
        required: true
    }
})

const productos = ref([])


onMounted(()=> {
    try {
        ProductosServices.obtenerProductosApi()
            .then(data => productos.value = data.data)
    } catch (error) {
        console.log(error);
    }
})

const eliminarProducto = async(id) => {
    try {
        await ProductosServices.eliminarProductoApi(id)
        productos.value = productos.value.filter(producto => producto.id !== id)
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div>
        <h2 class="font-semibold mt-12 text-gray-600 text-3xl mb-8 text-center">{{ titulo }}</h2>

        <div class="container mx-auto">
            <table class="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-4 py-2">Nombre</th>
                        <th class="border border-gray-300 px-4 py-2">Precio</th>
                        <th class="border border-gray-300 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <Producto v-for="producto in productos" :producto="producto" @eliminar-producto="eliminarProducto" />
                </tbody>
            </table>
        </div>
    </div>
</template>