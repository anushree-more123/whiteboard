import React from "react";
import { StyledIconBox } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RedoChanges = () => {
  const dispatch = useDispatch();
  const { canvas, undoActions, redoActions } = useSelector(
    (state) => state.whiteboard
  );
  const handleRedoChanges = () => {
    const undoActionsCopy = [...undoActions];
    const redoActionsCopy = [...redoActions];
    const latestChanges = redoActionsCopy.pop();
    console.log(redoActionsCopy);
    if (latestChanges) {
      if (latestChanges.action === "remove") {
        canvas.add(latestChanges.element);
        undoActionsCopy.push({ action: "add", element: latestChanges.element });
      } else if (latestChanges.action === "add") {
        canvas.remove(latestChanges.element);
        canvas.remove(latestChanges.element);
        undoActionsCopy.push({
          action: "remove",
          element: latestChanges.element,
        });
      }
      canvas.renderAll();
      dispatch(whiteboardActions.updateUndoActions(undoActionsCopy));
      dispatch(whiteboardActions.updateRedoActions(redoActionsCopy));
    }
  };
  console.log(redoActions);
  return (
    <StyledIconBox
      onClick={() => handleRedoChanges()}
      component={"button"}
      style={{ border: 0 }}
      disabled={redoActions.length == 0 ? true : false}
    >
      {" "}
      <FontAwesomeIcon icon={faRotateRight} fontSize={"1.2rem"} />
    </StyledIconBox>
  );
};

export default RedoChanges;
