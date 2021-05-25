import React, { useState, useEffect } from "react"
import { fetchUser } from "../../services/UserFetches"
import PostList from "./PostList"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import UserProfileShowTile from "./UserProfileShowTile"

const initialState = {
  id: null,
  email: null,
  posts: []
}

const UserShow = (props) => {
  const[user, setUser] = useState(initialState)
  const[errors, setErrors] = useState(null)

  const fetchUserWrapper = async() => {
    const userId = props.match.params.id
    const response = await fetchUser(userId)
    if(response.user != null){
      debugger
      setUser(response.user)
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
      <Fab color="primary" aria-label="add" className="centered">
        <AddIcon/>
      </Fab>
    </div>
  )
}

export default UserShow