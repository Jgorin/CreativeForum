import React from "react"
import { Avatar, Typography, Card } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const UserProfileShowTile = (props) => {
  const { user } = props
  const classes = useStyles()
  
  return(
    <Card variant="outlined" className="profileTile">
      <h1>test</h1>
      <div className="inline grey">
        <Avatar src={user.avatar} className={classes.large}/>
        <Typography variant="h2">
          {user.username}
        </Typography>
      </div>
    </Card>
  )
}
export default UserProfileShowTile