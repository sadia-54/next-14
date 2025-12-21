'use client'

import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
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

  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  /* ---------- TABLE ---------- */
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Title', dataIndex: 'title' },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            size="small"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this todo?"
            onConfirm={() => dispatch(deleteTodo(record.id))}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  /* ---------- MODAL OPENERS ---------- */
  const openCreateModal = () => {
    setEditingId(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (todo: any) => {
    setEditingId(todo.id)
    form.setFieldsValue({
      title: todo.title,
      dueDate: dayjs(todo.dueDate),
    })
    setIsModalOpen(true)
  }

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async () => {
    const values = await form.validateFields()

    if (editingId === null) {
      dispatch(
        addTodo({
          title: values.title,
          dueDate: values.dueDate.toISOString(),
        })
      )
    } else {
      dispatch(
        updateTodo({
          id: editingId,
          title: values.title,
          dueDate: values.dueDate.toISOString(),
        })
      )
    }

    setIsModalOpen(false)
    form.resetFields()
    setEditingId(null)
  }

  return (
    <div className="max-w-[800px] mx-auto my-10 mt-[60px] items-center mb-6 ">

      <Title level={3} className='!text-green-600 !font-semiold !text-center !mb-12'>Todo Application</Title>

      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreateModal}>
          Add Todo
        </Button>

        <Popconfirm
          title="Clear all todos?"
          onConfirm={() => dispatch(clearTodos())}
        >
          <Button danger>Clear All</Button>
        </Popconfirm>
      </Space>

      {/* ---------- TABLE ---------- */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={todos}
      />

      {/* ---------- MODAL FORM ---------- */}
      <Modal
        title={editingId ? 'Update Todo' : 'Create Todo'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={editingId ? 'Update' : 'Create'}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
