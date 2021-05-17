import { useMutation } from "@apollo/client"
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { MoreVert, ThumbDown, ThumbUp } from "@material-ui/icons"
import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DISLIKE from "../../graphql/mutation/dislike"
import LIKE from "../../graphql/mutation/like"
import { toggleLeaderMenu } from "../../slices/leaderSlice"
import BadgesContent from "./badgesContent"
import DeleteLeaderDialog from "./deleteLeaderDialog"
import LeaderMenu from "./leaderMenu"
import LeaderModal from "./leaderModal"
import UpdateLeaderDialog from "../update/updateDialog"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "3rem 0rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  card: {
    maxWidth: 500,
    [theme.breakpoints.down(600)]: {
      maxWidth: 350,
    },
    [theme.breakpoints.down(400)]: {
      maxWidth: 300,
    },
  },
  avatar: {
    background: theme.palette.red,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "2rem 0rem",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    transition: "all .3s ease-in-out",
    "&:hover": {
      color: theme.palette.red,
    },
    "&:active": {
      color: theme.palette.red,
    },
  },
}))

const LeaderCard = ({ items, shortName, fullName, countryId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ref = useRef()
  const [anchorEl, setAnchorEl] = useState(null)

  const { badges } = useSelector(state => state.leader)

  const handleClick = (event, leaderName) => {
    setAnchorEl(event.currentTarget)
    dispatch(toggleLeaderMenu(`leader_menu_${leaderName}`))
  }

  const [like] = useMutation(LIKE)

  const [dislike] = useMutation(DISLIKE)

  return (
    <Grid className={classes.root}>
      {items.map(item => {
        return (
          <Grid key={item?.id} className={classes.cardBox}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.avatar}
                    src={`data:image/jpg;base64,${item?.avatar}`}
                    aria-label="leader's avatar"
                  />
                }
                action={
                  <IconButton
                    onClick={e => handleClick(e, item?.name)}
                    aria-label="settings"
                  >
                    <MoreVert ref={ref} className={classes.icon} />
                  </IconButton>
                }
                title={item?.name}
                subheader={item?.timeInterval}
              />

              <CardContent>
                <Typography>{item?.description}</Typography>
              </CardContent>
              {badges?.hidden === item?.name && (
                <BadgesContent
                  leaderId={item?.id}
                  items={badges?.items}
                  leader={item?.name}
                />
              )}
              <CardActions className={classes.actions}>
                <div className={classes.likes}>
                  <IconButton
                    onClick={() =>
                      like({
                        variables: {
                          id: item?.id,
                        },
                      })
                    }
                  >
                    <ThumbUp className={classes.icon} />
                  </IconButton>
                  <Typography variant="body2">{item?.likes}</Typography>
                </div>
                <div className={classes.likes}>
                  <IconButton
                    onClick={() =>
                      dislike({
                        variables: {
                          id: item?.id,
                        },
                      })
                    }
                  >
                    <ThumbDown className={classes.icon} />
                  </IconButton>
                  <Typography variant="body2">{item?.dislikes}</Typography>
                </div>
              </CardActions>
              <LeaderMenu anchorEl={anchorEl} leaderName={item?.name} />
              <DeleteLeaderDialog
                leader={item?.name}
                leaderId={item?.id}
                shortName={shortName}
                fullName={fullName}
                countryId={countryId}
              />
              <LeaderModal leaderId={item?.id} leader={item?.name} />
              <UpdateLeaderDialog
                leader={item?.name}
                leaderId={item?.id}
                shortName={shortName}
              />
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default LeaderCard
