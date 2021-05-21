import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const TopBar = ({ user }) => {


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const unauthenticatedListItems = 
  [
    <MenuItem onClick={handleClose} key="1">
      <Link to="/user-sessions/new">Sign In</Link>
    </MenuItem>,
    <MenuItem onClick={handleClose} key="2">
      <Link to="/users/new">
        Sign Up
      </Link>
    </MenuItem>
  ]

  const authenticatedListItems = 
  [
    <MenuItem onClick={handleClose} key="3">
      <Link to={`/users/${user ? user.id : null}`}>{user ? user.email : null}</Link>
    </MenuItem>,
    <MenuItem onClick={handleClose} key="4">
      <SignOutButton key="idk"/>
    </MenuItem>
  ]

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            <Link to="/" className="white">CreativeForum</Link>
          </Typography>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon/>
          </IconButton>       
          <Menu         
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user ? authenticatedListItems : unauthenticatedListItems}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
