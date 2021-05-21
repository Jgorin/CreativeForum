import { GET } from "./Fetch"

export const fetchPost = (postId) => {
  return GET(`/posts/${postId}`)
}