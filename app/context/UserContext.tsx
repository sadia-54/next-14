'use client'

import { createContext, useContext, useReducer } from 'react'

export type UserInfo = {
  username?: string
  password?: string
  shippingAddress?: string
}

/* ------------------ STATE TYPES ------------------ */

type State = {
  user: UserInfo
  step: number
}

/* ------------------ ACTION TYPES ------------------ */

type Action =
  | { type: 'SET_USER'; payload: Partial<UserInfo> }
  | { type: 'SET_STEP'; payload: number }

/* ------------------ CONTEXT TYPE ------------------ */

type UserContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

/* ------------------ CONTEXT ------------------ */

const UserContext = createContext<UserContextType | null>(null)

/* ------------------ REDUCER ------------------ */

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }

    case 'SET_STEP':
      return {
        ...state,
        step: action.payload,
      }

    default:
      return state
  }
}

/* ------------------ PROVIDER ------------------ */

const initialState: State = {
  user: {},
  step: 0,
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

/* ------------------ CUSTOM HOOK ------------------ */

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used inside UserProvider')
  }

  const { state, dispatch } = context

  return {
    user: state.user,
    step: state.step,
    setUser: (data: Partial<UserInfo>) =>
      dispatch({ type: 'SET_USER', payload: data }),
    setStep: (step: number) =>
      dispatch({ type: 'SET_STEP', payload: step }),
  }
}
