import React from 'react';
import { Link, Typography, CircularProgress } from '@material-ui/core';

const Loader = ({ error, loading, retry, children }) => {
  const handleRetry = e => {
    e.preventDefault();
    retry();
  }

  let body;
  if (loading) body = <CircularProgress />
  else if (error) body = (
    <Typography variant="h6">
      There was an error with the request. <Link href="#" onClick={handleRetry} variant="h6">Retry?</Link>
    </Typography>
  )
  else return children;
  
  return (
    <div style={{ width: "100%", textAlign: "center" }}>{body}</div>
  )
}

export default Loader;