import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    background: "black"
  }
}));

const usePokeModal = () => {
  const open = useSelector(state => state.isModalToggled);
  const pokemon = useSelector(state => state.singlePoke);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({
      type: "OPEN-MODAL"
    });
  };

  const closeModal = () => {
    dispatch({
      type: "CLOSE-MODAL"
    });
  };

  return { open, pokemon, openModal, closeModal };
};

export default function PokeModal() {
  const {open, pokemon, openModal, closeModal} = usePokeModal();
  const classes = useStyles();
  
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, [open]);

  return (
    <div>
      <Button onClick={openModal}>scroll=body</Button>
      <Dialog
        open={open}
        onClose={closeModal}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent className={classes.root}>
          <DialogContentText
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
