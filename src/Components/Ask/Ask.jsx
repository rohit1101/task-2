import React from "react"
import getNewPosts from "../../helpers/getNewPosts"
import uniqueKey from "../../helpers/uniqueKey"
import { getRelativeTime } from "../../helpers/time"
import { Link, navigate } from "@reach/router"

class Ask extends React.Component {
  state = {
    askStories: [],
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

  handleAskClick = (story) => {
    console.log(story)
    navigate("/comments", { state: { kids: story.kids } })
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        {this.state.askStories.map((story) => {
          return (
            <div key={story.id === null ? uniqueKey() : story.id}>
              <h2>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    return this.handleAskClick(story)
                  }}
                >
                  {story.title}
                </p>
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

export default Ask
