export default function getCleanURL (url)  {
    if (url !== undefined) {
      const optimisedMatcher = new URL(url).hostname
      return optimisedMatcher
      // const matcher = url.match(
      //   /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/
      // )
      // return matcher[1]
    }
  }