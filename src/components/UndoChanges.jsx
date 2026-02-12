import React from "react";
import { StyledIconBox } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const UndoChanges = () => {
  const dispatch = useDispatch();
  const { canvas, undoActions, redoActions } = useSelector(
    (state) => state.whiteboard
  );
  const state = useSelector((state) => state);
  // console.error(state);
  const handleUndoChanges = () => {
    const undoActionsCopy = [...undoActions];
    const redoActionsCopy = [...redoActions];
    const latestChanges = undoActionsCopy.pop();
    console.log(latestChanges);
    if (latestChanges) {
      if (latestChanges.action === "remove") {
        canvas.add(latestChanges.element);
        redoActionsCopy.push({ action: "add", element: latestChanges.element });
      } else if (latestChanges.action === "add") {
        canvas.remove(latestChanges.element);
        canvas.remove(latestChanges.element);
        redoActionsCopy.push({
          action: "remove",
          element: latestChanges.element,
        });
      }
      canvas.renderAll();
      dispatch(whiteboardActions.updateUndoActions(undoActionsCopy));
      dispatch(whiteboardActions.updateRedoActions(redoActionsCopy));
    }
  };
  console.log(undoActions);
  return (
    <StyledIconBox
      component={"button"}
      style={{ border: 0 }}
      onClick={() => handleUndoChanges()}
      disabled={undoActions.length == 0 ? true : false}
    >
      <FontAwesomeIcon icon={faRotateLeft} fontSize={"1.2rem"} />
    </StyledIconBox>
  );
};

export default UndoChanges;
