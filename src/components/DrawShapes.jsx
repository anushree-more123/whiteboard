import { useState } from "react";
import { StyledIconBox, StyledShapeCard } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { Box, Menu } from "@mui/material";
import {
  ArrowForwardIos,
  ChangeHistoryOutlined,
  Circle,
  CropSquare,
  LensOutlined,
  PlayArrow,
  Rectangle,
  RectangleOutlined,
  Square,
} from "@mui/icons-material";
import { whiteboardActions } from "./WhiteboardSlice";

const ChooseShape = ({ actionType }) => {
  console.log(actionType);
  if (
    actionType === "" ||
    actionType == "draw-with-pen" ||
    actionType === "draw-square" ||
    actionType === "select-shape" ||
    actionType === "draw-line" ||
    actionType === "add-text"
  ) {
    return <CropSquare />;
  } else if (actionType === "draw-triangle") {
    return <ChangeHistoryOutlined />;
  } else if (actionType === "draw-circle") {
    return <LensOutlined />;
  } else if (actionType === "draw-rect") {
    return <RectangleOutlined />;
  } else if (actionType === "draw-fill-triangle") {
    return <PlayArrow sx={{ transform: "rotate(270deg)" }} fontSize="large" />;
  } else if (actionType === "draw-fill-rect") {
    return <Rectangle />;
  } else if (actionType === "draw-fill-circle") {
    return <Circle />;
  } else if (actionType === "draw-fill-square") {
    return <Square />;
  }
};

const DrawShapes = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleCloseDrawShape = () => {
    setAnchorEl(null);
  };

  const { actionType } = useSelector((state) => state.whiteboard);
  const handleDrawShape = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectDraw = (type) => {
    dispatch(whiteboardActions.updateActionType(type));
    handleCloseDrawShape();
  };
  return (
    <>
      <StyledIconBox
        selected={
          actionType === "draw-triangle" ||
          actionType === "draw-rect" ||
          actionType === "draw-circle" ||
          actionType === "draw-square" ||
          actionType === "draw-fill-triangle" ||
          actionType === "draw-fill-rect" ||
          actionType === "draw-fill-circle" ||
          actionType === "draw-fill-square"
            ? true
            : false
        }
        onClick={(e) => handleDrawShape(e)}
        sx={{ position: "relative" }}
      >
        <ChooseShape actionType={actionType} />{" "}
        <ArrowForwardIos
          sx={{ position: "absolute", bottom: 0, right: 0, fontSize: "0.9rem" }}
        />
      </StyledIconBox>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDrawShape}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            display: "flex",
            width: "120px",
            pl: "0.2rem",
            pr: "0.2rem",
            flexWrap: "wrap",
          }}
        >
          <StyledShapeCard onClick={() => handleSelectDraw("draw-triangle")}>
            <ChangeHistoryOutlined />
          </StyledShapeCard>

          <StyledShapeCard onClick={() => handleSelectDraw("draw-rect")}>
            <RectangleOutlined />
          </StyledShapeCard>

          <StyledShapeCard onClick={() => handleSelectDraw("draw-circle")}>
            <LensOutlined />
          </StyledShapeCard>

          <StyledShapeCard onClick={() => handleSelectDraw("draw-square")}>
            <CropSquare />
          </StyledShapeCard>

          <StyledShapeCard
            onClick={() => handleSelectDraw("draw-fill-triangle")}
          >
            <PlayArrow sx={{ transform: "rotate(270deg)" }} fontSize="large" />
          </StyledShapeCard>

          <StyledShapeCard onClick={() => handleSelectDraw("draw-fill-rect")}>
            <Rectangle />
          </StyledShapeCard>

          <StyledShapeCard onClick={() => handleSelectDraw("draw-fill-circle")}>
            <Circle />
          </StyledShapeCard>

          <StyledShapeCard onClick={() => handleSelectDraw("draw-fill-square")}>
            <Square />
          </StyledShapeCard>
        </Box>
      </Menu>
    </>
  );
};

export default DrawShapes;
