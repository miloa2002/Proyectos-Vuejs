<script setup>
import { ref, onMounted, watch  } from 'vue';
import Filter from './components/Filter.vue';
import Modal from './components/Modal.vue';
import { useModalStore } from './stores/modal';
import { useNotesStore } from './stores/notes';

const store = useModalStore()
const storeNotes = useNotesStore()
const filteredNotes = ref([])

const searchInput = ref("")

const searchNote = () => {
  filteredNotes.value = storeNotes.notes.filter(note => {
    return note.title.toLowerCase().includes(searchInput.value.toLowerCase()) || note.description.toLowerCase().includes(searchInput.value.toLowerCase())
  })
}

watch(() => storeNotes.notes, () => {
  searchNote()
})

</script>

<template>
  <header class="bg-white shadow-md p-2">
    <div class="container mx-auto gap-8 md:flex justify-between items-center">
       <div class="w-full md:w-3/4 mb-2 md:m-0">
         <input 
           type="text" 
           placeholder="Buscar nota"
           class="bg-gray-200 w-full rounded-md p-2"
           v-model="searchInput"
           @input="searchNote"
         >
       </div>
       <div>
         <button
           class="bg-blue-400 font-bold text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
           @click="store.showModal"
         >+ nota</button>
       </div>
    </div>
 </header>

 <main class="container mx-auto font-semibold">
  <h1>Your notes</h1>

  <Filter :filteredNotes="filteredNotes" />
 </main>

 <Modal v-if="store.modal" />
 
</template>
