<script setup lang="ts">
    const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
    const response_type = 'token';
    const redirect_uri = encodeURIComponent(import.meta.env.VITE_APP_SPOTIFY_REDIRECT_URI);

    const spotifyUrl = 'https://accounts.spotify.com/authorize';

    const finalUrl = spotifyUrl + `?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`

    window.location.href = finalUrl
</script>
