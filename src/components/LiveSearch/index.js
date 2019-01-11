import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { inject, observer } from 'mobx-react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  margin: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffffff',
  },
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: { useNextVariants: true },
})

const LiveSearch = ({
  classes,
  inputState,
  handleBlur,
  handleChange,
}) => (
  <div className={classes.container}>
    <MuiThemeProvider theme={theme}>
      <TextField
        className={classes.margin}
        label='Search'
        variant='outlined'
        id='mui-theme-provider-outlined-input'
        value={inputState}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
      />
    </MuiThemeProvider>
  </div>
)

export default compose(
  inject('dataStore'),
  withState('inputState', 'setInput', ''),
  withHandlers({
    handleChange: ({
      dataStore: { fireSearch },
      setInput,
    }) => e => {
      const { value } = e.target
      setInput(value)
      fireSearch(value)
    },
    handleBlur: ({
      dataStore: { fireSearch },
      inputState,
    }) => () => {
      fireSearch(inputState)
    }
  }),
  withStyles(styles),
  observer,
)(LiveSearch)