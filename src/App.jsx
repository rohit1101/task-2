import React, { Component } from "react"
import getNewPosts from "./helpers/getNewPosts"
import { getRelativeTime } from "./helpers/time"
import uniqueKey from "./helpers/uniqueKey"
import getCleanURL from "./helpers/getCleanURL"

class App extends Component {
  state = {
    newStories: [],
    askStories: [],
    jobStories: [],
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

  handleSearchInput = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  handleBtnClick = async (e) => {
    console.log(e.target.textContent)

    if (e.target.textContent === "ask") {
      e.persist()
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`
      )
      const data = await res.json()
      data.splice(10, data.length)
      const askStories = await getNewPosts(data)
    }

    if (e.target.textContent === "jobs") {
      return ""
    }
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
          placeholder="&#x1F50D; Search"
        />
        <hr />
        <div>
          <button onClick={this.handleBtnClick}>past</button>
          <button onClick={this.handleBtnClick}>comments</button>
          <button onClick={this.handleBtnClick}>ask</button>
          <button onClick={this.handleBtnClick}>jobs</button>
        </div>
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
