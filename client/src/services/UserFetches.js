import { GET, PATCH } from "./Fetch"

export const fetchUser = (userId) => {
  return GET(`/users/${userId}`)
}

export const editUserBackdrop = (userId, payload) => {
  let backdropInfo = new FormData()
  for(const [key, value] of Object.entries(payload)){
    backdropInfo.append(key, value)
  }
  return PATCH(`/users/${userId}/backdrop`, backdropInfo)
}