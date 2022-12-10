<script setup lang="ts">

import Player from '@/components/player.vue';

</script>

<template>
    <nav class="flex items-center justify-between flex-wrap p-6 bg-dark">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <a href="/" class="font-semibold text-xl tracking-tight">Spotify</a>
        </div>
        <div class="block lg:hidden">
            <button
                class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
                <a id="nav-album" href="/albums" class="block mt-4 lg:inline-block lg:mt-0 w-16 text-white hover:font-bold">
                    Albums
                </a>
            </div>
            <div>
                <a href="/login"
                    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                    Login
                </a>
            </div>
        </div>
    </nav>
    <div class="flex-grow overflow-y-auto bg-primary">
        <router-view :key="$route.fullPath"></router-view>
    </div>
    <footer class="fixed bottom-0 w-full">
        <Player  />
    </footer>
</template>