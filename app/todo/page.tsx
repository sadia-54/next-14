'use client'

import { Button, Input, List, Space, Typography } from 'antd'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addTodo,
  updateTodo,
  deleteTodo,
  clearTodos,
} from '../store/todoSlice'

const { Title } = Typography

export default function TodoPage() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todo.todos)

  const [input, setInput] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <Title level={3}>Redux Toolkit CRUD Todo</Title>

      {/* Simple Form */}
      <Input
        placeholder="Enter todo"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      {/* CRUD Buttons */}
      <Space style={{ marginTop: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            if (!input) return
            dispatch(addTodo(input))
            setInput('')
          }}
        >
          CREATE
        </Button>

        <Button
          onClick={() => {
            if (!selectedId || !input) return
            dispatch(updateTodo({ id: selectedId, title: input }))
            setInput('')
            setSelectedId(null)
          }}
        >
          UPDATE
        </Button>

        <Button
          danger
          onClick={() => {
            if (!selectedId) return
            dispatch(deleteTodo(selectedId))
            setInput('')
            setSelectedId(null)
          }}
        >
          DELETE
        </Button>

        <Button onClick={() => dispatch(clearTodos())}>
          CLEAR ALL
        </Button>
      </Space>

      {/* READ */}
      <List
        style={{ marginTop: 24 }}
        bordered
        dataSource={todos}
        renderItem={item => (
          <List.Item
            onClick={() => {
              setSelectedId(item.id)
              setInput(item.title)
            }}
            style={{
              cursor: 'pointer',
              background:
                selectedId === item.id ? '#87CEEB' : '#FFC0CB',
            }}
          >
            {item.title}
          </List.Item>
        )}
      />
    </div>
  )
}
