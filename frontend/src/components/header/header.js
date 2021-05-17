import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { AddCircle, Group, Menu } from "@material-ui/icons"

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setActiveCountry } from "../../slices/mapSlice"
import { setModalOpen } from "../../slices/modalSlice"
import CreateBadgeModal from "../edit/createBadge"
import withWindowSize from "../hooks/withWindowSize"
import AllLeaders from "./leaders"
import MobileMenu from "./mobileMenu"

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.down(450)]: {
      fontSize: "1.1rem",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    [theme.breakpoints.down(600)]: {
      padding: ".7rem 0rem",
      width: "100%",
    },
    transition: "all .3s ease-in-out",
    "&:hover": {
      background: theme.palette.primary.light,
    },
  },
}))
const Header = ({ windowWidth }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Leaders of the World
        </Typography>
        {windowWidth > 600 ? (
          <div>
            <Button
              className={classes.btn}
              startIcon={<AddCircle />}
              color={"secondary"}
              onClick={() => {
                dispatch(setModalOpen("badge_dialog"))
              }}
            >
              Create Badge
            </Button>
            <Button
              onClick={() => {
                dispatch(setModalOpen("modal_leaders_open"))
                dispatch(
                  setActiveCountry({
                    shortName: "",
                    fullName: "",
                    isActive: false,
                  })
                )
              }}
              className={classes.btn}
              startIcon={<Group />}
              color={"secondary"}
            >
              Leaders
            </Button>
          </div>
        ) : (
          <>
            <IconButton
              color="secondary"
              onClick={() => setDropdown(!dropdown)}
            >
              <Menu />
            </IconButton>
            <MobileMenu square top="50px" left="0" dropdown={dropdown}>
              <Button
                className={classes.btn}
                startIcon={<AddCircle />}
                color={"secondary"}
                onClick={() => {
                  dispatch(setModalOpen("badge_dialog"))
                  setDropdown(!dropdown)
                }}
              >
                Create Badge
              </Button>
              <Button
                onClick={() => {
                  dispatch(setModalOpen("modal_leaders_open"))
                  dispatch(
                    setActiveCountry({
                      shortName: "",
                      fullName: "",
                      isActive: false,
                    })
                  )
                  setDropdown(!dropdown)
                }}
                className={classes.btn}
                startIcon={<Group />}
                color={"secondary"}
              >
                Leaders
              </Button>
            </MobileMenu>
          </>
        )}
      </Toolbar>
      <CreateBadgeModal />
      <AllLeaders />
    </AppBar>
  )
}

export default withWindowSize(Header)
