import { TextField, Button, Snackbar, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from '../api/JoblyAPI';
import useFormData from '../hooks/useFormData';
import useUserContext from '../hooks/useUserContext';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2)
  }
}));

const LoginForm = () => {
  const classes = useStyles();
  const { formData, updateFormData } = useFormData(['username', 'password']);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { setCredentials } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await JoblyApi.getUserToken(formData);
      setCredentials({ token, username: formData.username });
      history.push('/jobs');
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  const handleClose = () => {
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username"
        onChange={updateFormData}
        value={formData.username}
        margin="normal"
        fullWidth
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        onChange={updateFormData}
        value={formData.password}
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
        Login
      </Button>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5000}
        onClose={handleClose}
        message={error}
      />
    </form>
  )
}

export default LoginForm;