import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    justifyContent: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    margin: 10
  }
}));

const useNavBar = () => {
  const user = useSelector(state => state.user);
  return { user };
};

export default function NavBar() {
  const { user } = useNavBar();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Avatar
            src="/gnome.jpg"
            className={classes.avatar}
          />
          <Typography variant="h6" className={classes.title}>
            Pokemon Skiller Edition
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
