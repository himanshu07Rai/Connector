import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../Redux/Actions/alert';
import { register } from '../../Redux/Actions/auth';
import Alert from '../Layout/Alert';
// import axios from 'axios';

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2)
      dispatch(setAlert('Passwords do not match', 'danger'));
    else {
      dispatch(register({ name, email, password }));

      /* w/o redux
      const newUser = {
        name,
        email,
        password
      };
      try {
        const config = {
          headers: {
            'Content-type': 'Application/json'
          }
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);

        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
      */
      // console.log(formData);
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
