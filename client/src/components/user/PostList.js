import React from "react"
import PostTile from "./PostTile"

const PostList = (props) => {
  const { posts } = props

  const postsList = posts.map((post) => {
    return(
      <PostTile post={post} key={post.id}/>
    )
  })

  return(
    <ul style={{listStyleType: 'none', width: "75%"}} className="centered">
      {postsList}
    </ul>
  )
}

export default PostList