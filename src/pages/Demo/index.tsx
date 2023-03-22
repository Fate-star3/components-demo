import { useState, useEffect } from 'react'

import Test from './test'

const Index = () => {
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    console.log('index')
  }, [])
  console.log('1')

  return (
    <div>
      <button type='button' onClick={() => setCount(count + 1)}>
        +
      </button>
      {count}
      <Test />
    </div>
  )
}

export default Index
