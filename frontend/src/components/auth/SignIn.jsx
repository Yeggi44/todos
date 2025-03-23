import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";

import { signIn } from "../../store/actions/authActions";

const useStyles = makeStyles({
  formStyle: {
    margin: "0px auto",
    padding: "30px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
  },
  spacing: {
    marginTop: "20px",
  },
});

const SignIn = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(signIn(creds.email, creds.password));
  //   setCreds({ email: "", password: "" });
  // };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({
      ...creds,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!creds.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(creds.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!creds.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (creds.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(signIn(creds.email, creds.password));
      setCreds({ email: "", password: "" });
    }
  };
 

  if (auth._id) return <Redirect to="/" />;

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        className={classes.formStyle}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Sign In</Typography>
        <TextField
          className={classes.spacing}
          id="enter-email"
          label="Enter Email"
          variant="outlined"
          type="email"
          fullWidth
          value={creds.email}
           onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          
        />
        <TextField
          className={classes.spacing}
          id="enter-password"
          type="password"
          label="Enter Password"
          variant="outlined"
          fullWidth
          value={creds.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.spacing}
          type="submit"
        >
          SignIn
        </Button>
      </form>
    </>
  );
};

export default SignIn;
