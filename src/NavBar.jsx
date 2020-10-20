import React from "react"
import { Link, navigate } from "@reach/router"
import getNewPosts from "./helpers/getNewPosts"
class NavBar extends React.Component {
  state = {
    searchValue: "",
  }

  handleSearchInput = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  handleBtnClick = async (e) => {
    console.log(e.target.textContent)

    if (e.target.textContent === "new") {
      navigate("/")
    }

    if (e.target.textContent === "ask") {
      e.persist()
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`
      )
      const data = await res.json()
      data.splice(10, data.length)
      const askStories = await getNewPosts(data)
      console.log(askStories)
      navigate("/ask")
    }

    if (e.target.textContent === "jobs") {
      navigate("/jobs")
    }
  }

  render() {
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
          <button onClick={this.handleBtnClick}>new</button>
          <button onClick={this.handleBtnClick}>past</button>
          <button onClick={this.handleBtnClick}>comments</button>
          <button onClick={this.handleBtnClick}>ask</button>
          <button onClick={this.handleBtnClick}>jobs</button>
        </div>
      </div>
    )
  }
}

export default NavBar
