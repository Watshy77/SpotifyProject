import { instance } from './index';

export function search(query: string, type: string, limit = 20) {
    return instance.get('/search', {
        params: {
            q: query,
            type,
            limit,
        }
    })
        .then(response => {
            return response.data;
        })
}

export function getAlbum(id: string) {
    return instance.get(`/albums/${id}`)
        .then(response => {
            return response.data;
        })
}

export function getArtist(id: string) {
    return instance.get(`/artists/${id}`)
        .then(response => {
            return response.data;
        })
}

export function getTopTracks(id: string) {
    return instance.get(`/artists/${id}/top-tracks?country=FR`)
        .then(response => {
            return response.data;
        })
}