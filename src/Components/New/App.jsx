import React, { Component } from "react"
import getNewPosts from "../../helpers/getNewPosts"
import { getRelativeTime } from "../../helpers/time"
import uniqueKey from "../../helpers/uniqueKey"
import getCleanURL from "../../helpers/getCleanURL"

class App extends Component {
  state = {
    newStories: [],
    loading: true,
    searchValue: "",
  }

  async componentDidMount() {
    const randomStories = ["topstories", "newstories", "beststories"]
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/${
        randomStories[Math.floor(Math.random() * randomStories.length)]
      }.json?print=pretty`
    )
    const data = await res.json()
    data.splice(10, data.length)
    const newStories = await getNewPosts(data)
    this.setState({ newStories: newStories, loading: false })
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        {this.state.newStories.map((story) => {
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

export default App
