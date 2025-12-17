import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: number
  title: string
}

type TodoState = {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: Date.now(),
        title: action.payload,
      })
    },

    updateTodo(state, action: PayloadAction<{ id: number; title: string }>) {
      const todo = state.todos.find(t => t.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
      }
    },

    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(t => t.id !== action.payload)
    },

    clearTodos(state) {
      state.todos = []
    },
  },
})

export const { addTodo, updateTodo, deleteTodo, clearTodos } =
  todoSlice.actions

export default todoSlice.reducer
