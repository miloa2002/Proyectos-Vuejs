<script setup>
import { computed, ref } from 'vue';
import services from '@/services/services';
import { useNotesStore } from '@/stores/notes';
import { useModalStore } from '@/stores/modal';

const store = useNotesStore()
const storeModal = useModalStore()

const props = defineProps({
    note: {
        type: Object
    }
})

const evaluateCategory = computed(() => {
    if(props.note.category === 'house') {
        return ["bg-orange-200", "text-orange-500"]
    } else if(props.note.category === 'office') {
        return ["bg-blue-200", "text-blue-500"]
    }
    else {
        return ["bg-green-200", "text-green-500"]
    } 
})

const deleteNote = async(id) => {
    try {
        await services.deleteNoteApi(id)
        await store.getNotes()
    } catch (error) {
        console.log(error);
    }
}

const openEdit = (note) => {
    store.editingNote = note
    storeModal.showModal()

    Object.assign(store.note, store.editingNote)
}

</script>

<template>
    <div class="shadow-md p-3 rounded-md">
        <div class="flex justify-between items-center">
            <div 
                :class="evaluateCategory"
                class="mb-5 py-1 px-4 rounded-full text-white"
            >
                <p class="font-light text-sm">{{ note.category }}</p>
            </div>
            <div class="flex items-center gap-2">
                <img src="../assets/icons/material-symbols_edit.png" alt="icono edit" width="18" class="cursor-pointer"
                @click="openEdit(note)">
                <img src="../assets/icons/material-symbols_delete-rounded.png" alt="icono delete" width="18" class="cursor-pointer"
                @click="deleteNote(note.id)">
            </div>
        </div>
        <div>
            <h2>{{ note.title }}</h2>
            <p class="font-light text-xs mt-5">{{ note.description }}</p>
        </div>
    </div>
</template>
