import { Box, Typography, Button } from '@material-ui/core';
import React from 'react';
import useUserContext from '../hooks/useUserContext';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const { isLoggedIn, getUsername } = useUserContext();
  const slogan = 'You want jobs? We got jobs.';

  return (
    <Box textAlign="center" marginTop="20vh">
      <Typography variant="h2">Jobly</Typography>
      <Typography variant="h5">{isLoggedIn() ? `Welcome back, ${getUsername()}!` : slogan}</Typography>
      {isLoggedIn() ||
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/login"
          style={{ marginTop: "16px" }}
        >
          Log In
        </Button>}
    </Box>
  );
}

export default Home;