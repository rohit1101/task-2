import React, { Component } from "react"
import getNewPosts from "./helpers/getNewPosts"
import { getRelativeTime } from "./helpers/time"
import uniqueKey from "./helpers/uniqueKey"

class App extends Component {
  state = {
    newStories: [],
    loading: true,
    searchValue: "",
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

  handleSearchInput = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        <h1>Hacker News</h1>
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handleSearchInput}
        />

        {this.state.newStories.map((story) => {
          return (
            <div key={story.id === null ? uniqueKey() : story.id}>
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
