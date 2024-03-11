<script setup>
import { ref } from 'vue';
import AllNotes from './AllNotes.vue';
import HouseNotes from './HouseNotes.vue';
import OfficeNotes from './OfficeNotes.vue';

defineProps({
    filteredNotes: {
        type: Array
    }
})

const selectedComponent = ref('all')

const showAll = () => {
    selectedComponent.value = 'all'
}

const showHouse = () => {
    selectedComponent.value = 'house'
}

const showOffice = () => {
    selectedComponent.value = "office"
}

</script>

<template>
    <div>
        <div class="md:flex items-center gap-4 font-semibold text-gray-400">
            <button 
                @click="showAll"
                :class="{'text-blue-400': selectedComponent === 'all', 'text-gray-400': selectedComponent !== 'all' }"
            >Todas</button>
            <button 
                @click="showHouse"
                :class="{'text-blue-400': selectedComponent === 'house', 'text-gray-400': selectedComponent !== 'house' }"
            >Tareas de la casa</button>
            <button 
                @click="showOffice"
                :class="{'text-blue-400': selectedComponent === 'office', 'text-gray-400': selectedComponent !== 'office' }"
            >Tareas de la oficina</button>
        </div>

        <div class="mt-8">
            <AllNotes 
                v-if="selectedComponent === 'all' "
                :filteredNotes="filteredNotes"
            />
            <HouseNotes 
                v-if="selectedComponent === 'house' "
            />
            <OfficeNotes 
                v-if="selectedComponent === 'office' "
            />
        </div>
    </div>
</template>