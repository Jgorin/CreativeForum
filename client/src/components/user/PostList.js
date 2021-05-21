import React from "react"
import { Link } from "react-router-dom"
import { Card } from "@material-ui/core"

const PostList = (props) => {
  const { posts } = props

  const postsList = posts.map((post) => {
    return(
      <li key={post.id}>
        <Card style={{padding: "20px", minHeight: "100px", margin: "25px"}}>
          <Link to={`/posts/${post.id}`} className="text-center"><h3>{post.title}</h3></Link>
        </Card>
      </li>
    )
  })

  return(
    <ul style={{listStyleType: 'none'}} className="centered">
      {postsList}
    </ul>
  )
}

export default PostList