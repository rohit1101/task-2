import React from "react"
import getNewPosts from "../../helpers/getNewPosts"
import uniqueKey from "../../helpers/uniqueKey"
import { getRelativeTime } from "../../helpers/time"

class Kids extends React.Component {
  state = {
    kids: [],
    loading: true,
    searchValue: "",
  }

  async componentDidMount() {
    console.log(this.props.location.state)

    // const { kids } = kidsStories.kids

    // const kids = await getNewPosts(data)
    // console.log(kids)
    // this.setState({ kids: kids, loading: false })
  }

  render() {
    if (this.state.loading) return "loading..."
    return (
      <div>
        {this.state.kids.map((story) => {
          return (
            <div key={story.id === null ? uniqueKey() : story.id}>
              <h2>
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  {story.title}
                </a>
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

export default Kids
