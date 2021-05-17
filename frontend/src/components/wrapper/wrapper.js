import { Grid, makeStyles } from "@material-ui/core"

import React from "react"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    background: theme.palette.secondary.main,
    position: "relative",
  },
}))
const Wrapper = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      {children}
    </Grid>
  )
}

export default Wrapper
