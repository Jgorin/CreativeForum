import React, { useState } from "react"
import { Button, Paper } from "@material-ui/core"
import { editUserBackdrop } from "../../services/UserFetches"
import ReactCrop from "react-image-crop"
import 'react-image-crop/lib/ReactCrop.scss';

const initialState = {
  file: null,
  fileName: null
}

const EditBackdropForm = React.forwardRef((props, ref) => {
  const[payload, setPayload] = useState(initialState)
  const[image, setImage] = useState(null)
  const[crop, setCrop] = useState({ aspect: 16/9, width: 1330, unit: "px", x: 0, y: 0 })
  const { handleClose, user, setUser } = props

  const handleChange = (event) => {
    const file = event.currentTarget.files[0]
    setPayload({
      file: file,
      fileName: file.name
    })
    setImage(URL.createObjectURL(file))
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    const response = await editUserBackdrop(user.id, payload)
    console.log(response)
    setUser({
      ...user,
      ["backdrop"]: response.backdrop
    })
    handleClose()
  }

  let previewImage = null
  if(image != null) {
    previewImage = <img src={image} className="previewImage"/>
  }

  const handleOnCrop = (crop) => {
    console.log(crop)
    setCrop(crop)
  }

  return(
    <Paper className="modal editBackdropForm" elevation={5}>
      <form>
        <h1>Edit Backdrop</h1>
        <label>
          backdrop image
          <input type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
        </label>
        <ReactCrop src={image} crop={crop} onChange={handleOnCrop}/>
        {/* <div className="bordered">
          {previewImage}
        </div> */}
        <Button variant="contained" color="secondary" style={{marginTop: "15px"}} onClick={handleSubmit}>Submit</Button>
      </form>
    </Paper>
  )
})

export default EditBackdropForm