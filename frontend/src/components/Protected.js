import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

const Protected = ({ children }) => {
  const { isLoggedIn } = useUserContext();
  console.log(isLoggedIn());
  if (!isLoggedIn()) return <Redirect to="/" />;

  return children;
}

export default Protected;