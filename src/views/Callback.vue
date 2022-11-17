<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const params = new URLSearchParams(route.hash.slice(1))
    const token = params.get('access_token')!;
    localStorage.setItem('spotify_token', token);
    router.push({
        name: 'home',
    });
</script>