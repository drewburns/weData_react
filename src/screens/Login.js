import React, { useState, useRef, useContext } from "react";
import { GlobalContext } from "../utility/GlobalContext";

import AuthService from "../services/authService";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import loginStyles from '../styles/login-styles'
import Copyright from '../containers/Copyright';

const Login = (props) => {
  const classes = loginStyles();
  const { state, setState } = useContext(GlobalContext);
  const [loginInfo, setLoginInfo] = useState({email:"", password:""});

  const onFormChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true,
    })

    AuthService.login(loginInfo.email, loginInfo.password)
      .then((response) => {
        setState({
          ...state,
          user: response.data.user,
          jwt: response.data.token,
          currentUserID: response.data.user.id,
        });
        localStorage.setItem("id_token", response.data.token);
        props.history.push("/dashboard");
        console.log("logged in!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          setState({
            ...state,
            isLoading: false,
            alert:{
              message: resMessage,
              type: "warning",
              isAlert: true,
          }})
          setTimeout(()=>{
            setState({
              ...state,
              alert:{
                message: "",
                type: "",
                isAlert: false,
            }})
          }, 3000);
        });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={loginInfo.email}
            onChange={onFormChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={loginInfo.password}
            onChange={onFormChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;

