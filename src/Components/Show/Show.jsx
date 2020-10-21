import React from "react"
import getNewPosts from "../../helpers/api"
import { navigate } from "@reach/router"
import Render from "../Render/Render"
import Input from "../Input/Input"

class Show extends React.Component {
  state = {
    showStories: [],
    filteredStories: [],
    loading: true,
    searchValue: "",
  }

  async componentDidMount() {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty`
    )
    const data = await res.json()
    data.splice(10, data.length)
    const showStories = await getNewPosts(data)
    this.setState({ showStories: showStories, loading: false })
  }

  handleCommentClick = async (story) => {
    if (story.kids !== undefined) {
      await navigate("/comments", { state: { kids: story } })
    }
  }

  handleSearchInput = (e) => {
    const searchValue = e.target.value
    const filterStories = [...this.state.showStories]
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
    if (this.state.loading) return "loading..."
    const storyArr = this.state.showStories
    const filteredArr = this.state.filteredStories
    return (
      <div>
        <Input
          search={this.state.searchValue}
          searchHandler={this.handleSearchInput}
        />
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

export default Show
