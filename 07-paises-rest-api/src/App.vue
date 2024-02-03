<script setup>
import { ref, computed } from "vue"
import UseCountries from "./composables/UseCountries"
import Country from "./components/Country.vue"

const { countries } = UseCountries()
const searchQuery = ref("")
const selectedRegion = ref("")

const selectRegion = (region) => {
  selectedRegion.value = region
}

const filterCountry = computed(() => {
  if(searchQuery.value) {
    return countries.value.filter(country => country.name.common.toLowerCase() === searchQuery.value.toLowerCase())
  }

  if(selectedRegion.value) {
    return countries.value.filter(country => country.region.toLowerCase() === selectedRegion.value.toLowerCase())
  }

  return countries.value
})


</script>

<template>
  <div>
    <div class="background-image">
      <img src="./assets/img/Logo.svg" alt="logo">
    </div>
    <main class="w-4/5 mx-auto py-12">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <p class="font-bold text-zinc-500 text-lg">Found {{ countries.length }} countries</p>
        <input v-model="searchQuery" type="text" placeholder="Busca país" class="bg-zinc-700 p-4 rounded-md outline-none text-white">
      </div>

      <div class="flex flex-col md:flex-row">
        <div class="w-1/3">
          <p class="font-bold text-zinc-500 text-lg">Región</p>
          <div class="flex gap-5 items-center mb-5">
            <button @click="selectRegion('Americas')" class="text-white font-bold py-3 px-2 bg-zinc-700 rounded-md">America</button>
            <button @click="selectRegion('Antarctic')" class="text-white font-bold py-3 px-2 bg-zinc-700 rounded-md">Antartida</button>
          </div>
          <div class="flex gap-5 items-center mb-5">
            <button @click="selectRegion('Africa')" class="text-white font-bold py-3 px-2 bg-zinc-700 rounded-md">Africa</button>
            <button @click="selectRegion('Asia')" class="text-white font-bold py-3 px-2 bg-zinc-700 rounded-md">Asia</button>
          </div>
          <div class="flex gap-5 items-center">
            <button @click="selectRegion('Europe')" class="text-white font-bold py-3 px-2 bg-zinc-700 rounded-md">Europa</button>
            <button @click="selectRegion('Oceania')" class="text-white font-bold py-3 px-2 bg-zinc-700 rounded-md">Oceanía</button>
          </div>
        </div>
        <div class="w-2/3">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b dark:border-neutral-500 font-bold text-zinc-500">
                      <tr>
                        <th scope="col" class="px-6 py-4">Bandera</th>
                        <th scope="col" class="px-6 py-4">Nombre</th>
                        <th scope="col" class="px-6 py-4">Capitales</th>
                        <th scope="col" class="px-6 py-4">Región</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Country v-for="country in filterCountry" :country="country" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<style>
.background-image {
  background-image: url(./assets/img/hero-image-wr.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>