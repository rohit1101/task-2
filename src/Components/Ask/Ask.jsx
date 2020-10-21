import React from "react"
import getNewPosts from "../../helpers/api"
import { navigate } from "@reach/router"
import Render from "../../Render"

class Ask extends React.Component {
  state = {
    askStories: [],
    filteredStories: [],
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

  handleAskClick = async (story) => {
    if (story.kids !== undefined) {
      await navigate("/comments", { state: { kids: story } })
    }
  }

  handleSearchInput = (e) => {
    const searchValue = e.target.value
    const filterStories = [...this.state.askStories]
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
    const storyArr = this.state.askStories
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
          <Render story={filteredArr} />
        ) : (
          <Render story={storyArr} />
        )}
      </div>
    )
  }
}

export default Ask
