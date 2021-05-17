import { Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetForm } from "../../slices/formSlice"
import { resetActiveStep } from "../../slices/leaderSlice"
import { setModalOpen } from "../../slices/modalSlice"
import UpdateLeaderPanel from "./updateLeader"

const UpdateLeaderDialog = ({ leader, shortName }) => {
  const { isOpen } = useSelector(state => state.modal)
  const handleClose = () => {
    dispatch(setModalOpen(""))
    dispatch(resetActiveStep())
    dispatch(resetForm())
  }
  const dispatch = useDispatch()

  return (
    <Dialog
      maxWidth={"lg"}
      open={isOpen === `update_leader_${leader}`}
      onClose={handleClose}
    >
      <DialogTitle>{leader} </DialogTitle>
      <DialogContent>
        <UpdateLeaderPanel shortName={shortName} />
      </DialogContent>
    </Dialog>
  )
}

export default UpdateLeaderDialog
