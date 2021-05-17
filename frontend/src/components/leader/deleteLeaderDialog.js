import { useMutation } from "@apollo/client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import DELETE_LEADER from "../../graphql/mutation/deleteLeader"
import COUNTRIES_BY_LEADERS_COUNT from "../../graphql/query/countriesByLeaderCount"
import COUNTRY_BY_SHORT_NAME from "../../graphql/query/countryByShortName"
import LEADERS_WITHOUT_BADGES from "../../graphql/query/leaderWithoutBadges"
import { setTargetCountry } from "../../slices/mapSlice"
import { setModalOpen } from "../../slices/modalSlice"
import { ProcessType } from "../../utils/process"
import withSnack from "../snackbar/withSnack"

const DeleteLeaderDialog = ({
  leader,
  leaderId,
  snackSuccess,
  snackError,
  shortName,
  countryId,
  fullName,
}) => {
  const { isOpen } = useSelector(state => state.modal)
  const handleClose = () => {
    dispatch(setModalOpen(""))
  }
  const dispatch = useDispatch()

  const [deleteLeader] = useMutation(DELETE_LEADER, {
    onCompleted: data => {
      snackSuccess(`${leader} deleted successfully!`)
      console.log("DELETE", data)
      dispatch(
        setTargetCountry({
          countries:data?.deleteLeader?.countries,
          processType: ProcessType.DELETE_ALL,
        })
      )
    },
    onError: error => {
      snackError(error)
    },
  })

  return (
    <Dialog open={isOpen === `delete_leader_${leader}`} onClose={handleClose}>
      <DialogTitle>Delete {leader} ?</DialogTitle>
      <DialogContent>
        <DialogContentText>Delete is irreversible process.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose()
            deleteLeader({
              variables: {
                id: leaderId,
              },
              refetchQueries: [
                {
                  query: COUNTRY_BY_SHORT_NAME,
                  variables: {
                    shortName: shortName,
                  },
                },
                {
                  query: LEADERS_WITHOUT_BADGES,
                },
                {
                  query: COUNTRIES_BY_LEADERS_COUNT,
                },
              ],
            })
          }}
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withSnack(DeleteLeaderDialog, "delete_leader")
