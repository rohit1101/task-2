export default async function getNewPosts(data) {
  const stories = []

  for (let dataID of data) {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${dataID}.json?print=pretty`
    )
    const newStory = await res.json()
    stories.push(newStory)
  }
  return stories
}

// https://hacker-news.firebaseio.com/v0/item/24830962.json?print=pretty
