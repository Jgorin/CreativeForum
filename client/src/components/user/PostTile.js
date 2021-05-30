import React from "react"
import { Link } from "react-router-dom"
import { Paper } from "@material-ui/core"

const PostTile = (props) => {
  const { post } = props

  return(
    <li>
      <Paper style={{padding: "20px", minHeight: "100px", margin: "25px 0px 25px 0px"}} elevation={2}>
        <Link to={`/posts/${post.id}`} className="text-center"><h3>{post.title}</h3></Link>
      </Paper>
    </li>
  )
}

export default PostTile