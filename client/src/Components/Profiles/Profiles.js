import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../Redux/Actions/profile';
import Spinner from '../Layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);
  const profile = useSelector((state) => state.profile);
  const { profiles, loading } = profile;
  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Browse and connect with
            Developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })
            ) : (
              <h4>No profiles found..</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profiles;
