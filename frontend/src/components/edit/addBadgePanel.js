import { useMutation, useQuery } from "@apollo/client"
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import { AddCircle } from "@material-ui/icons"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ADD_BADGE_TO_LEADER from "../../graphql/mutation/addBadgeToLeader"
import ALL_BADGES from "../../graphql/query/badges"
import { resetActiveLeader, resetActiveStep } from "../../slices/leaderSlice"
import { setEditPanel } from "../../slices/mapSlice"
import { setModalOpen } from "../../slices/modalSlice"
import LeaderChip from "../leader/leaderChip"
import withSnack from "../snackbar/withSnack"
import CreateBadgeModal from "./createBadge"

const useStyles = makeStyles(() => ({
  root: {
    margin: "3rem 0rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  
  },
  badges: {
    width: "100%",
    margin: "1rem 0rem",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    flexWrap: "wrap",
  },
  chip: {
    margin: ".3rem .3rem",
  },
}))
const AddBadgePanel = ({ snackSuccess, snackError }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [badges, setBadges] = useState(null)

   useQuery(ALL_BADGES, {
    onCompleted: data => {
      setBadges(data?.badges)
    },
  })

  const { activeLeader } = useSelector(state => state.leader)

  const [addBadge] = useMutation(ADD_BADGE_TO_LEADER, {
    onCompleted: data => {
      snackSuccess(`You added badge to ${activeLeader?.name} successfully!`)
    },
    onError: error => {
      snackError(error)
    },
  })

  const addToLeader = badgeId => {
    addBadge({
      variables: {
        input: {
          childId: badgeId,
          leaderId: activeLeader.id,
        },
      },
    })
  }

  

  return (
    <Grid className={classes.root}>
      <Paper className={classes.badges}>
        {badges &&
          badges?.map(badge => {
            return (
              <LeaderChip
                key={badge.id}
                label={badge?.label}
                onDelete={() => {
                  addToLeader(badge?.id)
                  const filteredBadges = badges.filter(
                    item => item?.id !== badge?.id
                  )
                  setBadges(filteredBadges)
                }}
                icon={<AddCircle />}
              />
            )
          })}
        {badges?.length === 0 && (
          <Typography variant="body1">No more badge</Typography>
        )}
      </Paper>
      <div className={classes.root}>
        <Typography>
          If you can't find the right badge, you can create one.
        </Typography>
        <Button onClick={() => dispatch(setModalOpen("badge_dialog"))}>
          Add new badge
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            dispatch(resetActiveStep())
            dispatch(resetActiveLeader())
            dispatch(setEditPanel(""))
          }}
        >
          Return to the leaders
        </Button>
      </div>
      <CreateBadgeModal />
    </Grid>
  )
}

export default withSnack(AddBadgePanel, "add_badge_to_leader")
