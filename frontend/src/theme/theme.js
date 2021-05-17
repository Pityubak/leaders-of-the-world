import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import { configureStore } from "@reduxjs/toolkit"
import React from "react"
import { Provider } from "react-redux"
import { rootReducer } from "../slices/rootReducer"
import Apollo from "../graphql"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"


const theme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#7B9961",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#707070",
      },
      daySelected: {
        backgroundColor: "#6A148E",
        "&:hover": {
          backgroundColor: "#6A148E",
        },
      },
      current: {
        color: "#6A148E",
      },
    },
    // MuiDialogActions: {
    //   root: {
    //     color: "#C4B67A",
    //     backgroundColor: "#C4B67A",
    //   },
    // },
  },

  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#EAE0D5",
    },
    tertiary: "#C4B67A",
    green: "#7B9961",
    red: "#A30000",
    blue: "#00AFB5",
  },
})

const store = configureStore({ reducer: rootReducer })
export const ThemeWrapper = ({ element }) => (
  <Apollo>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {element}
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  </Apollo>
)
