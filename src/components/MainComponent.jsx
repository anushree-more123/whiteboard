import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardActions } from "./WhiteboardSlice";
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
import {
  Container,
  HeaderBox,
  HeaderTitle,
  LeftToolbar,
  TopControls,
  StyledCanvas,
} from "./style";

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

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: width - 3,
      height: height - 3,
    });

    dispatch(whiteboardActions.updateActionType("draw-with-pen"));

    fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.width = thicknessValue;

    dispatch(whiteboardActions.setCanvas(fabricCanvas));

    FabricObject.prototype.cornerColor = "green";
    FabricObject.prototype.cornerStyle = "circle";

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
    <Container>
      <HeaderBox>
        <HeaderTitle>Whiteboard</HeaderTitle>
      </HeaderBox>

      <LeftToolbar>
        <SelectShape />
        <ColorPalette />
        <DrawWithPen />
        <DrawLine />
        <DrawShapes />
        <AddText />
      </LeftToolbar>

      <TopControls>
        <DeleteShape />
        <UndoChanges />
        <RedoChanges />
      </TopControls>

      <StyledCanvas ref={canvasRef} />
    </Container>
  );
};

export default MainComponent;
