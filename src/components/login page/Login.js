import { makeStyles } from "@mui/styles";
import img from "../../assets/imgs/map.png";

export const classes = {
  alert: {
    width: {
      sm: "95%",
      md: "30%",
    },
  },

  fullWidth: {
    width: "100%",
  },

  body: {
    height: "100vh",
  },

  bgImg: {
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  formGrid: {
    height: "100%",
    padding: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  formBox: {
    width: "100%",
  },

  icon: {
    marginBottom: "1vw",
    backgroundColor: "#1976d2 !important",
  },

  submit: {
    marginTop: "1vw !important",
    marginBottom: "1vw !important",
  },
};