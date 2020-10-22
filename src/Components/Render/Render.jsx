import React from "react"
import { getRelativeTime, getCleanURL, uniqueKey } from "../../helpers/util"
import styles from "./Render.module.scss"
export default function Render({ story, commentHandler }) {
  return story.map((story) => {
    return (
      <div
        className={styles.container}
        key={story.id === null ? uniqueKey : story.id}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
            {"  "}
            {`${
              getCleanURL(story.url) === undefined
                ? ""
                : `(${getCleanURL(story.url)}`
            })`}
          </h2>
          <p className={styles.time}>
            by {story.by}
            created at {getRelativeTime(story.time)}
          </p>

          <div className={styles.reactions}>
            <p>
              {" "}
              <span aria-label="emoji" role="img">
                {" "}
                🔼{" "}
              </span>{" "}
              {story.score === undefined ? 0 : story.score}
            </p>

            <p
              onClick={() => commentHandler(story)}
              style={{ cursor: "pointer" }}
            >
              {story.kids === undefined
                ? "No comments"
                : `${story.kids.length} Comments`}
            </p>
          </div>
        </div>
      </div>
    )
  })
}
