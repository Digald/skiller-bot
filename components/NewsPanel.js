import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Battles Coming Soon! - Nov. 30, 2019
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            The long awaited reason for capturing these Pokemon in the first
            place is currently in development. It will be a 1v1, auto battler
            style game where your roster of 6 is put up against your opponent's.
            NPC challenges may also be in the works so that even if another
            player isn't around on Discord, you can put your team up against
            popular characters from your favorite Pokemon games.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Future Updates? - Nov. 30, 2019
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Besides sending your hard-earned pocket animals to fight to the
            death in PvP and NPC battles, there's one last major update I wanted
            to implment. Trading. Trading won't be in the game for reasons,
            sorry. Anyway, the update will be Pokemon Safari. This feature will
            allow players to collect additonal Pokemon that may be more specific
            to their needs and wants. This will incentevise players to hang
            around Discord when participating since it requires cooperation to
            obtain the most benefits. Currently, Safari is just a concept and
            may change depending on how much time I have for development.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
