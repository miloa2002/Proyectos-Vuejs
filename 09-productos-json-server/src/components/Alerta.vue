<script setup>
    import { computed } from "vue";

    const props = defineProps({
        tipo: {
            type: String,
            required: true
        }
    })

    const isError = computed(() => {
        return props.tipo === "error"
    })
</script>

<template>
    <div :class="[isError ? 'bg-red-600' : 'bg-green-600']" class="p-2 text-white font-semibold rounded-md mb-4">
        <slot></slot>
    </div>
</template>