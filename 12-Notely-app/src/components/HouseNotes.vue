<script setup>
import { computed } from 'vue';
import { useNotesStore } from '@/stores/notes';
import Note from "./Note.vue"

const store = useNotesStore()

const houseNotes = computed(() => {
    return store.notes.filter(notesHouse => notesHouse.category === "house")
})
</script>

<template>
    <div class="grid md:grid-cols-3 grid-cols-2 items-center justify-center gap-4">
        <Note 
            v-for="note in houseNotes"
            :note="note"
        />
    </div>
</template>