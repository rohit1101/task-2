import React from "react"
import { Link } from "@reach/router"

class NavBar extends React.Component {
  state = {
    searchValue: "",
  }

  handleSearchInput = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  render() {
    return (
      <div>
        <h1>Hacker News</h1>
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handleSearchInput}
          placeholder="&#x1F50D; Search"
        />
        <hr />
        <div>
          <Link to="/">new</Link>
          {"  "}
          <Link to="/past">past</Link>
          {"  "}
          <Link to="/comments">comments</Link>
          {"  "}
          <Link to="/ask">ask</Link>
          {"  "}
          <Link to="/jobs">jobs</Link>
        </div>
      </div>
    )
  }
}

export default NavBar
