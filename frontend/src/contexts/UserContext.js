import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Backdrop, CircularProgress } from '@material-ui/core';
import JoblyApi from '../api/JoblyAPI';

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser, isLoading] = useLocalStorage('userData');
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  useEffect(() => {
    setUserInfo(null);
    if (loggedInUser) {
      JoblyApi.getUserDetails(loggedInUser.username)
        .then(data => {
          setUserInfo(data);
        })
        .finally(() => {
          setLoadingUserInfo(false);
        });
    } else {
      setLoadingUserInfo(false);
    }
  }, [loggedInUser, setUserInfo])

  if (isLoading || loadingUserInfo) return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider }