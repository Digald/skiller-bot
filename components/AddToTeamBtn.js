import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { addToTeam } from "../lib/api";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const useAddToTeamBtn = () => {
  const user = useSelector(state => state.user);
  return { user };
};

export default function AddToTeamBtn(props) {
  const { user } = useAddToTeamBtn();
  const [isAdded, setIsAdded] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const classes = useStyles();
  const handleClick = async pokemon => {
    if (teamList.length < 6) {
      setIsAdded(!isAdded);
      console.log(pokemon);
      await addToTeam(pokemon._id, user.teamId, !isAdded);
    }
  };
  return (
    <div onClick={() => handleClick(props.poke)} className={classes.root}>
      <Fab
        className={classes.root}
        color={isAdded ? "secondary" : "primary"}
        size="small"
        aria-label={isAdded ? "delete" : "add"}
      >
        {isAdded ? <DeleteIcon /> : <AddIcon />}
      </Fab>
    </div>
  );
}
