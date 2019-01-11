import React from 'react'
import {
  compose,
  withHandlers,
  withState,
} from 'recompose'
import { inject, observer } from 'mobx-react'
import { isEmpty } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const inputs = [
  {
    key: 'name',
    value: 'Name'
  }, {
    key: 'description',
    value: 'Description'
  }, {
    key: 'death_reason',
    value: 'Death Reason'
  }, {
    key: 'killed_by',
    value: 'Killed By'
  }, {
    key: 'weapon',
    value: 'Weapon used to kill'
  }
]

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='Close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions)

const Modal = ({
  state: {
    open,
    warning,
  },
  state,
  classes,
  handleClose,
  handleChange,
  handleSubmit,
  handleClickOpen,
}) => (
  <div>
    <Fab
      color='primary'
      aria-label='Add'
      className={classes.fab}
      onClick={handleClickOpen}
    >
      
      <AddIcon />
    </Fab>
    <Dialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {warning ? <span style={{ color: 'red' }}>Fill in all fields</span> : 'Add New Card'}
      </DialogTitle>
      <DialogContent>
        <form className={classes.container} noValidate autoComplete='off'>
          {inputs.map(({ key, value }) => (
            <TextField
              key={key}
              id={`outlined-${key}`}
              label={`${value}`}
              className={classes.textField}
              value={state[key]}
              onChange={handleChange(key)}
              margin='normal'
              variant='outlined'
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color='primary'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default compose(
  inject('dataStore'),
  withState('state', 'setState', () => {
    const initialState = { open: false, warning: false }
    inputs.forEach(({ key }) => initialState[key] = '')
    return initialState
  }),
  withHandlers({
    handleClickOpen: ({ setState }) => () => {
      setState(state => ({ ...state, open: true }))
    },
    handleClose: ({ setState }) => () => {
      setState(state => ({ ...state, open: false }))
    },
    handleChange: ({ setState }) => name => event => {
      const { value } = event.target
      setState(state => ({ ...state, [name]: value }))
    }
  }),
  withHandlers({
    handleSubmit: ({ dataStore: { createCard }, handleClose, state, setState }) => () => {
      let valid = true
      const id = Math.random() * Date.now()
      const data = { id, ...state }
      delete data.open
      delete data.warning
      Object.entries(data).forEach(([key, value]) => {
        if (isEmpty(value) && key !== 'id') valid = false
      })
      if (!valid) return setState(state => ({ ...state, warning: true }))
      handleClose()
      createCard(data)
      setState(state => ({ ...state, warning: false }))
    }
  }),
  withStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    fab: {
      margin: theme.spacing.unit,
    },
  })),
  observer,
)(Modal)