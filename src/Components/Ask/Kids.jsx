import React from "react"
import getNewPosts from "../../helpers/api"
import uniqueKey from "../../helpers/uniqueKey"
import { getRelativeTime } from "../../helpers/time"

class Kids extends React.Component {
  state = {
    kids: [],
    question: "",
    loading: true,
    searchValue: "",
  }

  async componentDidMount() {
    const kidsProp = this.props.location.state
    const { kids } = kidsProp.kids
    kids.splice(10, kids.length)
    const kidsStories = await getNewPosts(kids)
    this.setState({
      kids: kidsStories,
      loading: false,
      question:
        kidsProp.kids.text === undefined
          ? kidsProp.kids.title
          : kidsProp.kids.text,
    })
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        <h3>{this.state.question}</h3>
        {this.state.kids.map((story) => {
          return (
            <div key={story.id === null ? uniqueKey() : story.id}>
              <h5>{story.text}</h5>
              <p>
                {" "}
                <span aria-label="emoji" role="img">
                  {" "}
                  🔼{" "}
                </span>{" "}
                {story.score === undefined ? 0 : story.score}
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

export default Kids
