import { useMutation, useQuery } from "@apollo/client"
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core"
import { AddCircle } from "@material-ui/icons"
import React, { useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { useDispatch, useSelector } from "react-redux"
import ADD_COUNTRY_TO_LEADER from "../../graphql/mutation/addCountryToLeader"
import DELETE_LEADER from "../../graphql/mutation/deleteLeader"
import ALL_COUNTRIES from "../../graphql/query/countries"
import LEADERS_WITHOUT_BADGES from "../../graphql/query/leaderWithoutBadges"
import { setTargetCountry } from "../../slices/mapSlice"
import { setModalOpen } from "../../slices/modalSlice"
import { ProcessType } from "../../utils/process"
import withSnack from "../snackbar/withSnack"

const useStyles = makeStyles(theme => ({
  root: {
    // minWidth: 450,
    // margin: "3rem 0rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    width: 300,
    marginTop: "2rem",
    background: theme.palette.secondary.main,
    [theme.breakpoints.down(400)]: {
      width: 250,
    },
    [theme.breakpoints.down(350)]: {
      width: 225,
    },
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  avatar: {
    background: theme.palette.blue,
  },
  actions: {
    background: theme.palette.primary.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    margin: "2rem 0rem",
    transition: "all .3s ease-in-out",
    "&:hover": {
      // color: theme.palette.primary.main,
      background: theme.palette.primary.light,
    },
  },
  formControl: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
}))
const AllLeaders = ({ snackSuccess, snackError }) => {
  const classes = useStyles()
  const { isOpen } = useSelector(state => state.modal)
  const [collapse, setCollapse] = useState("")
  const [countryId, setCountryId] = useState([])
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(setModalOpen(""))
  }
  const { data, refetch } = useQuery(LEADERS_WITHOUT_BADGES, {
    fetchPolicy: "network-only",
  })
  const { data: countriesData } = useQuery(ALL_COUNTRIES, {
    fetchPolicy: "network-only",
  })
  const [deleteLeader] = useMutation(DELETE_LEADER, {
    onCompleted: data => {
      snackSuccess(`${data?.deleteLeader?.name} deleted successfully!`)
    },
    onError: error => {
      snackError(error)
    },
  })

  const [addCountryToLeader] = useMutation(ADD_COUNTRY_TO_LEADER, {
    onCompleted: data => {
      refetch()
    },
    onError: error => {
      snackError(error)
    },
  })

  const handleChange = event => {
    const value = event.target.value.split(",")
    setCountryId(value)
  }

  const handleCollapse = leader => {
    if (collapse === leader?.name) {
      setCollapse("")
    } else {
      setCollapse(leader?.name)
    }
  }

  return (
    <Dialog open={isOpen === "modal_leaders_open"} onClose={handleClose}>
      <Grid className={classes.root}>
        {data &&
          data?.leaders?.map(leader => (
            <Card
              key={`all_leader_without_badge_${leader?.id}`}
              className={classes.card}
            >
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.avatar}
                    src={`data:image/jpg;base64,${leader?.avatar}`}
                    aria-label="leader's avatar"
                  />
                }
                title={leader?.name}
                subheader={leader?.timeInterval}
              />
              <CardContent className={classes.list}>
                {leader?.countries?.length > 0 ? (
                  <>
                    {leader?.countries?.map(country => (
                      <ReactCountryFlag
                        key={`all_leaders_country${country?.id}`}
                        style={{
                          width: "1.75rem",
                          height: "1.75rem",
                          margin: ".8rem",
                        }}
                        countryCode={country.shortName}
                        svg
                      />
                    ))}
                    <Tooltip title="Add to country">
                      <IconButton onClick={() => handleCollapse(leader)}>
                        <AddCircle />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Typography variant="body2">Without country </Typography>
                    <Tooltip title="Add to country">
                      <IconButton onClick={() => handleCollapse(leader)}>
                        <AddCircle />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </CardContent>
              <Collapse in={collapse === leader?.name}>
                <CardContent>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="country-select">Country</InputLabel>
                    <Select
                      fullWidth
                      native
                      onChange={handleChange}
                      label="Country"
                      value={countryId.join(",")}
                      inputProps={{
                        name: "country",
                        id: "country-select",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {countriesData &&
                        countriesData?.countries.map(cc => {
                          return (
                            <option key={cc?.id} value={[cc?.id, cc?.fullName]}>
                              {cc?.fullName}
                            </option>
                          )
                        })}
                    </Select>
                    <Button
                      onClick={() => {
                        addCountryToLeader({
                          variables: {
                            input: {
                              childId: countryId[0],
                              leaderId: leader?.id,
                            },
                            refetchQueries: [
                              {
                                query: LEADERS_WITHOUT_BADGES,
                              },
                            ],
                          },
                        })
                        dispatch(
                          setTargetCountry({
                            id: countryId[0],
                            countryName: countryId[1],
                            processType: ProcessType.ADD,
                          })
                        )
                      }}
                      className={classes.btn}
                    >
                      Add
                    </Button>
                  </FormControl>
                </CardContent>
              </Collapse>
              <CardActions className={classes.actions}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    deleteLeader({
                      variables: {
                        id: leader?.id,
                      },
                      refetchQueries: [
                        {
                          query: LEADERS_WITHOUT_BADGES,
                        },
                      ],
                    })
                    dispatch(
                      setTargetCountry({
                        countries: leader?.countries,
                        processType: ProcessType.DELETE_ALL,
                      })
                    )
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Grid>
    </Dialog>
  )
}

export default withSnack(AllLeaders, "delete_leader_all")
