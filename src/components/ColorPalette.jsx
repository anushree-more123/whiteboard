import { Box, Menu, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import { StyledColorCard, StyledIconBox } from "./style";
import { ArrowForwardIos, ColorLens } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";

const ColorPalette = () => {
  const dispatch = useDispatch();
  const { selectedColor, actionType, canvas, thicknessValue } = useSelector(
    (state) => state.whiteboard,
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    dispatch(whiteboardActions.updateThicknessValue(newValue));
    if (actionType === "draw-with-pen") {
      canvas.freeDrawingBrush.width = newValue;
    }
  };
  //   console.log(thicknessValue);
  const colorArr = [
    "rgb(16, 16, 16)",
    "rgb(77, 77, 77)",
    "rgb(153, 153, 153)",
    "rgb(230, 230, 230)",
    "rgb(139, 0, 0)",
    "rgb(255, 0, 0)",
    "rgb(245, 126, 131)",
    "rgb(245, 204, 211)",
    "rgb(255, 98, 0)",
    "rgb(255, 153, 0)",
    "rgb(255, 215, 76)",
    "rgb(254, 217, 146)",
    "rgb(98, 37, 2)",
    "rgb(200, 110, 76)",
    "rgb(179, 128, 105)",
    "rgb(218, 189, 143)",
    "rgb(0, 31, 63)",
    "rgb(22, 77, 176)",
    "rgb(0, 153, 255)",
    "rgb(100, 192, 240)",
    "rgb(6, 78, 59)",
    "rgb(51, 153, 51)",
    "rgb(146, 226, 133)",
    "rgb(176, 218, 190)",
    "rgb(83, 2, 96)",
    "rgb(131, 44, 118)",
    "rgb(161, 32, 204)",
    "rgb(202, 124, 216)",
    "rgb(60, 50, 115)",
    "rgb(101, 84, 192)",
    "rgb(188, 192, 244)",
    "rgb(230, 230, 250)",
  ];

  const handleSelectColor = (colorName) => {
    dispatch(whiteboardActions.updateSelectedColor(colorName));
    handleClose();
    if (actionType === "draw-with-pen") {
      canvas.freeDrawingBrush.color = colorName;
    }
  };
  return (
    <Box>
      <StyledIconBox
        onClick={(e) => handleClick(e)}
        sx={{ position: "relative" }}
      >
        <ColorLens sx={{ color: selectedColor }} />
        <Typography variant="caption"> {thicknessValue}</Typography>
        <ArrowForwardIos
          sx={{ position: "absolute", bottom: 0, right: 0, fontSize: "0.9rem" }}
        />
      </StyledIconBox>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pl: "1.8rem", pr: "1.8rem" }}>
          <Typography variant="caption">
            Thickness <FontAwesomeIcon icon={faPaintBrush} />
          </Typography>
          <Slider
            aria-label="Volume"
            value={thicknessValue}
            onChange={handleChange}
            min={1}
            // step={1}
            max={10}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "150px",
            padding: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {colorArr.map((colorName, position) => (
            <StyledColorCard
              key={`color-card-${position + 1}`}
              sx={{
                backgroundColor: colorName,
              }}
              onClick={() => handleSelectColor(colorName)}
            />
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default ColorPalette;
