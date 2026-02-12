import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
import { Box, Card } from "@mui/material";
import { Canvas, Object as FabricObject, PencilBrush } from "fabric";

import DrawWithPen from "./DrawWithPen";
import {
  clearText,
  getFreeDrawingPath,
  mouseDown,
  mouseMove,
  mouseUp,
} from "./WhiteboardActions";
import DrawLine from "./DrawLine";
import ColorPalette from "./ColorPalette";
import SelectShape from "./SelectShape";
import DeleteShape from "./DeleteShape";
import UndoChanges from "./UndoChanges";
import AddText from "./AddText";
import RedoChanges from "./RedoChanges";
import DrawShapes from "./DrawShapes";

const MainComponent = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  const { canvas, actionType, thicknessValue } = useSelector(
    (state) => state.whiteboard,
  );

  useEffect(() => {
    const width =
      window.innerWidth > 0 ? window.innerWidth : window.screen.width;
    const height =
      window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    // ✅ Fabric v7 way
    const fabricCanvas = new Canvas(canvasRef.current, {
      width: width - 3,
      height: height - 3,
    });

    dispatch(whiteboardActions.updateActionType("draw-with-pen"));

    fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.width = thicknessValue;

    dispatch(whiteboardActions.setCanvas(fabricCanvas));

    // ✅ Fabric v7 object prototype styling
    FabricObject.prototype.cornerColor = "green";
    FabricObject.prototype.cornerStyle = "circle";

    // 🔹 Canvas Events
    fabricCanvas.on("mouse:down", (event) => {
      dispatch(mouseDown(event));
    });

    fabricCanvas.on("mouse:move", (event) => {
      dispatch(mouseMove(event));
    });

    fabricCanvas.on("mouse:up", (event) => {
      dispatch(mouseUp(event));
    });

    fabricCanvas.on("text:editing:entered", (event) => {
      dispatch(clearText(event));
    });

    fabricCanvas.on("path:created", (event) => {
      dispatch(getFreeDrawingPath(event));
    });

    // ✅ Cleanup (VERY IMPORTANT)
    return () => {
      fabricCanvas.dispose();
    };
  }, [dispatch, thicknessValue]);

  // Toggle drawing mode when tool changes
  useEffect(() => {
    if (canvas && typeof canvas === "object") {
      canvas.isDrawingMode = actionType === "draw-with-pen";
    }
  }, [actionType, canvas]);

  return (
    <Box>
      {/* Logo */}
      <Box
        sx={{
          position: "absolute",
          top: "18px",
          left: "11px",
          zIndex: 1,
          width: "70px",
        }}
      >
        Whiteboard
      </Box>

      {/* Left Toolbar */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "70px",
          left: "10px",
          zIndex: 1,
          backgroundColor: "#f8f9fa",
        }}
      >
        <SelectShape />
        <ColorPalette />
        <DrawWithPen />
        <DrawLine />
        <DrawShapes />
        <AddText />
      </Card>

      {/* Top Controls */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: "20px",
          left: "90px",
          zIndex: 1,
          backgroundColor: "#f8f9fa",
        }}
      >
        <DeleteShape />
        <UndoChanges />
        <RedoChanges />
      </Card>

      {/* Canvas */}
      <Box>
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid #000",
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default MainComponent;
