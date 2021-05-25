import React, { useState } from "react"
import { Button, Card } from "@material-ui/core"
import { editUserBackdrop } from "../../services/UserFetches"

const initialState = {
  file: null,
  fileName: null
}

const EditBackdropForm = React.forwardRef((props, ref) => {
  const[payload, setPayload] = useState(initialState)
  const[image, setImage] = useState(null)
  const[errors, setErrors] = useState(null)
  const { handleClose, user, setUser } = props

  const handleChange = (event) => {
    const file = event.currentTarget.files[0]
    setPayload({
      file: file,
      fileName: file.name
    })
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

  return(
    <Card className="modal">
      <form>
        <h1>Edit Backdrop</h1>
        <label>
          backdrop image
          <input type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
        </label>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button>
      </form>
    </Card>
  )
})

export default EditBackdropForm