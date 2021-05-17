import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  form: {
    id: "",
    name: "",
    endDate: new Date().toString(),
    startDate: new Date().toString(),
    description: "",
    avatar: "",
    countries: null,
    error: "",
  },
}

const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    updateForm: (state, { payload }) => {
      state.form = payload
    },
    resetForm: state => {
      state.form = {
        id: "",
        name: "",
        endDate: new Date().toString(),
        startDate: new Date().toString(),
        description: "",
        avatar: "",
        countries: null,
        error: "",
      }
    },
  },
})

export const formReducer = formSlice.reducer

export const { updateForm, resetForm } = formSlice.actions
