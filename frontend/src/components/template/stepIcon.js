import { makeStyles } from "@material-ui/core"
import { Edit, Face, Label, Language } from "@material-ui/icons"
import React from "react"

const useIconStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(550)]:{
      width: 35,
    height: 35,
    }
  },
  active: {
    background: theme.palette.blue,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.35)",
  },
  completed: {
    background: theme.palette.blue,
  },
}))

const StepIcon = ({ active, completed, icon }) => {
  const classes = useIconStyles()

  const icons = {
    1: <Edit />,
    2: <Face />,
    3: <Language />,
    4: <Label />,
  }

  return (
    <div
      className={[
        classes.root,
        active && classes.active,
        completed && classes.completed,
      ].join(" ")}
    >
      {icons[String(icon)]}
    </div>
  )
}

export default StepIcon
