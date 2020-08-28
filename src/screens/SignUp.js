import React, {useContext, useState} from 'react';
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

import Copyright from '../containers/Copyright';
import signUpStyles from '../styles/signup-styles';

import { GlobalContext } from "../utility/GlobalContext";

import AuthService from "../services/authService";


export default function SignUp(props) {
  const classes = signUpStyles();
  const { state, setState } = useContext(GlobalContext);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const handleNewUser=(e)=>{
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value 
    })
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true
    });

    if(newUser.password === newUser.confirmPassword){
      AuthService.signup(newUser.email, newUser.password)
            .then((response) => {
              setState({
                user: response.data.user,
                jwt: response.data.token,
                currentUserID: response.data.user.id,
                isLoading: false
              });
              localStorage.setItem("id_token", response.data.token);
              props.history.push("/dashboard");
              console.log("logged in!");
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
                });
              setTimeout(()=>{
                setState({
                  ...state,
                  alert:{
                    message: resMessage,
                    type: "warning",
                    isAlert: true,
                }})
              }, 3000);
            });
          }
      else{
        setState({
          ...state,
          alert:{
            message: "Passwords do not match",
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
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleNewUser}
                value={newUser.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleNewUser}
                value={newUser.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleNewUser}
                value={newUser.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

