import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('Playlist', () => {
  const songs = ref<SongWithId[]>([])
  const maxPerPage = ref(1)

  async function fetchSongs() {
    const repository = useSongsRepository()
    const res = await repository.get({
      orderBy: 'modifiedName',
      limit: maxPerPage.value,
    })

    songs.value = res

    return res
  }

  async function fetchNextSongs() {
    if (songs.value.length === 0)
      return fetchSongs()

    const repository = useSongsRepository()
    const res = await repository.get({
      orderBy: 'modifiedName',
      startAfter: songs.value[songs.value.length - 1],
      limit: maxPerPage.value,
    })

    res.forEach(song => songs.value.push(song))

    return songs.value
  }

  async function fetchSongById(id: string) {
    const repository = useSongsRepository()
    const res = await repository.getById(id)
    return res
  };

  return { songs, fetchSongs, fetchNextSongs, maxPerPage, fetchSongById }
})
