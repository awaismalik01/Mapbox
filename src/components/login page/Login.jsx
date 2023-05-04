import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { classes } from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction, ResetLogin } from "../../redux/actions/LoginAction";

const theme = createTheme();

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, data, error } = useSelector(
    (state) => state?.LoginReducer
  );

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!!error.length) {
      setOpen(true);
      setTimeout(() => {
        dispatch(ResetLogin());
      }, 5000);
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (!!data && !!data?.email) {
      navigate("/dashboard");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (!!data && !!data?.email) {
      navigate("/dashboard");
    }
  }, [data, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      LoginAction({
        email: data.get("email"),
        password: data.get("password"),
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={classes.body}>
        <CssBaseline />
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={classes.alert}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={classes.fullWidth}
          >
            {error}
          </Alert>
        </Snackbar>

        <Grid item xs={false} sm={false} md={8} sx={classes.bgImg} />
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          component={Paper}
          elevation={6}
          square
        >
          <Box sx={classes.formGrid}>
            <Avatar sx={classes.icon}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={classes.formBox}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              <Button
                sx={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress color="inherit" /> : "Sign In"}
              </Button>

              <Typography variant="body2" color="text.secondary" align="center">
                Don't have an account?{"  "}
                <Link to={"/"}>Sign Up</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
