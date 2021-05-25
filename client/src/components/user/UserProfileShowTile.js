import React, { useState } from "react"
import { Avatar, Typography, Card, Modal, Backdrop, Fade } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton} from "@material-ui/core"
import EditBackdropForm from "./EditBackdropForm"

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const UserProfileShowTile = (props) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = props
  const classes = useStyles()
  console.log(user.avatar)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let userBackdrop 
  let userAvatar
  if(user.backdrop != null){
    userBackdrop = <img src={user.backdrop.Location} className="backdrop"/>
  }
  if(user.avatar != null){
    userAvatar = <Avatar src={user.avatar.Location} className={`${classes.large} avatar`}/>
  }
  
  return(
    <div>
      <Card variant="outlined" className="profileCard">
        {userBackdrop}
        <div className="inline flex">
          <h4 className="description">Intro here...</h4>
          <div className="left">
            <IconButton className={classes.menuButton} className="background-black" color="inherit" aria-label="menu" onClick={handleOpen}>
              <EditIcon/>
            </IconButton> 
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <EditBackdropForm handleClose={handleClose} user={user} setUser={setUser}/>
              </Fade>
            </Modal> 
          </div>
        </div>
        <div className="inline grey profileBar">
          {userAvatar}
          <Typography variant="h4" className="name">
            {user.username}
          </Typography>
        </div>
      </Card>
    </div>
  )
}
export default UserProfileShowTile