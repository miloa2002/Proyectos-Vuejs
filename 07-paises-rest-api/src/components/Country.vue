<script setup>
defineProps({
    country: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <tr class="text-white font-bold">
        <td class="whitespace-nowrap px-6 py-4 font-medium">
            <img 
                :src="country.flags.svg" 
                :alt="country.flags.alt"
                width="100"
            >
        </td>
        <td class="whitespace-nowrap px-6 py-4">{{ country.name.common }}</td>
        <td class="whitespace-nowrap px-6 py-4">{{ country.capital[0] }}</td>
        <td class="whitespace-nowrap px-6 py-4">{{ country.region }}</td>
    </tr>
</template>