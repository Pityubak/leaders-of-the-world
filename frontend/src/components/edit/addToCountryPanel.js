import { useMutation } from "@apollo/client"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ADD_COUNTRY_TO_LEADER from "../../graphql/mutation/addCountryToLeader"
import COUNTRIES_BY_LEADERS_COUNT from "../../graphql/query/countriesByLeaderCount"
import { nextActiveStep } from "../../slices/leaderSlice"
import { setTargetCountry } from "../../slices/mapSlice"
import { ProcessType } from "../../utils/process"
import withSnack from "../snackbar/withSnack"
import UpdateBtn from "../update/updateButton"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "2rem 0rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  group: {
    margin: "2rem 0rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  hightlight: {
    color: theme.palette.green,
  },
}))
const AddToCountryPanel = ({ snackSuccess, snackError }) => {
  const classes = useStyles()
  const { activeCountry, activeLeader } = useSelector(state => state.leader)
  const dispatch = useDispatch()

  const [addToCountry] = useMutation(ADD_COUNTRY_TO_LEADER, {
    onCompleted: data => {
      snackSuccess(
        `You added ${activeLeader?.name} to ${activeCountry?.fullName} successfully!`
      )
      setTimeout(() => {
        dispatch(nextActiveStep())
      }, 2000)
      dispatch(
        setTargetCountry({
          id: activeCountry?.id,
          countryName: activeCountry?.fullName,
          processType: ProcessType.ADD,
        })
      )
    },

    onError: error => {
      snackError(error)
    },

  })

  return (
    <Grid className={classes.root}>
      <Typography variant="h5">
        Would you like to add{" "}
        <strong className={classes.hightlight}>{activeLeader.name}</strong> to{" "}
        <strong className={classes.hightlight}>{activeCountry.fullName}</strong>{" "}
        ?
      </Typography>
      <Typography variant="body2">
        Note: You can add a country to the leader later.
      </Typography>
      <div className={classes.group}>
        <UpdateBtn text="Skip" onClick={() => dispatch(nextActiveStep())} />
        <UpdateBtn
          text="Yes"
          onClick={() => {
            addToCountry({
              variables: {
                input: {
                  childId: activeCountry.id,
                  leaderId: activeLeader.id,
                },
              },
              refetchQueries: [
                {
                  query: COUNTRIES_BY_LEADERS_COUNT,
                },
              ],
              awaitRefetchQueries: true,
            })
          }}
        />
      </div>
    </Grid>
  )
}

export default withSnack(AddToCountryPanel, "add_country_to_leader")
