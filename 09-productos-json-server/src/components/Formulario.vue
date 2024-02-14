<script setup>
    import { reactive, computed } from "vue";
    import { useRoute } from "vue-router";
    import Alerta from "../components/Alerta.vue"

    const emit = defineEmits(["crear-producto", "actualizar-producto"])

    const props = defineProps({
        producto:{
            type: Object,
            required: true
        }
    })

    const error = reactive({
        msg: "",
        tipo: ""
    })

    const route = useRoute();
    const { id } = route.params

    const existId = computed(() => {
        return id 
    })
    
    const validar = () => {
        if(Object.values(props.producto).includes("")) {
            error.tipo = "error"
            error.msg = "Todos los campos no puedes ir vacíos";

            setTimeout(() => {
                error.tipo = ""
                error.msg = "";
            }, 3000);
            return
        }

        if(!id) {
            emit("crear-producto")
            return
        }

        emit("actualizar-producto")

    }

</script>

<template>
    <div class="w-full">
    <Alerta v-if="error.msg" :tipo="error.tipo">{{ error.msg }}</Alerta>
        <form
            @submit.prevent="validar"
        >
            <legend class="font-semibold text-gray-600 text-3xl mb-8">Agregar Nuevo Producto</legend>

            <div class="mb-4">
                <label 
                    class="block text-gray-600 font-medium mb-2"
                    for="">Nombre Producto</label>
                <input 
                    class="w-full p-2 bg-transparent border-2 border-gray-200 rounded-md"
                    type="text" 
                    placeholder="Nombre del producto"
                    v-model="producto.nombre"
                >
            </div>
            <div class="mb-4">
                <label 
                    class="block text-gray-600 font-medium mb-2"
                    for="">Precio Producto</label>
                <input 
                    class="w-full p-2 bg-transparent border-2 border-gray-200 rounded-md"
                    type="number" 
                    placeholder="Precio del producto"
                    v-model="producto.precio"
                >
            </div>

            <input 
                class="w-full bg-emerald-500 text-white font-semibold rounded-md p-2 hover:bg-emerald-600 transition-colors cursor-pointer"
                type="submit" :value="[existId ? 'GUARDAR CAMBIOS' : 'AGREGAR']">
        </form>
    </div>
</template>