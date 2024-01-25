<script setup>
import { computed } from "vue"

const props = defineProps({
    alerta: {
        type: Object,
        required: true
    }
})

const isError = computed(() => {
    return props.alerta.tipo === "error"
})

</script>

<template>
    <div v-if="isError" :class="[isError ?  'bg-red-600' : 'bg-green-600']" class="w-full p-2 rounded-md text-white">
        {{ alerta.msg }}     
    </div>
</template>