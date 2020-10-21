import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => {
  return (
    <ContentLoader viewBox="0 0 778 116" width={1000} height={1000} {...props}>
      <rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
      <rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
      <rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
      <rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
      <rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
    </ContentLoader>
  )
}

Loader.metadata = {
  name: "Ahsan Ullah", // My name
  github: "IamAhsanMani", // Github username
  description: "Upwork Job",
  filename: "Loader",
}

export default Loader
