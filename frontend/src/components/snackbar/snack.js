import { makeStyles, Snackbar } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSnackOpen } from "../../slices/modalSlice"

const useStyles = makeStyles(theme => ({
  success: {
    background: theme.palette.green,
    color: "#fff",
  },
  error: {
    background: theme.palette.red,
  },
}))
const Snack = ({ name, severity, text }) => {
  const classes = useStyles()
  const { snackOpen } = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setSnackOpen(""))
  }

  return (
    <Snackbar
      open={name === snackOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <MuiAlert
        classes={{
          filledSuccess: classes.success,
          filledError: classes.error,
        }}
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {text}
      </MuiAlert>
    </Snackbar>
  )
}

export default Snack
