import { useMutation, useQuery } from "@apollo/client"
import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import { AddCircle } from "@material-ui/icons"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CREATE_COUNTRY from "../../graphql/mutation/createCountry"
import COUNTRY_BY_SHORT_NAME from "../../graphql/query/countryByShortName"
import { changeActiveCountry } from "../../slices/leaderSlice"

import { setEditPanel } from "../../slices/mapSlice"
import AddPanel from "./addLeader"
import LeaderCard from "../leader/leaderCard"
import { resetForm } from "../../slices/formSlice"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: "3rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: "1.8rem",
  },
  subTitle: {
    margin: "1rem",
  },
  cards: {
    margin: "3rem 0rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  more: {
    margin: "2rem 0rem",
  },
  noLeader: {
    width: "100%",
    minHeight: "30vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}))
const EditPanel = ({ shortName, fullName }) => {
  const classes = useStyles()
  const { isEdit } = useSelector(state => state.map)
  const dispatch = useDispatch()
  const { data, loading, error } = useQuery(COUNTRY_BY_SHORT_NAME, {
    variables: {
      shortName: shortName,
    },
    onCompleted: data => {
      dispatch(
        changeActiveCountry({
          id: data?.countryByShortName?.id,
          fullName: data?.countryByShortName?.fullName,
        })
      )
    },
    fetchPolicy: "network-only",
  })

  const [createCountry] = useMutation(CREATE_COUNTRY, {
    onCompleted: data => {
      dispatch(
        changeActiveCountry({
          id: data?.createCountry?.id,
          fullName: data?.createCountry?.fullName,
        })
      )
    },
    onError: error => {
      console.log("error:", error)
    },
  })

  useEffect(() => {
    if (error?.message?.includes("Not found country with this shortname")) {
      createCountry({
        variables: {
          input: {
            shortName: shortName,
            fullName: fullName,
          },
        },
      })
    }
  }, [error])

  if (loading) {
    return <div>Loading</div>
  }

  const length = data?.countryByShortName?.leaders?.length

  const noLeader = () => {
    if (error || length === 0) {
      return true
    }
    return false
  }
  return (
    <Grid className={classes.root}>
      <Typography className={classes.title} variant="h3">
        {fullName}
      </Typography>
      {noLeader() &&
        (isEdit !== "set_edit_panel" ? (
          <div className={classes.noLeader}>
            <Typography className={classes.subTitle}>
              Sorry, but (yet) here are no leaders.{" "}
            </Typography>
            <div>
              <Button
                startIcon={<AddCircle />}
                color={"primary"}
                onClick={() => dispatch(setEditPanel("set_edit_panel"))}
              >
                Add Leader
              </Button>
            </div>
          </div>
        ) : (
          <AddPanel />
        ))}
      {!noLeader() &&
        (isEdit === "set_edit_panel" ? (
          <AddPanel />
        ) : (
          data && (
            <>
              <LeaderCard
                shortName={shortName}
                items={data.countryByShortName?.leaders}
                countryId={data?.countryByShortName?.id}
                fullName={fullName}
              />
              <div className={classes.more}>
                <Button
                  startIcon={<AddCircle />}
                  color={"primary"}
                  onClick={() => {
                    dispatch(resetForm())
                    dispatch(setEditPanel("set_edit_panel"))
                  }}
                >
                  Add more Leader
                </Button>
              </div>
            </>
          )
        ))}
    </Grid>
  )
}

export default EditPanel
