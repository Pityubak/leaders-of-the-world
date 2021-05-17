import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isOpen: "",
  snackOpen: "",
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, { payload }) => {
      state.isOpen = payload
    },
    setSnackOpen: (state, { payload }) => {
      state.snackOpen = payload
    },
  },
})

export const modalReducer = modalSlice.reducer
export const { setModalOpen, setSnackOpen } = modalSlice.actions
