<script setup>
import { reactive, ref, onMounted, watch } from "vue"
import iconoNuevaTarea from "./assets/Icons/Add_round_duotone.svg"
import Modal from "./components/Modal.vue"
import Tarea from "./components/Tarea.vue"
import { uid } from "uid"
import logo from "./assets/Icons/logo.svg"
import iconPencil from "./assets/Icons/Edit_duotone.svg"

const modal = ref(false)
const tareas = ref([])

watch(tareas, ()=> {
  guardarLocalStorage()
}, {
  deep: true
})

onMounted(()=> {
  const tareaStorage = localStorage.getItem("tarea") || []
  tareas.value = JSON.parse(tareaStorage)
})


const tarea = reactive({
  nombre: "",
  descripcion: "",
  prioridad: "",
  id: null
})

const guardarLocalStorage = () => {
  localStorage.setItem("tarea", JSON.stringify(tareas.value))
}


const resetearOBJ = () => {
  Object.assign(tarea, {
    nombre: "",
    descripcion: "",
    prioridad: "",
    id: null
  })
}

const mostrarModal = () => {
  modal.value = true
}

const cerrarModal = () => {
  modal.value = false
  resetearOBJ()
}

const enviarFormulario = () => {
  const { id } = tarea
  if(id) {
    const i = tareas.value.findIndex(i => i.id === id);
    tareas.value[i] = {...tarea}
  }else {
    tareas.value.push({
    ...tarea,
    id: uid()
  })
  }

  resetearOBJ()
  cerrarModal()
}

const eliminarTarea = (id) => {
  tareas.value = tareas.value.filter(tarea => tarea.id !== id)
  resetearOBJ()
  cerrarModal()
}

const editarTarea = (id) => {
  const tareaFiltrada = tareas.value.filter(tarea => tarea.id === id)[0]
  Object.assign(tarea, tareaFiltrada)

  mostrarModal();
}

</script>

<template>
  <main class="md:w-1/2 w-96 mx-auto my-10">
    <div class="flex items-center gap-4 mb-16">
      <img :src="logo" alt="Logo" />
      <div class="flex flex-col gap-4">
        <h2 class="font-semibold text-4xl">My tablero de tareas</h2>
        <p>tarea para mantenerse organizado</p>
      </div>
      <img :src="iconPencil" alt="Icono pencil" />
    </div>

    <Tarea v-for="tarea in tareas" :tarea="tarea" :key="tarea.id" @editar-tarea="editarTarea" />

    <div class="w-full">
      <div class="flex items-center cursor-pointer bg-orange-100 p-4 rounded-lg gap-4" @click="mostrarModal">
        <div class="bg-orange-400 rounded-md p-2">
          <img :src="iconoNuevaTarea" alt="Icono nueva tarea" />
        </div>
        <p class="font-semibold">Añadir nueva tarea</p>
      </div>
    </div>

    <Modal v-if="modal" v-model:nombre="tarea.nombre" v-model:descripcion="tarea.descripcion"
      @eliminar-tarea="eliminarTarea"
      v-model:prioridad="tarea.prioridad" :id="tarea.id" @cerrar-modal="cerrarModal"
      @enviar-formulario="enviarFormulario"
    />

  </main>
</template>
