import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: number
  title: string
  dueDate: string
}

type TodoState = {
  todos: Todo[]
  nextId: number
}

const initialState: TodoState = {
  todos: [],
  nextId: 1,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{ title: string; dueDate: string }>) {
      state.todos.push({
        id: state.nextId,
        title: action.payload.title,
        dueDate: action.payload.dueDate,
      })
      state.nextId += 1
    },

    updateTodo(state, action: PayloadAction<{ id: number; title: string; dueDate: string }>) {
      const todo = state.todos.find(t => t.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
        todo.dueDate = action.payload.dueDate
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
