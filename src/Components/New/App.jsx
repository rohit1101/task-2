import React, { Component } from "react"
import getNewPosts from "../../helpers/api"
import { navigate } from "@reach/router"
import Render from "../../Render"

class App extends Component {
  state = {
    newStories: [],
    filteredStories: [],
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

  handleCommentClick(story) {
    if (story.kids !== undefined) {
      navigate("/comments", { state: { kids: story } })
    }
  }

  handleSearchInput = (e) => {
    const searchValue = e.target.value
    const filterStories = [...this.state.newStories]
    if (searchValue !== " ") {
      this.setState({ searchValue: searchValue })
      const filteredStories = filterStories.filter((item) => {
        return item.title.toLowerCase().includes(searchValue.toLowerCase())
      })
      this.setState({ filteredStories: filteredStories })
    }
    if (searchValue === "") {
      this.setState({ filteredStories: [] })
    }
  }

  render() {
    const storyArr = this.state.newStories
    const filteredArr = this.state.filteredStories
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
        {filteredArr.length && filteredArr ? (
          <Render
            story={filteredArr}
            commentHandler={this.handleCommentClick}
          />
        ) : (
          <Render story={storyArr} commentHandler={this.handleCommentClick} />
        )}
      </div>
    )
  }
}

export default App
