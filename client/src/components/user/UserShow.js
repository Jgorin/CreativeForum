import React, { useState, useEffect } from "react"
import { fetchUser } from "../../services/UserFetches"
import PostList from "./PostList"
import UserProfileShowTile from "./UserProfileShowTile"

const initialState = {
  id: null,
  email: null,
  posts: [],
  isCurrentUser: false
}

const UserShow = (props) => {
  const[user, setUser] = useState(initialState)
  const[errors, setErrors] = useState(null)
  const { currentUser } = props

  const fetchUserWrapper = async() => {
    const userId = props.match.params.id
    const response = await fetchUser(userId)
    if(response.user != null){
      debugger
      let isCurrentUser = false
      if(currentUser != null && response.user.id == currentUser.id){
        isCurrentUser = true
      }
      setUser({...response.user,
        ["isCurrentUser"]: isCurrentUser
      })
    }
    else{
      setErrors(<h1 className="text-center">{response.errors}</h1>)
    }
  }

  useEffect(() => {
    fetchUserWrapper()
  }, [])

  return(
    <div>
      {errors}
      <div className="profileTile">
        <UserProfileShowTile user={user} setUser={setUser}/>
      </div>
      <PostList posts={user.posts}/>
    </div>
  )
}

export default UserShow