import { useMutation } from "@apollo/client"
import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
} from "@material-ui/core"
import { DeleteForever, PhotoCamera } from "@material-ui/icons"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ADD_AVATAR from "../../graphql/mutation/addAvatar"
import DELETE_AVATAR from "../../graphql/mutation/deleteAvatar"
import { nextActiveStep, prevActiveStep } from "../../slices/leaderSlice"

import withSnack from "../snackbar/withSnack"
import UpdateBtn from "./updateButton"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "2rem 0rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  btnGroup: {
    margin: "2.5rem 0rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  btn: {
    margin: "0rem .7rem",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  current: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
  },
  contained: {
    transition: "all .3s ease-in",
    "&:hover": {
      background: theme.palette.blue,
    },
  },
  input: {
    display: "none",
    marginTop: "2rem ",
  },
  icon: {
    transition: "all .3s ease-in-out",
    "&:hover": {
      color: theme.palette.red,
    },
  },
}))
const UpdateAvatarPanel = ({ snackSuccess, snackError }) => {
  const classes = useStyles()
  const [avatar, setAvatar] = useState(null)
  const dispatch = useDispatch()
  const { form } = useSelector(state => state.form)

  const [updateAvatar] = useMutation(ADD_AVATAR, {
    onCompleted: data => {
      snackSuccess(`You updated avatar of ${form?.name} successfully!`)
      setTimeout(() => {
        dispatch(nextActiveStep())
      }, 2000)
    },
    onError: error => {
      snackError(error)
    },
  })

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    onCompleted: data => {
      snackSuccess(`You deleted avatar from ${form?.name} successfully!`)
    },
    onError: error => {
      snackError(error)
    },
  })

  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper} variant="outlined">
        {avatar ? (
          <div className={classes.current}>
            <Avatar
              className={classes.avatar}
              src={URL.createObjectURL(avatar)}
              aria-label="leader's avatar"
            />
          </div>
        ) : (
          <div className={classes.current}>
            <Avatar
              className={classes.avatar}
              src={`data:image/jpg;base64,${form?.avatar}`}
              aria-label="leader's avatar"
            />
            {form?.avatar && (
              <Tooltip title="Delete avatar">
                <IconButton
                  onClick={() => {
                    deleteAvatar({
                      variables: {
                        id: form?.id,
                      },
                    })
                  }}
                >
                  <DeleteForever color="primary" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        )}
      </Paper>
      <input
        accept=".jpg"
        className={classes.input}
        id="avatar"
        type="file"
        onChange={e => {
          setAvatar(() => e.target.files[0])
        }}
      />
      <label htmlFor="avatar">
        <Tooltip title="Choose new avatar">
          <IconButton aria-label="upload picture" component="span">
            <PhotoCamera className={classes.icon} fontSize="large" />
          </IconButton>
        </Tooltip>
      </label>
      <div className={classes.btnGroup}>
        <UpdateBtn text="Back" onClick={() => dispatch(prevActiveStep())} />
        <UpdateBtn text="Skip" onClick={() => dispatch(nextActiveStep())} />
        <UpdateBtn
          text=" Upload"
          onClick={() => {
            updateAvatar({
              variables: {
                id: form?.id,
                avatar: avatar,
              },
            })
          }}
        />
      </div>
    </Grid>
  )
}

export default withSnack(UpdateAvatarPanel, "update_avatar_to_leader")
