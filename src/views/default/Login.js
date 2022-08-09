import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { authSlice } from 'auth/authSlice';
import { USER_ROLE } from 'constants.js';
import { store } from 'store.js';

const Login = () => {
  const history = useHistory();
  const title = 'Login';
  const description = 'Login Page';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
  });
  const initialValues = { email: '', password: '' };

  const onSubmit = (values) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://extrafrens-api.vercel.app/api/login', requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log('Successful Login');

          response.json().then((data) => {
            store.dispatch(
              authSlice.actions.setCurrentUser({
                id: data.account.id,
                name: data.account.name,
                email: data.account.email,
                thumb: data.account.thumb,
                role: data.account.role,
              }));

              history.push('/');
            })
            .catch((error) => console.log('error', error));

        } else {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
        }
      })
      .catch((error) => console.log('error', error));
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">ExtraFrens</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">Subscribe to the exclusive content of your favourite creators on our platform.</p>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <h1>ExtraFrens</h1>
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
          <p className="h6">
            If you are not a member, please <NavLink to="/register">register</NavLink>.
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
            <NavLink to="/register">
              <Button size="lg" type="button" className="ms-2">
                Register
              </Button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;
