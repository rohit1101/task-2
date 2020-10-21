import React from "react"
import uniqueKey from "./helpers/uniqueKey"
import getCleanURL from "./helpers/getCleanURL"
import { getRelativeTime } from "./helpers/time"

export default function Render({ story }) {
  return story.map((story) => {
    return (
      <div key={story.id === null ? uniqueKey : story.id}>
        <h2>
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
          {"  "}
          {`${
            getCleanURL(story.url) === undefined
              ? ""
              : `(${getCleanURL(story.url)})`
          })`}
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
          onClick={() => this.handleCommentClick(story)}
          style={{ cursor: "pointer" }}
        >
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
  })
}
