import React from "react"
import getNewPosts from "../../helpers/getNewPosts"
import uniqueKey from "../../helpers/uniqueKey"
import getCleanURL from "../../helpers/getCleanURL"
import { getRelativeTime } from "../../helpers/time"
import { navigate } from "@reach/router"

class Job extends React.Component {
  state = {
    jobStories: [],
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

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        {this.state.jobStories.map((story) => {
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
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  return this.handleAskClick(story)
                }}
              >
                {" "}
                {story.kids === undefined
                  ? "No comments"
                  : `${story.kids.length} Comments`}
              </p>
              <p>
                by {story.by}
                created at {getRelativeTime(story.time)}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Job
