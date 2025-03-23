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
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Email validation regex
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  // Validation function
  const validateField = (field, value) => {
    let errorMsg = "";

    if (field === "email") {
      if (!value) errorMsg = "Email is required.";
      else if (!validateEmail(value)) errorMsg = "Invalid email format.";
    } 
    else if (field === "password") {
      if (!value) errorMsg = "Password is required.";
      else if (value.length < 6) errorMsg = "Password must be at least 6 characters.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMsg }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

   const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailError = validateField("email", creds.email);
    const passwordError = validateField("password", creds.password);
    
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
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
          error={Boolean(errors.email)}
          helperText={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          
        />
        <TextField
          className={classes.spacing}
          id="enter-password"
          type="password"
          label="Enter Password"
          variant="outlined"
          fullWidth
          value={creds.password}
          error={Boolean(errors.password)}
          helperText={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.spacing}
          type="submit"
          disabled={Boolean(errors.email) || Boolean(errors.password) || !creds.email || !creds.password}
        >
          SignIn
        </Button>
      </form>
    </>
  );
};

export default SignIn;
