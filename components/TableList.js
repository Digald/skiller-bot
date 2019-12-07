import React from "react";
import Link from "../components/Link";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LoadingSpinner from "./LoadingSpinner";

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

export default function TableList(props) {
  const classes = useStyles();
  const { data, table } = props;
  const getMessage = player => {
    let message = "";
    switch (table) {
      case "collected":
        message = `Caught ${player.pokemon.length} Pokemon`;
        break;
      case "leveled":
        message = `${player.total} Leveled Pokemon`;
        break;
      case "shiny":
        message = `${player.shinyTotal} Shiny Pokemon`;
        break;
      default:
        break;
    }
    return message;
  };
  if (data.length < 1) return <LoadingSpinner />;
  return (
    <>
      {data.map((player, index) => (
        <Link
          key={index}
          href={`/collection?user=${player.discordId}`}
          as={`/collection/${player.discordId}`}
        >
          <PlayerCard>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={player.discordIcon} className={classes.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`${index + 1} ${player.discordName}`}
                secondary={getMessage(player)}
              />
            </ListItem>
            {index < 4 ? <Divider variant="inset" component="li" /> : ""}
          </PlayerCard>
        </Link>
      ))}
    </>
  );
}
