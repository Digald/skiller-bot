import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const updateTeamStatus = pokeId => {
    dispatch({
      type: "UPDATE-POKEMON-STATUS",
      data: pokeId
    });
  };
  return { user, updateTeamStatus };
};

export default function AddToTeamBtn(props) {
  const { poke } = props;
  const { user, updateTeamStatus } = useAddToTeamBtn();
  const [isAdded, setIsAdded] = useState(
    user.team.findIndex(x => x._id === poke._id) !== -1 ? true : false
  );
  const classes = useStyles();

  /**
   * What happens are clicking the add or trash button
   * @param {object} pokemon single pokemon data
   */
  const handleClick = async pokemon => {
    if (!isAdded && user.team.length < 6) {
      user.team.push(pokemon);
      await addToTeam(user.team, user.teamId);
      // updateTeamStatus(pokemon._id);
      setIsAdded(!isAdded);
    } else if (isAdded) {
      const updatedTeam = user.team.filter(poke => {
        return poke._id !== pokemon._id;
      });
      await addToTeam(updatedTeam, user.teamId);
      // updateTeamStatus(pokemon._id);
      setIsAdded(!isAdded);
    } else {
      // Add message that the team is already capped
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
