import { combineReducers, configureStore } from "@reduxjs/toolkit";
import whiteboardSliceReducer, {
  whiteboardActions,
} from "../components/WhiteboardSlice";

/** create root appReducer */
const appReducer = combineReducers({
  whiteboard: whiteboardSliceReducer,
});

/**setup ignoredActions and paths for serialization check  */
const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          whiteboardActions.setCanvas.type,
          whiteboardActions.updateRedoActions.type,
          whiteboardActions.updateUndoActions.type,
        ],

        ignoredPaths: ["whiteboard"],
      },
    }),
});
export default store;
