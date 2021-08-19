import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TodoId = string;
type ColorCode =  string;

type Todo = {
    id: TodoId;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    color: ColorCode;
  };

  type TodosState = {
    list: Todo[];
  };

  const initialState = {
    list: [],
  } as TodosState;

const rectangleSlice = createSlice({
    name: 'rectangle',
    initialState: initialState,
    reducers: {
        drawRectangle( state, action: PayloadAction<Todo>) {
            state.list.push(action.payload)
        },
        addColor(state, action: PayloadAction<Todo>) {
            const index = state.list.findIndex(({id}) => id === action.payload.id);
            console.log("indexx ==", index)
            if (index > -1) {
                state.list[index].color = action.payload.color;
            }
        }
    },
});


export const { drawRectangle, addColor } = rectangleSlice.actions;

export default rectangleSlice.reducer;
