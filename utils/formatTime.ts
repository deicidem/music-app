type M1 = 0 | 1 | 2 | 3 | 4 | 5
type M2 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type S1 = 0 | 1 | 2 | 3 | 4 | 5
type S2 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Time = `${M1}${M2}:${S1}${S2}`

export default (time: number): Time => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  if (minutes > 59)
    return '59:59'
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` as Time
}
