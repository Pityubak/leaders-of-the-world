import { combineReducers } from "redux"
import { leaderReducer } from "./leaderSlice"
import { mapReducer } from "./mapSlice"
import { modalReducer } from "./modalSlice"
import { formReducer } from "./formSlice"

export const rootReducer = combineReducers({
  map: mapReducer,
  leader: leaderReducer,
  modal: modalReducer,
  form: formReducer,
})
