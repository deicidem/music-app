import { defineStore } from 'pinia'

export const useSongsManagerStore = defineStore('SongsManager', () => {
  const songs = ref<SongWithId[]>([])

  async function fetchSongs() {
    const user = useCurrentUser()
    const repository = useSongsRepository()

    const res = await repository.get(
      {
        orderBy: 'modifiedName',
        userId: user.value?.uid,
      },
    )

    songs.value = res
  }

  async function addSong(song: Song) {
    const repository = useSongsRepository()
    const res = await repository.add(song)

    songs.value.push({ id: res.id, ...song })

    return res
  }

  async function updateSong(id: string, song: Song) {
    const repository = useSongsRepository()
    const res = await repository.update(id, song)

    songs.value = songs.value.map((s) => {
      return s.id === id ? { ...song, id } : s
    })

    return res
  }

  async function deleteSong(song: SongWithId) {
    const repository = useSongsRepository()
    repository.remove(song)

    songs.value = songs.value.filter(s => s.id !== song.id)
  }

  return { addSong, songs, fetchSongs, updateSong, deleteSong }
})
