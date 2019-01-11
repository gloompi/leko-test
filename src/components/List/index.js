import React from 'react'
import { compose, lifecycle } from 'recompose'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    position: 'relative',
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  delete: {
    position: 'absolute',
    top: 15,
    right: 0,
  }
}

const List = ({
  dataStore: {
    list,
    loaded,
    deleteCard,
  }, 
  classes
}) => (
  !loaded
    ? null
    : list.map(({
      id,
      name,
      description,
      death_reason,
      killed_by, 
      weapon,
    }) => (
      <Grid key={id} item xs={3} >
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.pos} color='textSecondary'>
              <b>Name</b>: {name}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              <b>Description</b>: {description}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              <b>Death Reason</b>: {death_reason}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              <b>Killed By</b>: {killed_by}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              <b>Weapon used to kill</b>: {weapon}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.delete}
              size='small'
              onClick={() => deleteCard(id)}
            >
              &times;
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  )
)

export default compose(
  inject('dataStore'),
  lifecycle({
    componentDidMount() {
      const { fetch, loaded } = this.props.dataStore
      if(!loaded) fetch()
    }
  }),
  withStyles(styles),
  observer,
)(List)