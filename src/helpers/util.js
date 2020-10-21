export function getCleanURL (url)  {
    if (url !== undefined) {
      const optimisedMatcher = new URL(url).hostname
      return optimisedMatcher
      // const matcher = url.match(
      //   /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/
      // )
      // return matcher[1]
    }
  }

  const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
}

export function getRelativeTime(timestamp) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" })

  const diff = new Date().getTime() - new Date(timestamp).getTime()
  for (var u in units) {
    if (Math.abs(diff) > units[u] || u === "second") {
      return rtf.format(-1 * Math.round(diff / units[u]), u)
    }
  }
}


export function uniqueKey() {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0]
}
