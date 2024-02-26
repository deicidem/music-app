import { defineStore } from 'pinia'
import { Howl } from 'howler'

export const usePlayerStore = defineStore('Player', () => {
  const currentSong = ref<SongWithId | null>(null)
  const sound = ref<Howl | null>(null)
  const playing = ref(false)
  const seek = ref('00:00')
  const duration = ref('00:00')
  const playerProgress = ref(0)

  watch(() => sound.value?.playing(), (value) => {
    playing.value = value ?? false
  })

  function handleProgress() {
    const _seek = sound.value?.seek() ?? 0
    const _duration = sound.value?.duration() ?? 0

    seek.value = formatTime(_seek)
    duration.value = formatTime(_duration)

    if (_seek && _duration) {
      const p = _seek / _duration
      playerProgress.value = p * 100
    }

    if (playing.value)
      requestAnimationFrame(handleProgress)
  }

  async function newSong(song: SongWithId) {
    if (sound.value) {
      sound.value.unload()
      sound.value = null
    }

    currentSong.value = song

    sound.value = new Howl({
      src: [song.url],
      html5: true,
    })

    sound.value.play()

    sound.value.on('play', () => {
      requestAnimationFrame(handleProgress)
    })
  }

  async function toggleAudio() {
    if (!sound.value?.playing)
      return

    if (playing.value)
      sound.value.pause()
    else
      sound.value.play()
  }

  function updateSeek(offset: number) {
    if (!sound.value)
      return

    const duration = sound.value.duration() ?? 0
    const seconds = duration * offset
    sound.value.seek(seconds)

    sound.value.once('seek', () => {
      requestAnimationFrame(handleProgress)
    })
  }

  return { newSong, currentSong, toggleAudio, playing, duration, seek, playerProgress, updateSeek }
})
