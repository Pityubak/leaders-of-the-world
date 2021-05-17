import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  Tooltip,
} from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactCountryFlag from "react-country-flag"
import { useMutation, useQuery } from "@apollo/client"
import ALL_COUNTRIES from "../../graphql/query/countries"
import { AddCircle, DeleteForever } from "@material-ui/icons"
import withSnack from "../snackbar/withSnack"
import DELETE_COUNTRY_FROM_LEADER from "../../graphql/mutation/deleteCountryFromLeader"
import ADD_COUNTRY_TO_LEADER from "../../graphql/mutation/addCountryToLeader"
import { prevActiveStep, resetActiveStep } from "../../slices/leaderSlice"
import UpdateBtn from "./updateButton"
import { setModalOpen } from "../../slices/modalSlice"
import { updateForm } from "../../slices/formSlice"
import { setTargetCountry } from "../../slices/mapSlice"
import { ProcessType } from "../../utils/process"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  paper: {
    padding: ".8rem",
    background: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    margin: ".3rem",
  },
  btn: {
    color: theme.palette.primary.main,
    marginLeft: ".6rem",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "1rem 0rem",
  },
  group: {
    margin: "2rem 0rem",
    display: "flex",
    alignItems: "center",
  },
  select: {
    minWidth: 300,
    [theme.breakpoints.down(500)]: {
      minWidth: 200,
    },
  },
}))
const UpdateCountryPanel = ({ snackSuccess, snackError }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState([])
  const [countries, setCountries] = useState([])

  const handleChange = event => {
    const value = event?.target?.value
    const target = countries?.filter(country => country?.id === value)

    setCountries(() => countries?.filter(country => country?.id !== value))
    setSelected([...selected, target])
  }

  const [deleteCountryFromLeader] = useMutation(DELETE_COUNTRY_FROM_LEADER, {
    onCompleted: data => {
      snackSuccess(`You deleted country from ${form?.name} successfully!`)
    },
    onError: error => {
      snackError(error)
    },
  })

  const [addCountryToLeader] = useMutation(ADD_COUNTRY_TO_LEADER, {
    onCompleted: data => {
      snackSuccess(`You added country to ${form?.name} successfully!`)
    },
    onError: error => {
      snackError(error)
    },
  })

  useQuery(ALL_COUNTRIES, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      setCountries(() => data?.countries)
    },
  })
  const { form } = useSelector(state => state.form)
  return (
    <Grid className={classes.root}>
      <div className={classes.wrapper}>
        {form?.countries?.map(country => {
          return (
            <Paper
              key={`country_paper_${country?.id}`}
              classes={{ root: classes.paper }}
              variant="outlined"
            >
              <Tooltip title={country?.fullName}>
                <span>
                  <ReactCountryFlag
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                    countryCode={country?.shortName}
                    svg
                  />
                </span>
              </Tooltip>
              <Tooltip title="Delete the country">
                <IconButton
                  onClick={() => {
                    deleteCountryFromLeader({
                      variables: {
                        input: {
                          childId: country?.id,
                          leaderId: form?.id,
                        },
                      },
                    })
                    dispatch(
                      setTargetCountry({
                        id: country?.id,
                        countryName: country?.fullName,
                        processType: ProcessType.DELETE,
                      })
                    )
                    const target = form?.countries?.filter(
                      ct => ct?.id !== country?.id
                    )
                    dispatch(
                      updateForm({
                        ...form,
                        countries: target,
                      })
                    )
                  }}
                  className={classes.btn}
                >
                  <DeleteForever />
                </IconButton>
              </Tooltip>
            </Paper>
          )
        })}
      </div>
      <div className={classes.wrapper}>
        {selected?.map(country => {
          return (
            <Paper
              key={`selected_country_${country[0]?.id}`}
              classes={{ root: classes.paper }}
              variant="outlined"
            >
              <Tooltip title={country[0]?.fullName}>
                <span>
                  <ReactCountryFlag
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                    countryCode={country[0]?.shortName}
                    svg
                  />
                </span>
              </Tooltip>
              <Tooltip title="Add country to leader">
                <IconButton
                  onClick={() => {
                    setSelected(() =>
                      selected?.filter(ct => ct[0]?.id !== country[0]?.id)
                    )
                    const newCountries = [...form?.countries, country[0]]
                    dispatch(
                      updateForm({
                        ...form,
                        countries: newCountries,
                      })
                    )
                    addCountryToLeader({
                      variables: {
                        input: {
                          childId: country[0]?.id,
                          leaderId: form?.id,
                        },
                      },
                    })
                    dispatch(
                      setTargetCountry({
                        id: country[0]?.id,
                        countryName: country[0]?.fullName,
                        processType: ProcessType.ADD,
                      })
                    )
                  }}
                  className={classes.btn}
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
            </Paper>
          )
        })}
      </div>

      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel htmlFor="country-select">Country</InputLabel>
        <Select
          className={classes.select}
          native
          onChange={handleChange}
          label="country"
          // value={option}
          inputProps={{
            name: "country",
            id: "country-select",
          }}
        >
          <option aria-label="None" value="None">
            Choose a country
          </option>
          {countries &&
            countries?.map(country => {
              return (
                <option
                  key={`selectable_country_${country?.id}`}
                  value={country?.id}
                >
                  {country?.fullName}
                </option>
              )
            })}
        </Select>
      </FormControl>
      <div className={classes.group}>
        <UpdateBtn text="Back" onClick={() => dispatch(prevActiveStep())} />
        <UpdateBtn
          text="Finish"
          onClick={() => {
            dispatch(resetActiveStep())
            dispatch(setModalOpen(""))
          }}
        />
      </div>
    </Grid>
  )
}

export default withSnack(UpdateCountryPanel, "update_country")
