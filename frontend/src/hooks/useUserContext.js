import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const useUserContext = () => {
  const { loggedInUser, setLoggedInUser, userInfo, setUserInfo } = useContext(UserContext);

  const isLoggedIn = () => {
    return Boolean(loggedInUser);
  }

  const logOutUser = () => {
    setLoggedInUser(null);
  }

  const getUsername = () => {
    if (loggedInUser) return loggedInUser.username;
  }

  const setCredentials = ({ token, username }) => {
    setLoggedInUser({ token, username });
  }

  return { isLoggedIn, logOutUser, getUsername, setCredentials, userInfo, setUserInfo };
}

export default useUserContext;