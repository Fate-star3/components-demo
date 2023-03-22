import React, { useState, useTransition } from 'react'

const Demo = () => {
  const [value, setValue] = useState('')
  const [searchQuery, setSearchQuery] = useState<any[]>([])
  const [loading, startTransition] = useTransition()

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setValue(e.target.value)
    // 延迟更新
    startTransition(() => {
      setSearchQuery(new Array(20010).fill(e.target.value))
    })
  }

  return (
    <div className='App'>
      <input value={value} onChange={handleChange} placeholder='请输入' />
      {loading ? <p>loading...</p> : searchQuery.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  )
}

export default Demo
