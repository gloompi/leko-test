import React from 'react'
import ReactDOM from 'react-dom'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import { inject, observer } from 'mobx-react'

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: { useNextVariants: true },
})

const InputLabelRef = React.createRef()

const SelectSort = ({
  state: {
    age,
    labelWidth,
  },
  handleChange,
  classes,
}) => (
  <form className={classes.root} autoComplete='off'>
    <MuiThemeProvider theme={theme}>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel
          ref={InputLabelRef}
          htmlFor='outlined-age-simple'
        >
          Sort
        </InputLabel>
        <Select
          value={age}
          onChange={handleChange}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name='age'
              id='outlined-age-simple'
            />
          }
        >
          <MenuItem value=''>None</MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='description'>Description</MenuItem>
          <MenuItem value='death_reason'>Death Reason</MenuItem>
          <MenuItem value='killed_by'>Killed By</MenuItem>
          <MenuItem value='weapon'>Weapon</MenuItem>
        </Select>
      </FormControl>
    </MuiThemeProvider>
  </form>
)

export default compose(
  inject('dataStore'),
  withState('state', 'setState', {
    age: '',
    name: 'hai',
    labelWidth: 0,
  }),
  lifecycle({
    componentDidMount() {
      this.props.setState(state => ({
        ...state,
        labelWidth: ReactDOM.findDOMNode(InputLabelRef.current).offsetWidth,
      }))
    }
  }),
  withHandlers({
    handleChange: ({ dataStore: { fireSort }, setState }) => e => {
      const { value, name } = e.target
      setState(state => ({ ...state, [name]: value }))
      fireSort(value)
    }
  }),
  withStyles(styles),
  observer,
)(SelectSort)