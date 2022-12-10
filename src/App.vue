<script setup lang="ts">

import { RouterView } from 'vue-router'
import Player from '@/components/player.vue';

</script>

<template>
    <RouterView />
    <footer class="fixed bottom-0 w-full">
        <Player />
    </footer>
</template>
