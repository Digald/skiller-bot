import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { addToTeamApi } from "../lib/api";

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
  const currentTeam = useSelector(state => state.currentTeam);
  const dispatch = useDispatch();
  const updateTeam = team => {
    dispatch({
      type: "UPDATE-POKEMON-TEAM",
      data: team
    });
  };
  return { user, currentTeam, updateTeam };
};

export default function AddToTeamBtn(props) {
  const { poke } = props;
  const { user, currentTeam, updateTeam } = useAddToTeamBtn();
  const [isAdded, setIsAdded] = useState(currentTeam.findIndex(teamMember => teamMember._id === poke._id) !== -1 ? true : false);
  const classes = useStyles();
  useEffect(() => {
    setIsAdded(currentTeam.findIndex(teamMember => teamMember._id === poke._id) !== -1 ? true : false)
  })
  /**
   * What happens are clicking the add or trash button
   * @param {object} pokemon single pokemon data
   */
  const handleClick = async pokemon => {
    // if the pokemon has not been added and the team is not full
    if (!isAdded && currentTeam.length < 6) {
      const updatedTeam = [...currentTeam, pokemon]
      await addToTeamApi(updatedTeam, user.teamId);
      updateTeam(updatedTeam);
      setIsAdded(!isAdded);
    }
    // if the pokemon has already been added, removed from team
    else if (isAdded) {
      const updatedTeam = currentTeam.filter(poke => {
        return poke._id !== pokemon._id;
      });
      await addToTeamApi(updatedTeam, user.teamId);
      updateTeam(updatedTeam);
      setIsAdded(!isAdded);
    }
    // Add message that the team is already capped
    else {
      console.log("Your team already has six pokemon");
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
