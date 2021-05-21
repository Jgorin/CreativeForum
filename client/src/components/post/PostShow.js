import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchPost } from "../../services/PostFetches"

const initialState = {
  title: null,
  user: {
    id: null,
    email: null
  },
  body: null
}

const PostShow = (props) => {
  const [post, setPost] = useState(initialState)

  const fetchPostWrapper = async() => {
    const postId = props.match.params.id
    const response = await fetchPost(postId)
    setPost(response.post)
  }

  useEffect(() => {
    fetchPostWrapper()
  }, [])
  
  return(
    <div>
      <h1 className="text-center">
        <p>
          {`${post.title} - by:`} <Link to={`/users/${post.user.id}`}>{post.user.email}</Link>
        </p>
      </h1>
      <p>
        {post.body}
      </p>
    </div>
  )
}

export default PostShow