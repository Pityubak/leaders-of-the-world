import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activeCountry: {
    id: "",
    fullName: "",
  },
  activeLeader: {
    id: "",
    name: "",
  },
  activeStep: 0,
  leaderMenuIsOpen: "",
  badges: {
    hidden: "",
    items: [],
  },
}

const leaderSlice = createSlice({
  name: "leader",
  initialState,
  reducers: {
    changeActiveCountry: (state, { payload }) => {
      state.activeCountry = payload
    },
    changeActiveLeader: (state, { payload }) => {
      state.activeLeader = payload
    },
    nextActiveStep: state => {
      state.activeStep = (state.activeStep + 1) % 4
    },
    prevActiveStep: state => {
      state.activeStep = state.activeStep - 1
    },
    resetActiveStep: state => {
      state.activeStep = 0
    },
    resetActiveLeader: state => {
      state.activeLeader = {
        id: "",
        fullName: "",
      }
    },
    toggleLeaderMenu: (state, { payload }) => {
      state.leaderMenuIsOpen = payload
    },
    toggleBadges: (state, { payload }) => {
      state.badges = payload
    },
  },
})

export const leaderReducer = leaderSlice.reducer
export const {
  changeActiveCountry,
  changeActiveLeader,
  nextActiveStep,
  resetActiveStep,
  resetActiveLeader,
  toggleLeaderMenu,
  toggleBadges,
  prevActiveStep,
} = leaderSlice.actions
