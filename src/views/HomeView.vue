<script setup lang="ts">
import { instance } from '@/api';
import { search } from '@/api/spotify';
import { ref } from 'vue';

const response = ref({});

async function init() {
    response.value = await search('Vald', 'artist')
}

init()
</script>

<!-- Faire le même home que spotify, avec un random des albums et tracks -->

<template>

</template>
