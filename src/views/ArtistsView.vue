<script setup lang="ts">
import { search } from '@/api/spotify';
import router from '@/router';
import { useRoute } from "vue-router";
import { ref } from 'vue';

const navArtist = document.querySelector("#nav-artist")
if (navArtist) {
    navArtist.classList.add("font-bold")
}

const route = useRoute();
const paramArtist = ref(<string>route.params.artist);

const inputArtist = ref('');
const response = ref({});

console.log(paramArtist.value);

async function init() {
    response.value = await search(paramArtist.value, 'artist')
}

async function searchArtist() {
    router.push(`/artists/${inputArtist.value}`)
    response.value = await search(inputArtist.value, 'artist')
}

init()

</script>

<template>
    <div class="flex justify-center gap-4">
        <div class="w-1/2">
            <input v-model="inputArtist" type="text" class="input-artist w-full border-2 border-gray-300 p-2 rounded-lg" placeholder="Search">
        </div>
        <button @click="searchArtist" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
        </button>
    </div>
    <img v-if="response.artists" :src="response.artists.items[0].images[0].url" :alt="response.artists.items[0].name + ' artist'">
</template>