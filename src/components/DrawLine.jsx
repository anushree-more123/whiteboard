import { HorizontalRule } from "@mui/icons-material";
import { StyledIconBox } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";

const DrawLine = () => {
  const dispatch = useDispatch();
  const { actionType } = useSelector((state) => state.whiteboard);
  const handleDrawLine = () => {
    dispatch(whiteboardActions.updateActionType("draw-line"));
  };
  return (
    <StyledIconBox
      selected={actionType === "draw-line" ? true : false}
      onClick={() => handleDrawLine()}
    >
      <HorizontalRule fontSize="large" sx={{ transform: "rotate(45deg)" }} />
    </StyledIconBox>
  );
};

export default DrawLine;
