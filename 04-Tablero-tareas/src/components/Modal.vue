<script setup>
    import { reactive } from "vue"
    import Alerta from "./Alerta.vue"
    import iconoCerrar from "../assets/Icons/close_ring_duotone-1.svg"

    const emit = defineEmits(["cerrar-modal", "update:nombre", "update:descripcion", "update:prioridad", "enviar-formulario", "eliminar-tarea"])

    const alerta = reactive({
        tipo: "",
        msg: ""
    })

    const props = defineProps({
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        prioridad: {
            type: String,
            required: true
        },
        id: {
            type: [String, null],
            required: true
        }
    })

    const validar = () => {
        if(Object.values(props).includes("")) {
            alerta.msg = "Los campos no pueden ir vacíos"
            alerta.tipo = "error"

            setTimeout(() => {
                alerta.msg = ""
                alerta.tipo = ""
            }, 3000)

            return;
        }

        alerta.msg = ""
        alerta.tipo = ""
        emit('enviar-formulario')
        emit('cerrar-modal')
    }


</script>

<template>
    <div class="fixed z-1 right-0 top-0 w-full h-screen overflow-auto bg-black/45 flex items-center justify-end">
        <form 
            class="w-1/2 bg-white p-4 h-screen"
            @submit.prevent="validar"
        >
            
            <div class="flex items-center justify-between mb-6">
                <div>
                    <legend class="font-bold text-2xl">Detalles tarea</legend>

                    <Alerta
                        :alerta="alerta" 
                    />
                </div>

                <img 
                    :src="iconoCerrar" 
                    class="cursor-pointer" alt="Icono cerrar"
                    @click="$emit('cerrar-modal')"
                />
            </div>

            <div class="mb-4">
                <label for="name" class="text-gray-400 font-bold">Nombre de la tarea</label>
                <input 
                    class="block mt-2 w-full border-2 p-2 rounded-md" type="text" id="name" 
                    placeholder="Escribe el nombre de la tarea"
                    :value="nombre"
                    @input="$emit('update:nombre', $event.target.value)"
                >
            </div>

            <div>
                <label for="desc" class="text-gray-400 font-bold">Descripción de la tarea</label>
                <textarea 
                    class="block mt-2 w-full border-2 h-24 p-2 rounded-md" 
                    type="text" 
                    id="desc" 
                    placeholder="Escribe el mensaje de la tarea" 
                    :value="descripcion"
                    @input="$emit('update:descripcion', $event.target.value)"
                />
            </div>

            <select 
                id="estado" 
                class="w-full mt-4 bg-gray-200 p-2 rounded-md"
                :value="prioridad"
                @input="$emit('update:prioridad', $event.target.value)"
            >
                <option value="">-- Selecciona la prioridad de tu tarea --</option>
                <option value="baja">Tarea prioridad baja</option>
                <option value="media">Tarea prioridad media</option>
                <option value="alta">Tarea prioridad alta</option>
            </select>

            <input
                class="w-full bg-orange-400 text-white font-bold cursor-pointer hover:bg-orange-500 transition-colors p-2 rounded-md mt-4" 
                type="submit" 
                :value="id ? 'Guardar cambios' : 'Agregar tarea'"
            >

            <button
            v-if="id"
            class="w-full bg-orange-600 text-white font-bold cursor-pointer hover:bg-orange-700 transition-colors p-2 rounded-md mt-4" @click.prevent="$emit('eliminar-tarea', id)"
            >
                Eliminar tarea
            </button>
        </form>
    </div>
</template>