import { useMutation } from "@apollo/client"
import {  makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CREATE_LEADER from "../../graphql/mutation/createLeader"
import LEADERS_WITHOUT_BADGES from "../../graphql/query/leaderWithoutBadges"
import { resetForm } from "../../slices/formSlice"
import { changeActiveLeader, nextActiveStep } from "../../slices/leaderSlice"
import { setEditPanel } from "../../slices/mapSlice"
import withSnack from "../snackbar/withSnack"
import LeaderForm from "../template/leaderForm"
import UpdateBtn from "../update/updateButton"

const useStyles = makeStyles(theme => ({
  buttons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}))

const CreateLeaderPanel = ({ snackSuccess, snackError }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(true)
  const { form } = useSelector(state => state.form)

  const [createLeader] = useMutation(CREATE_LEADER, {
    onCompleted: data => {
      dispatch(
        changeActiveLeader({
          id: data?.createLeader?.id,
          name: data?.createLeader?.name,
        })
      )
      snackSuccess("You created leader successfully!")
      setTimeout(() => {
        dispatch(nextActiveStep())
      }, 2000)
    },
    onError: error => {
      snackError(error)
    },
  })

  useEffect(() => {
    if (form?.name?.length > 3 && form?.description?.length > 19) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [form?.name, form?.description])

  const onSubmit = event => {
    event.preventDefault()

    createLeader({
      variables: {
        input: {
          name: form.name,
          timeInterval: `${new Date(form?.startDate).getFullYear()}-${new Date(
            form?.endDate
          ).getFullYear()}`,
          description: form?.description,
        },
      },
      refetchQueries: [
        {
          query: LEADERS_WITHOUT_BADGES,
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
            dispatch(setEditPanel(false))
            dispatch(resetForm())
          }}
        />
        <UpdateBtn text="Create" disabled={disabled} onClick={onSubmit} />
      </div>
    </LeaderForm>
  )
}

export default withSnack(CreateLeaderPanel, "leader_creation")
