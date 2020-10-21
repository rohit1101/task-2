import React from "react"
import { Link } from "@reach/router"
import styles from "./NavBar.module.scss"
class NavBar extends React.Component {
  state = {
    searchValue: "",
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>Hacker News</h1>
        </div>

        <div>
          <Link className={styles.link} to="/">
            new
          </Link>
          {"  "}
          <Link className={styles.link} to="/ask">
            ask
          </Link>
          {"  "}
          <Link className={styles.link} to="/jobs">
            jobs
          </Link>
          {"  "}
          <Link className={styles.link} to="/show">
            show
          </Link>
        </div>
      </div>
    )
  }
}

export default NavBar
