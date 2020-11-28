import Home from './components/Home';
import CompanyList from './components/CompanyList';
import JobList from './components/JobList';
import AuthPage from './components/AuthPage';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Protected from './components/Protected';
import CompanyDetail from './components/CompanyDetail';
import EditProfile from './components/EditProfile';

const Routes = () => {
  return (
    <Container>
      <Switch>
        <Route path="/companies/:handle">
          <Protected>
            <CompanyDetail />
          </Protected>
        </Route>
        <Route path="/companies">
          <Protected>
            <CompanyList />
          </Protected>
        </Route>
        <Route path="/jobs">
          <Protected>
            <JobList />
          </Protected>
        </Route>
        <Route path="/profile">
          <Protected>
            <EditProfile />
          </Protected>
        </Route>
        <Route path="/login">
          <AuthPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  )
}

export default Routes;