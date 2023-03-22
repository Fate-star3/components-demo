import React, { useReducer, useState } from 'react'

type ActionType = {
  type: 'increment' | 'decrement'
}

type State = { count: number }

const Counter = () => {
  const initialState: State = { count: 0 }

  const [count, setCount] = useState<number>(0)
  const _setCount: React.Dispatch<React.SetStateAction<number | void>> = () => {
    setCount(count => count + 1)
  }
  const reducer: React.Reducer<State, ActionType> = (state, action) => {
    switch (action.type) {
      case 'increment':
        _setCount()
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const divStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    backgroundColor: '#CCC'
  }
  const [text, setText] = useState<string>('')

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setText(e.currentTarget.value)
  }

  return (
    <>
      useReducerCount: {state.count}
      useStateCount: {count}
      <button type='button' onClick={() => dispatch({ type: 'increment' })} style={divStyle}>
        +
      </button>
      <button type='button' onClick={() => dispatch({ type: 'decrement' })} style={divStyle}>
        -
      </button>
      <div>
        <input type='text' value={text} onChange={onChange} placeholder='qingh' />
      </div>
    </>
  )
}

export default Counter
