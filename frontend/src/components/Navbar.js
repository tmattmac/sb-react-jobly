import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, makeStyles, Link, Menu, MenuItem } from '@material-ui/core';
import { useHistory, NavLink, Link as RouterLink } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

const useStyles = makeStyles(theme => ({
  navTitle: { flexGrow: 1 },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4)
  },
  active: {
    backgroundColor: theme.palette.primary.dark
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isLoggedIn, getUsername, logOutUser } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    setAnchorEl(null);
    logOutUser();
    history.push('/');
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Box className={classes.navTitle}>
          <Link component={RouterLink} to="/" variant="h6" color="inherit" underline="none">Jobly</Link>
        </Box>
        {isLoggedIn() ?
          <>
            <Button color="inherit" component={NavLink} activeClassName={classes.active} to="/companies">Companies</Button>
            <Button color="inherit" component={NavLink} activeClassName={classes.active} to="/jobs">Jobs</Button>
            <Button color="inherit" onClick={handleClick}>{getUsername()}</Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose} component={RouterLink} to="/profile">Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </>
          :
          <Button color="inherit" component={NavLink} activeClassName={classes.active} to="/login">Log In</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;