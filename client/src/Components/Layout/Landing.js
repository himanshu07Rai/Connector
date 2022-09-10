import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
const Landing = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/login" className="btn btn-danger">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
