import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import LiveSearch from './components/LiveSearch'
import SelectSort from './components/SelectSort'
import List from './components/List'
import Modal from './components/Modal'

const styles = theme => ({
  app: {
    flexGrow: 1,
    maxWidth: '1200px',
    minHeight: '100vh',
    margin: '0 auto',
    padding: '5px 25px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

const App = ({ classes }) => (
  <div className={classes.app}>
    <Grid container spacing={24}>
      <Grid item xs={5}>
        <LiveSearch />
      </Grid>
      <Grid item xs={5}>
        <SelectSort />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={1}>
        <Modal />
      </Grid>
      <Grid container spacing={24}>
        <List />
      </Grid>
    </Grid>
  </div>
)

export default withStyles(styles)(App)
