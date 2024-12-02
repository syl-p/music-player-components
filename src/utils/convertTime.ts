export function convertTimeHHMMSS(val: number) {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)

  return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
}
