import React from "react"
import { useSelector } from "react-redux"
import AddAvatarPanel from "./addAvatarPanel"
import AddBadgePanel from "./addBadgePanel"
import AddToCountryPanel from "./addToCountryPanel"
import CreateLeaderPanel from "./createLeaderPanel"

const CreateStepPanel = () => {
  const { activeStep } = useSelector(state => state.leader)
  return (
    <>
      {activeStep === 0 && <CreateLeaderPanel />}
      {activeStep === 1 && <AddAvatarPanel />}
      {activeStep === 2 && <AddToCountryPanel />}
      {activeStep === 3 && <AddBadgePanel />}
    </>
  )
}

export default CreateStepPanel
