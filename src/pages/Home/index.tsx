import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BackTop from '@/components/BackTop'
import Drag from '@/components/Drag'
import Toast from '@/components/Toast'
import HOC from '@/HOC/withLoginAndLogout'

const Home = () => {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    setTarget(document.getElementById('anchor'))
  }, [])

  return (
    <>
      <div id='anchor'>header</div>
      <BackTop
        duration={2000}
        // target={(): HTMLElement => target as HTMLElement}
        visibilityHeight={100}
      />
      <Drag />
      <HOC />
      <button
        type='button'
        onClick={() => {
          Toast.show('qiqi')
        }}
      >
        home按钮
      </button>
      <button
        type='button'
        onClick={() => {
          navigate('/mine')
        }}
      >
        mine按钮
      </button>
      <button
        type='button'
        onClick={() => {
          navigate('/test')
        }}
      >
        test按钮
      </button>
      <button
        type='button'
        onClick={() => {
          navigate('/demo')
        }}
      >
        demo按钮
      </button>
    </>
  )
}

export default Home
