import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { StyledIconBox } from "./style";
import { whiteboardActions } from "./WhiteboardSlice";
import { handleDeleteShape } from "./WhiteboardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteShape = () => {
  const dispatch = useDispatch();

  const handleDeleteOperation = () => {
    dispatch(handleDeleteShape());
  };

  return (
    <StyledIconBox onClick={() => handleDeleteOperation()} id="delete-element">
      <FontAwesomeIcon icon={faTrashCan} fontSize={"1.2rem"} />
    </StyledIconBox>
  );
};

export default DeleteShape;
