import { useMutation, useQuery } from "@apollo/client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ADD_BADGE_TO_LEADER from "../../graphql/mutation/addBadgeToLeader"
import ALL_BADGES from "../../graphql/query/badges"
import { toggleBadges } from "../../slices/leaderSlice"
import { setModalOpen, setSnackOpen } from "../../slices/modalSlice"
import Snack from "../snackbar/snack"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  dialog: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
}))
const LeaderModal = ({ leaderId, leader }) => {
  const classes = useStyles()
  const { isOpen } = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const [targetBadge, setTargetBadge] = useState()
  const { badges } = useSelector(state => state.leader)
  const onClose = () => {
    dispatch(setModalOpen(""))
  }

  const handleChange = event => {
    setTargetBadge(event?.target?.value)
  }
  const { data: badgeData } = useQuery(ALL_BADGES)

  const [addBadgeToLeader] = useMutation(ADD_BADGE_TO_LEADER, {
    onCompleted: data => {
      dispatch(setSnackOpen(`badge_modal_success_${leader}`))
      dispatch(setModalOpen(""))
      const item = badgeData?.badges.filter(it => it?.id === targetBadge)
      const items = [...badges?.items, item[0]]
      dispatch(
        toggleBadges({
          ...badges,
          items: items,
        })
      )
    },
    onError: error => {
      setText(() => error.message)
      dispatch(setSnackOpen(`badge_modal_error_${leader}`))
    },
  })

  return (
    <>
      <Dialog
        className={classes.dialog}
        open={isOpen === `leader_modal_${leader}`}
        onClose={onClose}
      >
        <DialogTitle>Add badge from list</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="badge-select">Badge</InputLabel>
            <Select
              fullWidth
              native
              onChange={handleChange}
              label="Badge"
              value={targetBadge}
              inputProps={{
                name: "badge",
                id: "badge-select",
              }}
            >
              <option aria-label="None" value="" />
              {badgeData &&
                badgeData?.badges.map(badge => {
                  return (
                    <option key={badge?.id} value={badge?.id}>
                      {badge?.label}
                    </option>
                  )
                })}
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                addBadgeToLeader({
                  variables: {
                    input: {
                      childId: targetBadge,
                      leaderId: leaderId,
                    },
                  },
                })
              }}
            >
              Add badge to leader
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snack
        name={`badge_modal_success_${leader}`}
        severity="success"
        text={`You added badge to ${leader} successfully!`}
      />
      <Snack
        name={`badge_modal_error_${leader}`}
        severity="error"
        text={text}
      />
    </>
  )
}

export default LeaderModal
