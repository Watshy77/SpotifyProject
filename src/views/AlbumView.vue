<script setup lang="ts">
import { getAlbum, search } from '@/api/spotify';

import { useRoute } from 'vue-router';
import { ref } from 'vue';

import type { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from '@/types/spotify';

const route = useRoute()

const album = ref({} as SpotifyAlbum);
const artist = ref({} as SpotifyArtist);
const tracks = ref([] as SpotifyTrack[]);
const param = ref(<string>route.params.id);
const albumTimeMs = ref(0);

async function init() {
    if (param.value.length) {
        album.value = (await getAlbum(param.value));
        if (album.value.artists.length && album.value.tracks.items.length) {
            artist.value = (await search(album.value.artists[0].name, 'artist')).artists.items[0];
            tracks.value = album.value.tracks.items;
            albumTimeMs.value = tracks.value.reduce((acc, track) => acc + track.duration_ms, albumTimeMs.value);
        }
    }
}

function convertMsAlbum(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes > 60 ? `${Math.floor(minutes / 60)} hours ${(minutes % 60)} min ${Number(seconds) < 10 ? '0' : ''}${seconds} sec ` : `${minutes} min ${Number(seconds) < 10 ? '0' : ''}${seconds} sec`;
}

function convertMsTrack(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
}

init()
</script>

<template>
    <div class="flex gap-12 p-10 text-white">
        <img v-if="album.images" :src="album.images[1].url" :alt="album.name + ' album'">
        <div class="flex flex-col justify-end gap-6">
            <p class="uppercase">{{ album.album_type }}</p>
            <h1 class="text-6xl font-bold">{{ album.name }}</h1>
            <div class="flex items-center gap-3 text-base pt-10">
                <div v-if="artist.images" class="w-8 h-8 bg-center bg-no-repeat bg-cover rounded-full border-red-600"
                    :style="{ backgroundImage: 'url(' + artist.images[0].url + ')' }">
                </div>
                <router-link v-if="album.artists" :to="{ name: 'artist', params: { id: album.artists[0].id } }"
                    class="font-bold hover:underline">
                    {{ album.artists[0].name }}
                </router-link>
                <div class="bg-white w-2 h-2 rounded-full"></div>
                <p v-if="album.release_date">{{ album.release_date.slice(0, 4) }}</p>
                <div class="bg-white w-2 h-2 rounded-full"></div>
                <p>{{ album.total_tracks }} songs,</p>
                <p>{{ convertMsAlbum(albumTimeMs) }}</p>
            </div>
        </div>
    </div>
    <div class="w-full h-0.5 bg-white"></div>
    <div class="p-10 pb-40">
        <table class="w-full">
            <thead class="text-third">
                <tr class="border-b-2 border-b-third">
                    <th class="w-10 text-center">#</th>
                    <th class="text-left">Title</th>
                    <th class="text-right">Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(track, index) in tracks" :key="track.id"
                    class="text-white rounded-lg transition ease-in-out duration-300 hover:bg-dark/50">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="flex flex-col">
                        <p class="text-lg">{{ track.name }}</p>
                        <div class="flex gap-2">
                            <router-link v-for="trackArtist in track.artists" v-if="track.artists" :to="{ name: 'artist', params: { id: trackArtist.id } }"
                            class="text-third hover:underline">
                            {{ trackArtist.name }}
                        </router-link>
                        </div>
                    </td>
                    <td class="text-right">{{ convertMsTrack(track.duration_ms) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>