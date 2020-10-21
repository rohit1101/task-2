import React from "react"
import styles from "./Input.module.scss"
function Input({ search, searchHandler }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <input
          type="text"
          value={search}
          onChange={searchHandler}
          placeholder="&#x1F50D; Search"
        />
      </div>
      <hr />
    </div>
  )
}

export default Input
