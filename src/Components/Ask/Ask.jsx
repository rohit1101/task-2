import React from "react"
import getNewPosts from "../../helpers/getNewPosts"
import uniqueKey from "../../helpers/uniqueKey"
import getCleanURL from "../../helpers/getCleanURL"
import { getRelativeTime } from "../../helpers/time"

class Ask extends React.Component {
  state = {
    askStories: [],
    loading: true,
    searchValue: "",
  }

  async componentDidMount() {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`
    )
    const data = await res.json()
    data.splice(10, data.length)
    const askStories = await getNewPosts(data)
    this.setState({ askStories: askStories, loading: false })
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        {this.state.askStories.map((story) => {
          return (
            <div key={story.id === null ? uniqueKey() : story.id}>
              <h2>
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  {story.title}
                </a>
                {"  "}
                {`${
                  getCleanURL(story.url) === undefined
                    ? ""
                    : `(${getCleanURL(story.url)})`
                }
                `}
              </h2>
              <p>type: {story.type}</p>
              <p>
                by {story.by}
                created at {getRelativeTime(new Date(story.time))}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Ask
