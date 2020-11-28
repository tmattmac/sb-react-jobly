import { TextField, Button, Snackbar, makeStyles, CircularProgress, Paper, Typography, Box } from '@material-ui/core';
import React, { useState } from 'react';
import JoblyApi from '../api/JoblyAPI';
import useFormData from '../hooks/useFormData';
import useUserContext from '../hooks/useUserContext';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      margin: '10vh auto 0'
    }
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const EditProfile = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const { userInfo, setUserInfo } = useUserContext();
  const { formData, updateFormData } = useFormData(
    ['firstName', 'lastName', 'email'],
    userInfo
  );

  if (!userInfo) return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <CircularProgress />
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await JoblyApi.updateUserDetails(userInfo.username, formData);
      setUserInfo(info => ({...info, ...formData}));
      setError('Profile updated successfully')
    } catch (e) {
      setError(e);
    }
  }

  const handleClose = () => {
    setError(null);
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
      <Box p={3}>
        <Typography>{userInfo.username}</Typography>
        <TextField
          name="firstName"
          label="First Name"
          onChange={updateFormData}
          value={formData.firstName}
          margin="normal"
          fullWidth
        />
        <TextField
          name="lastName"
          label="Last Name"
          onChange={updateFormData}
          value={formData.lastName}
          margin="normal"
          fullWidth
        />
        <TextField
          name="email"
          label="Email Address"
          type="email"
          onChange={updateFormData}
          value={formData.email}
          margin="normal"
          fullWidth
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.button} 
          fullWidth
        >
          Save
        </Button>
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={5000}
          onClose={handleClose}
          message={error}
        />
      </Box>
    </Paper>
  )
}

export default EditProfile;