import { useEffect, useState } from 'react'

import BackTop from '@/components/BackTop'
import Drag from '@/components/Drag'

const Home = () => {
  const [target, setTarget] = useState<HTMLElement | null>(null)
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
    </>
  )
}

export default Home
