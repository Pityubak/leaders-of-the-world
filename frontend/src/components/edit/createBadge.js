import { useMutation } from "@apollo/client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CREATE_BADGE from "../../graphql/mutation/createBadge"
import { setModalOpen } from "../../slices/modalSlice"
import withSnack from "../snackbar/withSnack"




const CreateBadgeModal = ({ snackSuccess, snackError }) => {
  const { isOpen } = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(setModalOpen(""))
  }

  const [label, setLabel] = useState()

  const [createBadge] = useMutation(CREATE_BADGE, {
    onCompleted: data => {
      snackSuccess("You created badge successfully!")
      handleClose()
    },
    onError: error => {
      snackError(error)
    },
  })

  const handleSubmit = event => {
    event.preventDefault()

    createBadge({
      variables: {
        label: label,
      },
    })
  }

  return (
    <Dialog
      open={isOpen === "badge_dialog"}
      onClose={handleClose}
    >
      <DialogTitle>Create new badge</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="label"
          label="Badge's label"
          type="text"
          fullWidth
          onChange={e => setLabel(() => e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withSnack(CreateBadgeModal, "badge_creation")
