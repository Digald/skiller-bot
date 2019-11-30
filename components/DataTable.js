import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";

import TableList from "./TableList";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 1, 1)
  }
}));

const useDataTable = () => {
  const users = useSelector(state => state.users);
  return { users };
};

export default function DataTable(props) {
  const classes = useStyles();
  const { users } = useDataTable();
  const {table, rankUsers} = props;
  const data = rankUsers(users);
  return (
    <Paper>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                {props.title}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary" variant="body2">
            {props.description}
          </Typography>
        </div>
        <Divider variant="middle" />
        <List className={classes.root}>
          <TableList data={data} table={table}/>
        </List>
      </div>
    </Paper>
  );
}
