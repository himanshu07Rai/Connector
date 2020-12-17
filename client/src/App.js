import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Components/Layout/Landing';
import Navbar from './Components/Layout/Navbar';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import setAuthToken from './Utils/setAuthToken';
import { loadUser } from './Redux/Actions/auth';
import store from './Redux/store';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/Routing/PrivateRoute';
import CreateProfile from './Components/Profile-Form/CreateProfile';
import EditProfile from './Components/Profile-Form/EditProfile';
import { getCurrentProfile } from './Redux/Actions/profile';
import AddExperience from './Components/Profile-Form/AddExperience';
import AddEducation from './Components/Profile-Form/AddEducation';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser()); //getting authenticated user everytime the aapp loads
    store.dispatch(getCurrentProfile());
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
