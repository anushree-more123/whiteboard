import React from "react";
import { StyledIconBox } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const SelectShape = () => {
  const dispatch = useDispatch();
  const { actionType, canvas } = useSelector((state) => state.whiteboard);
  const handleSelectShape = () => {
    dispatch(whiteboardActions.updateActionType("select-shape"));
    console.log(canvas);
  };
  return (
    <StyledIconBox
      selected={actionType === "select-shape" ? true : false}
      onClick={() => handleSelectShape()}
    >
      <FontAwesomeIcon
        icon={faLocationArrow}
        fontSize={"1.3rem"}
        style={{ transform: "rotate(270deg)" }}
      />
    </StyledIconBox>
  );
};

export default SelectShape;
