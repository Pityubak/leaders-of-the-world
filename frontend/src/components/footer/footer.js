import { Grid, makeStyles } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid #212121",
    padding: "1rem",
  },
  typo: {
    color: theme.palette.primary.main,
    fontSize: ".8rem",
    fontWeight: 500,
  },
  link: {
    marginLeft: ".5rem",
    color: theme.palette.primary.main,
    fontSize: ".8rem",
    textDecoration: "none",
    transition: "all .3s ease-in-out",
    "&:hover": {
      color: theme.palette.blue,
    },
  },
  copyright: {
    marginRight: ".2rem",
    fontSize: ".9rem",
    fontWeight: 700,
  },
}))
const Footer = () => {
  const classes = useStyles()
  return (
    <>
      {/* <Divider flexItem orientation="vertical" /> */}
      <footer className={classes.root}>
        <Grid className={classes.grid}>
          <h6 className={classes.copyright}> &#169;</h6>
          <h6 className={classes.typo}> {new Date().getFullYear()}</h6>
          <a
            href="https://github.com/Pityubak"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            Created by Pityubak
          </a>
        </Grid>
      </footer>
    </>
  )
}

export default Footer
