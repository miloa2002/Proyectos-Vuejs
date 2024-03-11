<script setup>
import { reactive } from 'vue';
import { useModalStore } from '@/stores/modal';
import { useNotesStore } from '@/stores/notes';
import services from '@/services/services';
import Error from './Error.vue';

const store = useModalStore()
const storeNotes = useNotesStore()

const addNote = async() => {
    try {
        await services.addNoteApi(storeNotes.note)
        await storeNotes.getNotes()
    } catch (error) {
        console.log(error);
    }
}

const updateNote = async (id, note) => {
    try {
        await services.updatteNoteApi(id, note)
        await storeNotes.getNotes()
    } catch (error) {
        console.log(error);
    }
}

const validate = async() => {
    if(Object.values(storeNotes.note).includes("")) {
        store.error = "Los campos no pueden ir vacíos"

        setTimeout(()=> {
            store.error = ""
        }, 2000)
        return;
    }

    if(storeNotes.note.id) {
        await updateNote(storeNotes.note.id, storeNotes.note)
    }else {
        await addNote()
    }
    
    Object.assign(storeNotes.note, {
        id: null,
        title: "",
        category: "",
        description: ""
    })

    store.closewModal()
}

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-white p-8 rounded-lg z-10">
            <Error v-if="store.error">{{ store.error }}</Error>
         <form
            @submit.prevent="validate"
         >
            <div class="flex items-center justify-between mb-4">
                <h2 class="font-bold">Añadir nota</h2>
                <p 
                    class="font-bold text-gray-400 cursor-pointer"
                    @click="store.closewModal"
                >X</p>
            </div>

            <div class="flex gap-4">
                <div>
                    <label
                    class="block text-sm font-bold mb-2" 
                    for="title">Título</label>
                    <input 
                        type="text"
                        placeholder="Añadir el título"
                        class="bg-gray-200 rounded-md w-full p-2"
                        v-model="storeNotes.note.title"
                    >
                </div>

                <div>
                    <label
                    class="block text-sm font-bold mb-2" 
                    for="category">Category</label>
                    <select 
                        id="category"
                        class="bg-gray-200 rounded-md w-full p-2 text-sm"
                        v-model="storeNotes.note.category"
                    >
                        <option value="">--Selecciona--</option>
                        <option value="house">Tareas de la casa</option>
                        <option value="office">Tareas de la oficina</option>
                        <option value="personal">Tareas personales</option>
                    </select>
                </div>
            </div>

            <div>
                <label
                class="block text-sm font-bold mb-2" 
                for="description">Descripción <span>(opcional)</span></label>
                <textarea 
                    id="description" 
                    placeholder="Añadir descripción"
                    class="bg-gray-200 rounded-md w-full p-2 h-24"
                    v-model="storeNotes.note.description"
                ></textarea>
            </div>

            <div class="flex justify-end gap-4 mt-4">
                <button 
                    class="text-gray-400 font-bold"
                    @click="store.closewModal"
                >Cancelar</button>
                <button class="bg-blue-400 font-bold text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors">Añadir</button>
            </div>
         </form>
        </div>
      </div>
</template>
