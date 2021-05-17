import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setSnackOpen } from "../../slices/modalSlice"
import Snack from "./snack"

const withSnack = (WrappedComponent, prefix) => {
  return props => {
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const dispatch = useDispatch()
    const snackSuccess = msg => {
      dispatch(setSnackOpen(`${prefix}_success`))
      setSuccessMessage(() => msg)
    }

    const snackError = error => {
      dispatch(setSnackOpen(`${prefix}_error`))
      setErrorMessage(() => error?.message)
    }
    return (
      <>
        <WrappedComponent
          snackSuccess={snackSuccess}
          snackError={snackError}
          {...props}
        />
        <Snack
          name={`${prefix}_success`}
          severity="success"
          text={successMessage}
        />
        <Snack name={`${prefix}_error`} severity="error" text={errorMessage} />
      </>
    )
  }
}

export default withSnack
