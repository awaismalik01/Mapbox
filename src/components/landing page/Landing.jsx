import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { classes } from "./Landing";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RegisterAction,
  ResetRegister,
} from "../../redux/actions/RegisterAction";
import { CircularProgress } from "@mui/material";
import { RegisterLogin } from "../../redux/actions/LoginAction";

const theme = createTheme();

function Landing() {
  const navigate = useNavigate();
  const { isLoading, data, error } = useSelector(
    (state) => state?.RegisterReducer
  );
  const { data: LoginData } = useSelector((state) => state?.LoginReducer);
  const dispatch = useDispatch();

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
        dispatch(ResetRegister());
      }, 5000);
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(ResetRegister());
  }, [dispatch]);

  useEffect(() => {
    if (!!LoginData && !!LoginData?.email) {
      navigate("/dashboard");
    }
  }, [LoginData, navigate]);
  useEffect(() => {
    if (!!data) {
      dispatch(RegisterLogin({ name: data?.name, email: data?.email }));
      navigate("/dashboard");
    }
  }, [data, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      RegisterAction({
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("name"),
        contact: data.get("contact"),
        city: data.get("city"),
        terms: data.get("terms_conditions"),
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
            sx={{ width: "100%" }}
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={classes.formBox}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                name="name"
                type="text"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="contact"
                label="Contact Number"
                type="tel"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="City"
                type="text"
              />

              <FormControlLabel
                control={<Checkbox required value={true} />}
                name="terms_conditions"
                label="Agree with terms and conditions."
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
                Already have an account?{"  "}
                <Link to={"/login"}>Sign In</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Landing;
