import React from "react";
import { StyledIconBox } from "./style";
import { Create } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DrawWithPen = () => {
  const dispatch = useDispatch();
  const { actionType, canvas, selectedColor, thicknessValue } = useSelector(
    (state) => state.whiteboard
  );
  const handleDrawWithPen = () => {
    dispatch(whiteboardActions.updateActionType("draw-with-pen"));
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = selectedColor;
    canvas.freeDrawingBrush.width = thicknessValue;
  };
  return (
    <StyledIconBox
      selected={actionType === "draw-with-pen" ? true : false}
      onClick={() => handleDrawWithPen()}
    >
      <FontAwesomeIcon icon={faPencil} fontSize={"1.2rem"} />
    </StyledIconBox>
  );
};

export default DrawWithPen;
