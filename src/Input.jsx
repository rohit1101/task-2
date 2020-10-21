import React from "react"

function Input({ search, searchHandler }) {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={searchHandler}
        placeholder="&#x1F50D; Search"
      />
      <hr />
    </div>
  )
}

export default Input
