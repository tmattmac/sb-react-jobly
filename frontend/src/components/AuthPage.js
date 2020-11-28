import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import TabPanel from './TabPanel';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      margin: '10vh auto 0'
    }
  }
}));

const AuthPage = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const { isLoggedIn } = useUserContext();
  
  if (isLoggedIn()) return <Redirect to="/" />;

  const handleChange = (e, newValue) => {
    setTab(newValue);
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="Login/Register Form"
        variant="fullWidth"
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <RegisterForm />
      </TabPanel>
    </Paper>
  )
}

export default AuthPage;