import { LensOutlined } from "@mui/icons-material";
import React from "react";
import { StyledIconBox } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";

const AddText = () => {
  const dispatch = useDispatch();
  const { actionType } = useSelector((state) => state.whiteboard);
  const handleAddText = () => {
    dispatch(whiteboardActions.updateActionType("add-text"));
  };
  return (
    <StyledIconBox
      selected={actionType === "add-text" ? true : false}
      onClick={() => handleAddText()}
    >
      <FontAwesomeIcon icon={faFont} fontSize={"1.2rem"} />
    </StyledIconBox>
  );
};

export default AddText;
