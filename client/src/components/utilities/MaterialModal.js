import React from "react"
import { Modal, makeStyles, Backdrop, Fade } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const MaterialModal = (props) => {
  const { open, handleClose } = props
  const classes = useStyles()

  return(
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
        {props.children}
      </Fade>
    </Modal> 
  )
}

export default MaterialModal