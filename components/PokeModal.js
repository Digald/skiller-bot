import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import typesJson from "./types.json";

const useStyles = makeStyles(theme => ({
  root: props => ({
    background: props.background,
    padding: "0"
  }),
  content: {
    background: "white",
    height: "100%",
    borderRadius: "20px",
    margin: "50px 1% 1% 1%",
    padding: "20px"
  }
}));

const usePokeModal = () => {
  const open = useSelector(state => state.isModalToggled);
  const pokemon = useSelector(state => state.singlePoke);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: "CLOSE-MODAL"
    });
  };

  return { open, pokemon, closeModal };
};

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

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent className={classes.root}>
          <DialogContentText
            className={classes.content}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(1)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
