import React, { Component } from "react"
import getNewPosts from "../../helpers/getNewPosts"
import { getRelativeTime } from "../../helpers/time"
import uniqueKey from "../../helpers/uniqueKey"
import getCleanURL from "../../helpers/getCleanURL"
import { navigate } from "@reach/router"

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

  handleCommentClick = async (story) => {
    if (story.kids !== undefined) {
      await navigate("/comments", { state: { kids: story } })
    }
  }

  handleSearchInput = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handleSearchInput}
          placeholder="&#x1F50D; Search"
        />
        <hr />
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
              <p>
                {" "}
                <span aria-label="emoji" role="img">
                  {" "}
                  🔼{" "}
                </span>{" "}
                {story.score === undefined ? 0 : story.score}
              </p>
              <p
                onClick={() => this.handleCommentClick(story)}
                style={{ cursor: "pointer" }}
              >
                {story.kids === undefined
                  ? "No comments"
                  : `${story.kids.length} Comments`}
              </p>
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
