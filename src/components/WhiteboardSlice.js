import { createSlice } from '@reduxjs/toolkit'

const whieboardInitialState = {
    canvas: '',
    actionType: '',
    started: false,
    x: 0,
    y: 0,
    selectedColor: '#000',
    thicknessValue: 2,
    undoActions: [],
    redoActions: []
}

const WhiteboardSlice = createSlice({
    name: 'whiteboard',
    initialState: whieboardInitialState,
    reducers: {
        setCanvas(state, action) {
            state.canvas = action.payload
        },
        updateActionType(state, action) {
            state.actionType = action.payload
        },
        updateStarted(state, action) {
            state.started = action.payload
        },
        setX(state, action) {
            state.x = action.payload
        },
        setY(state, action) {
            state.y = action.payload
        },
        updateSelectedColor(state, action) {
            state.selectedColor = action.payload
        },
        updateThicknessValue(state, action) {
            state.thicknessValue = action.payload
        },
        updateUndoActions(state, action) {
            state.undoActions = action.payload
        },
        updateRedoActions(state, action) {
            state.redoActions = action.payload
        }

    }
})

export const whiteboardActions = WhiteboardSlice.actions
export default WhiteboardSlice.reducer
