import React from "react"
import { Link } from "@reach/router"

class NavBar extends React.Component {
  state = {
    searchValue: "",
  }

  render() {
    return (
      <div>
        <h1>Hacker News</h1>

        <div>
          <Link to="/">new</Link>
          {"  "}
          <Link to="/ask">ask</Link>
          {"  "}
          <Link to="/jobs">jobs</Link>
          {"  "}
          <Link to="/show">show</Link>
        </div>
        <button>Sign in</button>
      </div>
    )
  }
}

export default NavBar
