import { GET } from "./Fetch"

export const fetchUser = (userId) => {
  return GET(`/users/${userId}`)
}