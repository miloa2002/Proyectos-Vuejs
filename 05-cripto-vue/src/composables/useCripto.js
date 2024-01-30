import { ref, onMounted, computed } from "vue";

export default function useCripto() {

    const criptomonedas = ref([])
    const monedas = ref([
        { codigo: 'USD', texto: 'Dólar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    const cotizacion = ref({})
    const cargando = ref((false))

    onMounted(() => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
        fetch(url)
          .then(res => res.json())
          .then(({Data}) => criptomonedas.value = Data)
      })

      const obtenerCotizacion = async (cotizar) => {

        cargando.value = true
        cotizacion.value = {}
        const { moneda, criptomoneda } = cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    
        const res = await fetch(url)
        const data = await res.json()
    
        cotizacion.value = data.DISPLAY[criptomoneda][moneda]
    
        cargando.value = false
      }

      const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
      })

    return {
        monedas,
        criptomonedas,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }
}