import { createSlice } from "@reduxjs/toolkit";
import {
  getTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  deleteTodoAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addNewTodoIsLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },
    //   prepare: ({ title }) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title,
    //       },
    //     };
    //   },
    // },
    // toggle: (state, action) => {
    //   const item = state.items.find((item) => item.id === action.payload);
    //   if (item) {
    //     item.completed = !item.completed;
    //   }
    // },
    // destroy: (state, action) => {
    //   state.items = state.items.filter((item) => item.id !== action.payload);
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
  extraReducers: {
    // get todos
    [getTodosAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
    // add todo
    [addTodoAsync.pending]: (state) => {
      state.addNewTodoIsLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.addNewTodoIsLoading = false;
      state.items.push(action.payload);
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoError = action.error;
      state.addNewTodoIsLoading = false;
    },
    // toggle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.completed = completed;
      }
    },
    // delete todo
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
