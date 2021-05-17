import { Button, makeStyles } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0rem .8rem",
  },
  contained: {
    transition: "all .3s ease-in-out",
    "&:hover": {
      background: theme.palette.blue,
    },
  },
}))
const UpdateBtn = ({ text, onClick, disabled }) => {
  const classes = useStyles()
  return (
    <Button
      className={classes.root}
      classes={{ contained: classes.contained }}
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled || false}
    >
      {text}
    </Button>
  )
}

export default UpdateBtn
