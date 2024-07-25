// Plugin untuk klik outside
// Jangan lupa jalankan npm i click-outside-vue3 untuk menginstall
// Contoh penggunaan:
// <div v-if="buka_user" v-click-outside="toggleUser"></div>

import vClickOutside from "click-outside-vue3"
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vClickOutside)
})
