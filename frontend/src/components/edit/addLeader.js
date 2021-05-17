import { Step, StepLabel } from "@material-ui/core"
import React from "react"
import withWindowSize from "../hooks/withWindowSize"

import StepIcon from "../template/stepIcon"
import StepperBase from "../template/stepperBase"
import CreateStepPanel from "./createStepPanel"

const AddPanel = ({ windowWidth }) => {
  const matches = windowWidth > 520
  return (
    <StepperBase
      panels={<CreateStepPanel />}
      title={[
        "Create new leader",
        "Add avatar",
        "Add to country",
        "Add badge(s)",
      ]}
    >
      <Step>
        <StepLabel StepIconComponent={StepIcon}>
          {matches && "Create new leader"}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={StepIcon}>
          {matches && "Add avatar"}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={StepIcon}>
          {matches && "Add to country"}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={StepIcon}>
          {matches && "Add badge(s)"}
        </StepLabel>
      </Step>
    </StepperBase>
  )
}

export default withWindowSize(AddPanel)
