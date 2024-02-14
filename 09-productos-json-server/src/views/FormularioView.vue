<script setup>
    import { reactive, onMounted } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import Formulario from '../components/Formulario.vue';
    import ProductosServices from "../services/ProductosServices";

    const producto = reactive({
        nombre: "",
        precio: 0
    })

    const router = useRouter();
    const route = useRoute();

    const { id } = route.params

    onMounted( async() => {
        try {
            const response = await ProductosServices.obtenerProductoApi(id)
            Object.assign(producto, response.data)
        } catch (error) {
            console.log(error);
        }
    })

    const crearProducto = async () => {
        try {
            await ProductosServices.crearProductoApi(producto);
            router.push({name: 'home'})
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarProducto = async () => {
        try {
            await ProductosServices.actualizarProductoApi(id, producto);
        } catch (error) {
            console.log(error);
        }
    }
    
</script>

<template>
    <div class="flex justify-center mt-12 w-1/2 border-2 border-gray-200 mx-auto rounded-md p-4">
        <Formulario 
            :producto="producto"
            @crear-producto="crearProducto"
            @actualizar-producto="actualizarProducto"
        />
    </div>
</template>
