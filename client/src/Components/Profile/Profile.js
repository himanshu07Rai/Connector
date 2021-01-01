import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getProfileById } from "../../Redux/Actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileRepos from "./ProfileRepos";

const Profile = (props) => {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileById(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div className="container">
      {profile.profile == null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile.profile} />
            <ProfileAbout profile={profile.profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.profile.experience.length > 0 ? (
                <Fragment>
                  {profile.profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.profile.education.length > 0 ? (
                <Fragment>
                  {profile.profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
            {profile.profile.githubusername && (
              <ProfileRepos username={profile.profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
