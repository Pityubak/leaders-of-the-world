import { useMutation } from "@apollo/client"
import { makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import UPDATE_LEADER from "../../graphql/mutation/updateLeader"
import COUNTRY_BY_SHORT_NAME from "../../graphql/query/countryByShortName"
import { resetForm } from "../../slices/formSlice"
import { nextActiveStep } from "../../slices/leaderSlice"
import { setModalOpen } from "../../slices/modalSlice"
import withSnack from "../snackbar/withSnack"
import LeaderForm from "../template/leaderForm"
import UpdateBtn from "./updateButton"

const useStyles = makeStyles(theme => ({
  buttons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}))

const UpdateLeaderForm = ({ snackSuccess, snackError, shortName }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(true)
  const { form } = useSelector(state => state.form)
  useEffect(() => {
    if (form?.name?.length > 3 && form?.description?.length > 20) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [form?.name, form?.description])

  const [createLeader] = useMutation(UPDATE_LEADER, {
    onCompleted: data => {
      snackSuccess("You updated leader successfully!")
      setTimeout(() => {
        dispatch(nextActiveStep())
      }, 2000)
    },
    onError: error => {
      snackError(error)
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    createLeader({
      variables: {
        input: {
          id: form.id,
          name: form.name,
          timeInterval: `${new Date(form?.startDate).getFullYear()}-${new Date(
            form?.endDate
          ).getFullYear()}`,
          description: form?.description,
        },
      },
      refetchQueries: [
        {
          query: COUNTRY_BY_SHORT_NAME,
          variables: {
            shortName: shortName,
          },
        },
      ],
    })
  }
  return (
    <LeaderForm>
      <div className={classes.buttons}>
        <UpdateBtn
          text="Cancel"
          onClick={() => {
            dispatch(setModalOpen(""))
            dispatch(resetForm())
          }}
        />
        <UpdateBtn text="Skip" onClick={() => dispatch(nextActiveStep())} />
        <UpdateBtn text="Update" disabled={disabled} onClick={onSubmit} />
      </div>
    </LeaderForm>
  )
}

export default withSnack(UpdateLeaderForm, "leader_update")
