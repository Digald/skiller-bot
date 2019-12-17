import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import HelpIcon from "@material-ui/icons/Help";
import Link from "../components/Link";

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

export default function NavBar() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Avatar src="/gnome.jpg" className={classes.avatar} />
          <Typography variant="h6" className={classes.title}>
            {router.pathname === "/teambuilder" ? "Team Builder" : "Pokemon Skiller Edition"}
          </Typography>
          <Link href={router.pathname !== "/" ? "/" : "/help"}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              {router.pathname !== "/" ? <HomeSharpIcon /> : <HelpIcon />}
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
