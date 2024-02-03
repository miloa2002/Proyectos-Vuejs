import { ref, onMounted, computed } from "vue"

export default function UseCountries() {
    const countries = ref([])

    onMounted(() => {
        const url = "https://restcountries.com/v3.1/all"
        fetch(url)
            .then(res => res.json())
            .then(data => countries.value = data)
    })

    return {
        countries
    }
}