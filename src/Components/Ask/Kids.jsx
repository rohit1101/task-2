import React from "react"
import getNewPosts from "../../helpers/api"
import { getRelativeTime, uniqueKey } from "../../helpers/util"
import Loading from "../Loader/Loading"
import styles from "./Kids.module.scss"
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
    if (this.state.loading) return <Loading />
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h3>{this.state.question}</h3>
          {this.state.kids.map((story) => {
            return (
              <div
                className={styles.child}
                key={story.id === null ? uniqueKey() : story.id}
              >
                <h5>{story.text}</h5>

                <div className={styles.reactions}>
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
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Kids
