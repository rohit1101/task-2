import React from "react"
import { Router } from "@reach/router"
import App from "./Components/New/App"
import NavBar from "./Components/NavBar/NavBar"
import Ask from "./Components/Ask/Ask"
import Job from "./Components/Job/Job"
import Show from "./Components/Show/Show"
import Kids from "./Components/Ask/Kids"

function Route() {
  return (
    <>
      <NavBar />
      <Router>
        <App path="/" exact />
        <Ask path="/ask" exact />
        <Job path="/jobs" exact />
        <Show path="/show" exact />
        <Kids path="/comments" exact />
      </Router>
    </>
  )
}

export default Route
