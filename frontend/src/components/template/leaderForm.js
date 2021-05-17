import { makeStyles, TextField } from "@material-ui/core"
import { DatePicker } from "@material-ui/pickers"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateForm } from "../../slices/formSlice"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "2rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  item: {
    margin: ".5rem",
  },
  group: {
    marginTop: "2rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    [theme.breakpoints.down(600)]: {
      flexDirection: "column",
    },
  },
  description: {
    width: "100%",
    margin: "1rem 0rem",
  },
}))

const LeaderForm = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { form } = useSelector(state => state.form)

  const handleChange = event => {
    const { name, value } = event.target
    let error = false

    if (name === "name") {
      error = value.length < 4
    }
    if (name === "description") {
      error = value.length < 20
    }

    dispatch(
      updateForm({
        ...form,
        [name]: value,
        error: error
          ? `${form?.error}_error_${name}`
          : `${form?.error?.replaceAll("_error_" + name, "")}`,
      })
    )
  }

  const handleDate = name => event => {
    dispatch(
      updateForm({
        ...form,
        [name]: event?.toString(),
      })
    )
  }

  return (
    <form className={classes.root}>
      <div className={classes.group}>
        <TextField
          id="name"
          name="name"
          className={classes.item}
          label="Name"
          variant="outlined"
          value={form.name}
          onChange={handleChange}
          required
          error={form?.error?.includes("error_name")}
          helperText={
            form?.error?.includes("error_name")
              ? "Min 4 characters length!"
              : ""
          }
        />
        <DatePicker
          id="startDate"
          className={classes.item}
          views={["year"]}
          label="Start year"
          inputVariant="outlined"
          value={new Date(form.startDate)}
          onChange={handleDate("startDate")}
        />
        <DatePicker
          id="endDate"
          className={classes.item}
          views={["year"]}
          label="End year(estimated)"
          inputVariant="outlined"
          value={new Date(form.endDate)}
          onChange={handleDate("endDate")}
        />
      </div>
      <TextField
        multiline
        name="description"
        id="description"
        label="Description"
        onChange={handleChange}
        rows={5}
        variant="outlined"
        value={form.description}
        className={classes.description}
        error={form?.error?.includes("error_description")}
        helperText={
          form?.error?.includes("error_description")
            ? "Min 20 characters length!"
            : ""
        }
      />
      <div className={classes.group}>{children}</div>
    </form>
  )
}

export default LeaderForm
