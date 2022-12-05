<script setup lang="ts">
import { getArtist, getTopTracks } from '@/api/spotify';

import { useRoute } from "vue-router";
import { ref } from 'vue';

import type { SpotifyArtist, SpotifyTopTracks } from '@/types/spotify';

const route = useRoute()
const param = ref(<string>route.params.id);
const artist = ref({} as SpotifyArtist);
const topTracks = ref({} as SpotifyTopTracks);

async function init() {
    if (param.value.length) {
        artist.value = (await getArtist(param.value));
        topTracks.value = (await getTopTracks(param.value));
    }
}

function convertMsTrack(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
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
    <div class="p-10 pb-40">
        <table class="w-full">
            <thead class="text-third">
                <tr class="border-b-2 border-b-third">
                    <th class="text-left">Title</th>
                    <th class="text-right">Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(topTrack) in topTracks.tracks" :key="topTrack.id"
                    class="text-white rounded-lg transition ease-in-out duration-300 hover:bg-dark/50">
                    <td class="flex flex-col">
                        <p class="text-lg">{{ topTrack.name }}</p>
                        <div class="flex gap-2">
                            <router-link v-for="trackArtist in topTrack.artists" v-if="topTrack.artists"
                                :to="{ name: 'artist', params: { id: trackArtist.id } }"
                                class="text-third hover:underline">
                                {{ trackArtist.name }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">{{ convertMsTrack(topTrack.duration_ms) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>