import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {

    const songUrl = ref(null)

    function addSongUrl(url) {
        songUrl.value = url
    }

    return { songUrl, addSongUrl }
})