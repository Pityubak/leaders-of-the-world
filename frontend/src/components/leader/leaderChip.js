import {
  Avatar,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import {  Label } from "@material-ui/icons"
import React from "react"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    margin: ".5rem .2rem",
    background: theme.palette.secondary.main,
  },
  typo: {
    padding: "1rem",
    color: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.primary.main,
    transition: "all .3s ease-in-out",
    "&:hover": {
      color: theme.palette.red,
    },
  },
  avatar: {
    padding: ".2rem",
    margin: ".2rem",
    background: theme.palette.secondary.main,
  },
  label: {
    color: theme.palette.tertiary,
  },
}))
const LeaderChip = ({ label, onDelete, icon }) => {
  const classes = useStyles()
  return (
    <Paper square elevation={5} className={classes.root}>
      <Avatar className={classes.avatar}>
        <Label className={classes.label} />
      </Avatar>
      <Typography className={classes.typo}>{label}</Typography>
      <IconButton className={classes.icon} onClick={onDelete}>
        {icon}
      </IconButton>
    </Paper>
  )
}

export default LeaderChip
