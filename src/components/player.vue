<script setup lang="ts">

import { usePlayerStore } from '@/stores/player'
import { storeToRefs } from 'pinia'

const { songUrl } = storeToRefs(usePlayerStore())

</script>

<template>

    <section class="fixed bottom-0 w-screen bg-stone-900 flex justify-center py-8">
        <audio :src="songUrl" controls autoplay />
    </section>

</template>