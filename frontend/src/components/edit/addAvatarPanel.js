import { useMutation } from "@apollo/client"
import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core"
import { DeleteForever, PhotoCamera } from "@material-ui/icons"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ADD_AVATAR from "../../graphql/mutation/addAvatar"
import { nextActiveStep} from "../../slices/leaderSlice"
import UpdateBtn from "../update/updateButton"
import withSnack from "../snackbar/withSnack"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "2rem 0rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    // width: "750px",
  },
  input: {
    display: "none",
  },
  icon: {
    transition: "all .3s ease-in-out",
    "&:hover": {
      color: theme.palette.red,
    },
  },
  current: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    background: theme.palette.green,
  },
  group: {
    marginTop: "2rem",
  },
}))
const AddAvatarPanel = ({ snackSuccess, snackError }) => {
  const classes = useStyles()
  const [avatar, setAvatar] = useState(null)
  const dispatch = useDispatch()
  const { activeLeader } = useSelector(state => state.leader)

  const [addAvatar] = useMutation(ADD_AVATAR, {
    onCompleted: data => {
      snackSuccess(`You added avatar to ${activeLeader?.name} successfully!`)
      setTimeout(() => {
        dispatch(nextActiveStep())
      }, 2000)
    },
    onError: error => {
      snackError(error)
    },
  })

  return (
    <Grid className={classes.root}>
      <div className={classes.current}>
        {avatar ? (
          <>
            <Avatar
              className={classes.avatar}
              src={URL.createObjectURL(avatar)}
              aria-label="leader's avatar"
            />
            <IconButton onClick={() => setAvatar(() => null)}>
              <DeleteForever className={classes.icon} />
            </IconButton>
          </>
        ) : (
          <Avatar className={classes.avatar} />
        )}
      </div>
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
        <Tooltip title="Choose avatar">
          <IconButton aria-label="upload picture" component="span">
            <PhotoCamera className={classes.icon} fontSize="large" />
          </IconButton>
        </Tooltip>
      </label>

      <div className={classes.group}>
        {/* <UpdateBtn text="Back" onClick={() => dispatch(prevActiveStep())} /> */}
        <UpdateBtn text="Skip" onClick={() => dispatch(nextActiveStep())} />
        <UpdateBtn
          text="Upload"
          disabled={!avatar}
          onClick={() => {
            addAvatar({
              variables: {
                id: activeLeader?.id,
                avatar: avatar,
              },
            })
          }}
        />
      </div>
    </Grid>
  )
}

export default withSnack(AddAvatarPanel, "add_avatar_to_leader")
