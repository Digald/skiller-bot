import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import typesJson from "./types.json";
import ModalDetails from "./ModalDetails";

//  --------------------------------------------------------------------------STYLES
const useStyles = makeStyles({
  root: props => ({
    background: props.background,
    padding: "0",
    width: "100%"
  }),
  paperScrollBody: { width: "100%", overflow: "hidden" }
});
// ----------------------------------------------------------------------------HOOK
const usePokeModal = () => {
  const open = useSelector(state => state.isModalToggled);
  const pokemon = useSelector(state => state.singlePoke)
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: "CLOSE-MODAL"
    });
  };

  return { open, pokemon, closeModal };
};
// -----------------------------------------------------------------------Component
export default function PokeModal() {
  const { open, pokemon, closeModal } = usePokeModal();
  const { types } = pokemon;

  let props = { background: "black" };
  if (types) {
    if (types.length === 1) {
      props = {
        background: `linear-gradient(to right, ${
          typesJson[types[0].pokeType].single[0]
        }, ${typesJson[types[0].pokeType].single[1]})`
      };
    } else {
      props = {
        background: `linear-gradient(to right, ${
          typesJson[types[0].pokeType].duo
        }, ${typesJson[types[1].pokeType].duo})`
      };
    }
  }
  const classes = useStyles(props);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, [open]);

  if (!types) return "";
  // ------------------------------------------------------------------------RENDER
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{ paperScrollBody: classes.paperScrollBody }}
    >
      <DialogContent className={classes.root}>
        <ModalDetails colors={props.background}/>
      </DialogContent>
    </Dialog>
  );
}
