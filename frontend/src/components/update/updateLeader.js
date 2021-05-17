import { Step, StepLabel } from "@material-ui/core"
import React from "react"
import withWindowSize from "../hooks/withWindowSize"
import StepIcon from "../template/stepIcon"
import StepperBase from "../template/stepperBase"
import UpdateStepPanel from "./updateStepPanel"

const UpdateLeaderPanel = ({ windowWidth, shortName }) => {
  const matches = windowWidth > 520
  return (
    <StepperBase
      panels={<UpdateStepPanel shortName={shortName} />}
      title={["Update leader", "Change avatar", "Change country"]}
    >
      <Step>
        <StepLabel StepIconComponent={StepIcon}>
          {" "}
          {matches && "Update leader"}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={StepIcon}>
          {matches && "Change avatar"}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={StepIcon}>
          {matches && "Change country"}
        </StepLabel>
      </Step>
    </StepperBase>
  )
}

export default withWindowSize(UpdateLeaderPanel)
