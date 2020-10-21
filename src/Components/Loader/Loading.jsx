import React from "react"
import styles from "./Loading.module.scss"

function Loading() {
  return (
    <div className={styles.load}>
      <h3>
        Loading{" "}
        <span role="img" ari-label="emoji">
          {" "}
          🤪
        </span>
      </h3>
    </div>
  )
}

export default Loading
