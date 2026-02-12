import { whiteboardActions } from "./WhiteboardSlice";
import { Rect, Circle, Triangle, Line, IText } from "fabric";
import { v4 as uuidv4 } from "uuid";

/* =========================
   MOUSE DOWN
========================= */
export const mouseDown = (event) => {
  return (dispatch, getState) => {
    const { actionType, selectedColor, thicknessValue, canvas } =
      getState().whiteboard;

    if (!canvas) return;

    // ✅ Fabric v7 SAFE pointer
    const point = canvas.getScenePoint(event);
    if (!point) return;

    const { x, y } = point;

    dispatch(whiteboardActions.updateStarted(true));
    dispatch(whiteboardActions.setX(x));
    dispatch(whiteboardActions.setY(y));

    const activeObject = canvas.getActiveObject();
    if (activeObject) return;

    let shape = null;

    switch (actionType) {
      case "draw-rect":
      case "draw-square":
      case "draw-fill-rect":
      case "draw-fill-square":
        shape = new Rect({
          left: x,
          top: y,
          width: 0,
          height: 0,
          fill: actionType.includes("fill") ? selectedColor : "",
          stroke: selectedColor,
          strokeWidth: thicknessValue,
        });
        break;

      case "draw-circle":
      case "draw-fill-circle":
        shape = new Circle({
          left: x,
          top: y,
          radius: 0,
          fill: actionType.includes("fill") ? selectedColor : "",
          stroke: selectedColor,
          strokeWidth: thicknessValue,
        });
        break;

      case "draw-triangle":
      case "draw-fill-triangle":
        shape = new Triangle({
          left: x,
          top: y,
          width: 0,
          height: 0,
          fill: actionType.includes("fill") ? selectedColor : "",
          stroke: selectedColor,
          strokeWidth: thicknessValue,
        });
        break;

      case "draw-line":
        shape = new Line([x, y, x, y], {
          stroke: selectedColor,
          strokeWidth: thicknessValue,
        });
        break;

      case "add-text":
        shape = new IText("Tap and Type", {
          left: x,
          top: y,
          fill: selectedColor,
          fontSize: 22,
        });
        break;

      case "select-shape":
        if (event.target) {
          canvas.setActiveObject(event.target);
          canvas.requestRenderAll();
        }
        return;

      default:
        return;
    }

    if (
      actionType !== "draw-with-pen" &&
      actionType !== "select-shape" &&
      shape
    ) {
      shape.id = uuidv4();
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.requestRenderAll();
    }
  };
};

/* =========================
   MOUSE MOVE
========================= */
export const mouseMove = (event) => {
  return (dispatch, getState) => {
    const { started, actionType, x, y, canvas } = getState().whiteboard;

    if (!started || !canvas) return;
    if (actionType === "draw-with-pen" || actionType === "select-shape") return;

    // ✅ Fabric v7 SAFE pointer
    const point = canvas.getScenePoint(event);
    if (!point) return;

    const currentX = point.x;
    const currentY = point.y;

    const width = Math.abs(currentX - x);
    const height = Math.abs(currentY - y);

    if (!width || !height) return;

    const shape = canvas.getActiveObject();
    if (!shape) return;

    shape.set({
      width,
      height,
    });

    if (actionType === "draw-circle" || actionType === "draw-fill-circle") {
      let radius = Math.max(width, height) / 2;
      if (radius > shape.strokeWidth) {
        radius -= shape.strokeWidth / 2;
      }
      shape.set({ radius });
    }

    canvas.requestRenderAll();
  };
};

/* =========================
   MOUSE UP
========================= */
export const mouseUp = () => {
  return (dispatch, getState) => {
    const { started, actionType, canvas, undoActions } = getState().whiteboard;

    if (!canvas) return;

    if (started) {
      dispatch(whiteboardActions.updateStarted(false));
    }

    if (actionType === "draw-with-pen" || actionType === "select-shape") return;

    const shape = canvas.getActiveObject();
    if (!shape) return;

    if (actionType !== "add-text") {
      canvas.discardActiveObject();
    }

    canvas.requestRenderAll();

    dispatch(
      whiteboardActions.updateUndoActions([
        ...undoActions,
        { action: "add", element: shape },
      ]),
    );
  };
};

/* =========================
   FREE DRAW PATH
========================= */
export const getFreeDrawingPath = (event) => {
  return (dispatch, getState) => {
    const { undoActions } = getState().whiteboard;

    dispatch(
      whiteboardActions.updateUndoActions([
        ...undoActions,
        { action: "add", element: event.path },
      ]),
    );
  };
};

/* =========================
   DELETE SHAPE
========================= */
export const handleDeleteShape = () => {
  return (dispatch, getState) => {
    const { canvas, undoActions } = getState().whiteboard;

    if (!canvas) return;

    const selectedObject = canvas.getActiveObject();
    if (!selectedObject) return;

    canvas.remove(selectedObject);
    canvas.requestRenderAll();

    dispatch(
      whiteboardActions.updateUndoActions([
        ...undoActions,
        { action: "remove", element: selectedObject },
      ]),
    );
  };
};

/* =========================
   CLEAR TEXT PLACEHOLDER
========================= */
export const clearText = (event) => {
  return (dispatch, getState) => {
    const { canvas } = getState().whiteboard;

    if (!canvas || !event.target) return;

    if (
      event.target.type === "i-text" &&
      event.target.text === "Tap and Type"
    ) {
      event.target.selectAll();
      event.target.text = "";
      canvas.requestRenderAll();
    }
  };
};
