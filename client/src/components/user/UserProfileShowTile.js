import React, { useState } from "react"
import { Avatar, Typography, Paper, makeStyles, IconButton } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import EditBackdropForm from "./EditBackdropForm"
import MaterialModal from "../utilities/MaterialModal"

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const UserProfileShowTile = (props) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = props
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let userBackdrop 
  let userAvatar
  if(user.backdrop != null){
    userBackdrop = <img src={user.backdrop.Location} className="backdrop not-clickable"/>
  }
  if(user.avatar != null){
    userAvatar = <Avatar src={user.avatar.Location} className={`${classes.large} avatar not-clickable`}/>
  }
  
  return(
    <div>
      <Paper className="profileCard" elevation={3}>
        {userBackdrop}
        <div className="inline flex">
          <h4 className="description">Intro here...</h4>
          <div className="left">            
            <IconButton className={classes.menuButton} className="background-black" color="inherit" aria-label="menu" onClick={handleOpen}>
              <EditIcon/>
            </IconButton>
            <MaterialModal open={open} handleClose={handleClose}>
              <EditBackdropForm handleClose={handleClose} user={user} setUser={setUser}/>
            </MaterialModal>
          </div>
        </div>
        <div className="inline grey profileBar">
          {userAvatar}
          <Typography variant="h4" className="name">
            {user.username}
          </Typography>
        </div>
      </Paper>
    </div>
  )
}
export default UserProfileShowTile