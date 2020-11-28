import { Button, Paper, makeStyles, Typography, Grid, Snackbar } from '@material-ui/core';
import React, {useState} from 'react';
import JoblyApi from '../api/JoblyAPI';
import useUserContext from '../hooks/useUserContext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  button: {
    display: "flex",
    flex: "row wrap",
    alignItems: "end",
  }
}));

const JobCard = ({ id, title, salary, equity }) => {
  const classes = useStyles();
  const { getUsername, setUserInfo, userInfo } = useUserContext();
  const [error, setError] = useState(null);

  // TODO: Move out to a useEffect, probably
  let applied = false;
  if (userInfo) {
    applied = userInfo.applications.some(jobId => id === jobId);
  }

  const handleApply = async () => {
    try {
      const username = getUsername();
      await JoblyApi.applyToJob(username, id);
      setUserInfo(userInfo => {
        return { ...userInfo, applications: [...userInfo.applications, id] }
      });
    } catch (e) {
      // TODO: Show an error message
    }
  }

  const handleClose = () => {
    setError(null);
  }

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">
            {title}
          </Typography>
          <Typography variant="body1">
            Salary: {salary}
          </Typography>
          <Typography variant="body1">
            Equity: {equity * 100}%
          </Typography>
        </Grid>
        <Grid item className={classes.button}>
          <Button variant="contained" color="primary" disabled={applied} onClick={handleApply}>
            {applied ? 'Applied' : 'Apply'}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5000}
        onClose={handleClose}
        message={error}
      />
    </Paper>
  )
}

export default JobCard;