import { createSlice } from "@reduxjs/toolkit"
import { ProcessType } from "../utils/process"

const initialState = {
  active: {
    shortName: "",
    fullName: "",
    isActive: false,
  },
  isEdit: "",
  refreshMap: false,
  target: {
    id: "",
    countryName: "",
    processType: ProcessType.ADD,
  },
}

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setActiveCountry: (state, { payload }) => {
      state.active = payload
    },
    setEditPanel: (state, { payload }) => {
      state.isEdit = payload
    },
    updateSeriesData: state => {
      state.refreshMap = !state.refreshMap
    },
    setTargetCountry: (state, { payload }) => {
      state.refreshMap = !state.refreshMap
      state.target = payload
    },
  },
})

export const mapReducer = mapSlice.reducer
export const {
  setActiveCountry,
  setEditPanel,
  updateSeriesData,
  setTargetCountry,
} = mapSlice.actions
