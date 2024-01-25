<script setup>
    import { computed } from "vue"
    import iconoBaja from "../assets/Icons/Time_atack_duotone.svg"
    import iconoMedio from "../assets/Icons/Done_round_duotone.svg"
    import iconoAlto from "../assets/Icons/close_ring_duotone.svg"


    const props = defineProps({
        tarea: {
            type: Object,
            required: true
        }
    })

    defineEmits(['editar-tarea'])

    const diccionarioIconos = {
        baja: iconoBaja,
        media: iconoMedio,
        alta: iconoAlto
    }

    const selectColor = computed(() => {
        switch (props.tarea.prioridad) {
            case "baja":
                return "bg-yellow-300"

            case "media":
                return "bg-green-300"

            case "alta":
                return "bg-red-300"
        
            default:
            return "bg-gray-300";
        }
    })
</script>

<template>
    <div class="w-full">
        <div 
            :class="selectColor"
            @click="$emit('editar-tarea', tarea.id)"
            class="flex items-center justify-between mb-4 cursor-pointer p-4 rounded-lg gap-4"
            >
            <div>
                <p class="font-semibold">{{ tarea.nombre }}</p>
                <p class="font-light text-xs">{{ tarea.descripcion }}</p>
            </div>
            <div>
                <img 
                    :src="diccionarioIconos[tarea.prioridad]" 
                    alt="Icono"
                >
            </div>
        </div>
    </div>
</template>