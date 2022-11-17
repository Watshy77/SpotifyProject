<script setup lang="ts">
import { search } from '@/api/spotify';

import { useRoute } from 'vue-router';
import { ref } from 'vue';

import type { SpotifyAlbum } from '@/types/spotify';

const route = useRoute()

const query = ref(route.query.query as string ?? '');
const albums = ref([] as SpotifyAlbum[]);

async function init() {
    if (query.value.length) {
        albums.value = (await search(query.value, 'album')).albums.items;
    }
}

init()
</script>

<template>
    <form method="get" class="flex justify-center gap-4 pt-5">
        <input v-model="query" name="query" type="text" class="w-1/2 input-artist border-2 border-gray-300 p-2 rounded-lg" placeholder="Search Albums">
        <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Search">
    </form>
    <div class="flex flex-wrap justify-center gap-4 pt-10">
        <div v-for="album in albums" :key="album.id" class="w-1/6 bg-secondary text-white rounded-xl transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-95 hover:bg-dark">
            <router-link :to="{ name: 'album', params: { id: album.id } }" class="h-full flex flex-col items-center place-content-around p-10">
                <a>
                    <img :src="album.images[0].url" :alt="album.name + ' album'">
                </a>
                <p class="text-lg">{{ album.name }}</p>
                <div class="flex gap-2 items-center text-third">
                    <p class="text-lg">{{ album.release_date.slice(0, 4) }}</p>
                    <div class="bg-third w-3 h-3 rounded-full"></div>
                    <p>{{ album.artists[0].name }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>