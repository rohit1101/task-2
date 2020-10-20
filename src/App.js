import React, { Component } from "react"
import getNewPosts from "./helpers/getNewPosts"

class App extends Component {
  state = {
    newStories: [],
    loading: true,
  }

  async componentDidMount() {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    )
    const data = await res.json()
    data.splice(10, 500)
    const newStories = await getNewPosts(data)
    this.setState({ newStories: newStories, loading: false })
    console.log(newStories)
  }

  getCleanURL = (url) => {
    if (url !== undefined) {
      const optimisedMatcher = new URL(url).hostname
      return optimisedMatcher
      // const matcher = url.match(
      //   /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/
      // )
      // return matcher[1]
    }
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        {this.state.newStories.map((story) => {
          return (
            <div key={story.id}>
              <h2>
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  {story.title}
                </a>
                {"  "}
                {`${
                  this.getCleanURL(story.url) === undefined
                    ? ""
                    : `(${this.getCleanURL(story.url)})`
                }
                `}
              </h2>

              <p>
                by {story.by}
                created at {new Date(story.time).toLocaleTimeString()}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
