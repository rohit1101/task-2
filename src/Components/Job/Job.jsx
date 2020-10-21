import React from "react"
import getNewPosts from "../../helpers/api"
import { navigate } from "@reach/router"
import Render from "../Render/Render"
import Input from "../Input/Input"

class Job extends React.Component {
  state = {
    jobStories: [],
    filteredStories: [],
    loading: true,
    searchValue: "",
  }

  async componentDidMount() {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty`
    )
    const data = await res.json()
    data.splice(10, data.length)
    const jobStories = await getNewPosts(data)
    this.setState({ jobStories: jobStories, loading: false })
  }

  handleCommentClick = async (story) => {
    if (story.kids !== undefined) {
      await navigate("/comments", { state: { kids: story } })
    }
  }

  handleSearchInput = (e) => {
    const searchValue = e.target.value
    const filterStories = [...this.state.jobStories]
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
    const storyArr = this.state.jobStories
    const filteredArr = this.state.filteredStories
    if (this.state.loading) return "loading..."
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

export default Job
