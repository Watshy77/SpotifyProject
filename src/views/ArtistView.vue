<script setup lang="ts">
import { getArtist } from '@/api/spotify';

import { useRoute } from "vue-router";
import { ref } from 'vue';

import type { SpotifyArtist } from '@/types/spotify';

const route = useRoute()
const param = ref(<string>route.params.id);
const artist = ref({} as SpotifyArtist);

async function init() {
    if (param.value.length) {
        artist.value = (await getArtist(param.value));
    }
}

init()
</script>

<template>
    <div class="flex justify-center gap-7 pt-20">
        <div v-if="artist.images" class="w-64 h-64 bg-center bg-no-repeat bg-cover rounded-full border-red-600"
            :style="{ backgroundImage: 'url(' + artist.images[0].url + ')' }">
        </div>
        <div class="flex flex-col justify-center gap-8 text-white">
            <h1 class="text-6xl font-bold">{{ artist.name }}</h1>
            <div>
                <p v-if="artist.genres" v-for="genre in artist.genres" class="text-xl text-gray-400">{{ genre }}</p>
            </div>
            <p v-if="artist.followers" class="text-2xl">{{ artist.followers.total }} followers</p>
        </div>
    </div>
</template>