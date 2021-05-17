import { useQuery } from "@apollo/client"
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core"
import { Delete, Label, Update } from "@material-ui/icons"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import LEADER_BY_NAME from "../../graphql/query/leaderByName"
import { updateForm } from "../../slices/formSlice"
import { toggleBadges, toggleLeaderMenu } from "../../slices/leaderSlice"
import { setModalOpen } from "../../slices/modalSlice"

const StyledMenu = withStyles(theme => ({
  paper: {
    border: "1px solid #d3d4d5",
  },
}))(props => (
  <Menu
    elevation={6}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    transition: "all .4s",
    "&:hover": {
      backgroundColor: theme.palette.blue,
    },
  },
}))(MenuItem)

const LeaderMenu = ({ anchorEl, leaderName }) => {
  const { leaderMenuIsOpen, badges } = useSelector(state => state.leader)

  const dispatch = useDispatch()

  const { data } = useQuery(LEADER_BY_NAME, {
    variables: {
      name: leaderName,
    },
    fetchPolicy: "network-only",
  })


  return (
    <div>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={leaderMenuIsOpen === `leader_menu_${leaderName}`}
        onClose={() => dispatch(toggleLeaderMenu(""))}
      >
        <StyledMenuItem
          onClick={() => {
            const leader = data?.leadersBy[0]
            dispatch(
              updateForm({
                id: leader?.id,
                name: leader.name,
                startDate: leader?.timeInterval.slice(0, 4),
                endDate: leader?.timeInterval.slice(5, 9),
                description: leader?.description,
                avatar: leader?.avatar,
                countries: leader?.countries,
              })
            )
            dispatch(toggleLeaderMenu(""))
            dispatch(setModalOpen(`update_leader_${leaderName}`))
          }}
        >
          <ListItemIcon>
            <Update fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Update leader" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            dispatch(toggleLeaderMenu())
            badges?.hidden === leaderName
              ? dispatch(
                  toggleBadges({
                    hidden: "",
                    items: null,
                  })
                )
              : dispatch(
                  toggleBadges({
                    hidden: leaderName,
                    items: data?.leadersBy[0]?.badges,
                  })
                )
          }}
        >
          <ListItemIcon>
            <Label fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              badges?.hidden !== leaderName ? "Show badges" : "Hide badges"
            }
          />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            dispatch(toggleLeaderMenu())
            dispatch(setModalOpen(`delete_leader_${leaderName}`))
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete leader" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}

export default LeaderMenu
