import React from "react"
import { useSelector } from "react-redux"
import UpdateLeaderForm from "./updateLeaderForm"
import UpdateAvatarPanel from "./updateAvatar"
import UpdateCountryPanel from "./updateCountry"

const UpdateStepPanel = ({ shortName }) => {
  const { activeStep } = useSelector(state => state.leader)
  return (
    <>
      {activeStep === 0 && <UpdateLeaderForm shortName={shortName} />}
      {activeStep === 1 && <UpdateAvatarPanel />}
      {activeStep === 2 && <UpdateCountryPanel />}
    </>
  )
}

export default UpdateStepPanel
