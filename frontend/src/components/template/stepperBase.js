import {
  Grid,
  makeStyles,
  StepConnector,
  Stepper,
  withStyles,
} from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import withWindowSize from "../hooks/withWindowSize"

const Connector = withStyles(theme => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      background: theme.palette.blue,
    },
  },
  completed: {
    "& $line": {
      background: theme.palette.blue,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}))(StepConnector)

const useStyles = makeStyles(theme => ({
  root: {
    margin: "2rem 0rem",
    width: "750px",
    textAlign: "center",
    [theme.breakpoints.down(800)]: {
      width: "500px",
    },
    [theme.breakpoints.down(600)]: {
      width: "400px",
    },
    [theme.breakpoints.down(520)]: {
      width: "300px",
    },
    [theme.breakpoints.down(420)]: {
      width: "250px",
    },
  },
  title: {
    [theme.breakpoints.down(520)]: {
      width: "300px",
    },
    [theme.breakpoints.down(420)]: {
      width: "250px",
    }, 
    background: "#fff",
    // border:"2px solid red",
    textDecoration: "underline",
     padding: "1rem 0rem",
  },
}))

const StepperBase = ({ children, panels, title, windowWidth }) => {
  const classes = useStyles()

  const { activeStep } = useSelector(state => state.leader)
  const matches = windowWidth > 520
  return (
    <Grid className={classes.root}>
      {!matches && <p className={classes.title}>{title[activeStep]}</p>}
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        alternativeLabel
        connector={<Connector />}
      >
        {children}
      </Stepper>
      {panels}
    </Grid>
  )
}

export default withWindowSize(StepperBase)
