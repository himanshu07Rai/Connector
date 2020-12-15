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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser()); //getting authenticated user everytime the aapp loads
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
