import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  progress: {
    // color: theme.palette.primary.main,
    background: "#212121",
  },
  full: {
    width: "100%",
  },
  typo: {
    marginTop: "3rem",
  },
}))

const Loader=({text})=> {
  const classes = useStyles()
  const [progress, setProgress] = React.useState(0)
  const [buffer, setBuffer] = React.useState(10)

  const progressRef = React.useRef(() => {})
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0)
        setBuffer(10)
      } else {
        const diff = Math.random() * 10
        const diff2 = Math.random() * 10
        setProgress(progress + diff)
        setBuffer(progress + diff + diff2)
      }
    }
  })

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current()
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.full}>
        <LinearProgress
          classes={{
            // colorPrimary: classes.primary,
            barColorPrimary: classes.progress,
          }}
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
        />
      </div>
      <Typography className={classes.typo} variant="h6">
        {text}
      </Typography>
    </div>
  )
}

export default Loader
