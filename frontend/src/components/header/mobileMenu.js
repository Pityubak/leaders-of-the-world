import { makeStyles, Paper } from "@material-ui/core"
import React from "react"
import styled from "styled-components"

const useStyles = makeStyles(theme => ({
  paper: {
    background: theme.palette.primary.main,
    zIndex: 6000,
    borderTop: "1px solid #EAE0D5",
  },
}))

const StyledPaper = styled(Paper)`
  display: none;
  position: absolute;
  z-index: 5500;
  width: 100%;
  top: ${props => props.top};
  left: ${props => props.left};
  ${props => {
    if (props.dropdown === "true") {
      return `display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        text-align:center;`
    }
  }}
`

const MobileMenu = ({ children, left, dropdown, top, square }) => {
  const classes = useStyles()

  return (
    <StyledPaper
      top={top || "33px"}
      dropdown={dropdown.toString()}
      left={left}
      className={classes.paper}
      square={square || false}
    >
      {children}
    </StyledPaper>
  )
}

export default MobileMenu
