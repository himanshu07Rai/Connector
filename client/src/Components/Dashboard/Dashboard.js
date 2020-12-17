import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../Redux/Actions/profile';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';
import Alert from '../Layout/Alert';
import DashboaardActions from './DashboaardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const profile = useSelector((state) => state.profile);
  // const { profile, loading } = profile;
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return profile.loading && profile.profile === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile.profile !== null ? (
        <Fragment>
          <DashboaardActions />
          <Experience experience={profile.profile.experience} />
          <Education education={profile.profile.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteAccount())}
            >
              <i className="fas fa-user-minus">Delete My Account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a profile, please add some info 💁 </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
