<script setup>
import { useNotesStore } from '@/stores/notes';
import Note from "./Note.vue"

const store = useNotesStore()

defineProps({
    filteredNotes: {
        type: Array
    }
})

</script>

<template>
    <div class="grid md:grid-cols-3 grid-cols-2 items-center justify-center gap-4">
        <Note 
            v-for="note in filteredNotes"
            :note="note"
        />
    </div>
</template>