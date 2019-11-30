import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

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

const PlayerCard = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #33c9dc;
  }
`;

const useListTable = () => {
  const users = useSelector(state => state.users);
  return { users };
};

export default function ListTable(props) {
  const classes = useStyles();
  const { users } = useListTable();

  return (
    <Paper>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                Most Collected Pokemon
              </Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary" variant="body2">
            Total amount of unique, non-maxed, Pokemon
          </Typography>
        </div>
        <Divider variant="middle" />
        <List className={classes.root}>
          {data.map((player, index) => (
            <Link href={`/collection/${player.discordId}`}>
              <PlayerCard>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Discord Icon"
                      src={player.discordIcon}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${index + 1} ${player.discordName}`}
                    secondary={`Caught ${player.pokemon.length} Pokemon`}
                  />
                </ListItem>
                {index < 4 ? <Divider variant="inset" component="li" /> : ""}
              </PlayerCard>
            </Link>
          ))}
        </List>
      </div>
    </Paper>
  );
}
