import { Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { usePolygon } from "./polygon"
import BasicMap from "./chart"
import { useQuery } from "@apollo/client"
import COUNTRIES_BY_LEADERS_COUNT from "../../graphql/query/countriesByLeaderCount"
import * as am4core from "@amcharts/amcharts4/core"
import EditPanel from "../edit/edit"
import { useSelector } from "react-redux"
import Loader from "./loader"



const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "100px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  root: {
    minHeight: "40vh",
    marginTop: "3rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  loader: {
    position: "absolute",
    width: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}))
const LeaderMap = () => {
  const classes = useStyles()

  const { polygonSeries, polygonTemplate } = usePolygon()

  const { active } = useSelector(state => state.map)

  const { data, loading} = useQuery(COUNTRIES_BY_LEADERS_COUNT, {
    fetchPolicy: "network-only",
  })



  if (loading) {
    return (
      <div className="loader">
        <Loader text="Loading..." />
      </div>
    )
  }

  const initializeData = () => {
    const seriesData = []
    data?.countries?.map(country => {
      if (country?.leaders?.length) {
        seriesData.push({
          id: country.shortName,
          title: `${country.fullName} : ${country?.leaders?.length} Leader(s)`,
          fill: am4core.color("#00AFB5"),
          countryId: country.id,
        })
      }
    })

    return seriesData
  }
  return (
    <Grid className={classes.container}>
      <BasicMap
        polygonSeries={polygonSeries}
        polygonTemplate={polygonTemplate}
        seriesData={initializeData()}
      >
        {active.isActive ? (
          <EditPanel shortName={active.shortName} fullName={active.fullName} />
        ) : (
          <Grid className={classes.root}>
            <Typography>Pick a country!</Typography>
          </Grid>
        )}
      </BasicMap>
    </Grid>
  )
}

export default LeaderMap
