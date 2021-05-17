import { useMutation } from "@apollo/client"
import { Button, CardContent, makeStyles } from "@material-ui/core"
import { HighlightOff } from "@material-ui/icons"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DELETE_BADGE_FROM_LEADER from "../../graphql/mutation/deleteBadgeFromLeader"
import { toggleBadges } from "../../slices/leaderSlice"
import { setModalOpen, setSnackOpen } from "../../slices/modalSlice"
import Snack from "../snackbar/snack"
import LeaderChip from "./leaderChip"

const useStyles = makeStyles(theme => ({
  chip: {
    margin: ".5rem .6rem",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  chips: {
    margin: ".5rem 0rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    color: theme.palette.blue,
  },
}))

const BadgesContent = ({ items, leader, leaderId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [text, setText] = useState()
  const { badges } = useSelector(state => state.leader)
  const [deleteBadgeFromLeader] = useMutation(DELETE_BADGE_FROM_LEADER, {
    onCompleted: data => {
      dispatch(setSnackOpen("badge_delete_success"))
      const filteredBadges = badges?.items?.filter(
        item => item?.id !== data?.deleteBadgeFromLeader?.id
      )
      dispatch(
        toggleBadges({
          ...badges,
          items: filteredBadges,
        })
      )
    },
    onError: error => {
      setText(() => error.message)
      dispatch(setSnackOpen("badge_delete_error"))
    },
  })
  return (
    <>
      <CardContent className={classes.content}>
        <div className={classes.chips}>
          {items?.map(badge => {
            return (
              <LeaderChip
                className={classes.chip}
                key={`badge${badge?.id}`}
                color="primary"
                label={badge?.label}
                icon={<HighlightOff />}
                onDelete={() => {
                  deleteBadgeFromLeader({
                    variables: {
                      input: {
                        childId: badge?.id,
                        leaderId: leaderId,
                      },
                    },
                  })
                }}
              />
            )
          })}
        </div>
        <Button
          onClick={() => dispatch(setModalOpen(`leader_modal_${leader}`))}
        >
          Add badge
        </Button>
      </CardContent>
      <Snack
        name="badge_delete_success"
        severity="success"
        text={`You deleted badge from ${leader} successfully!`}
      />
      <Snack name="badge_delete_error" severity="error" text={text} />
    </>
  )
}

export default BadgesContent
