import { Suspense } from 'react'

import RoutesConfig from '@/routes'

const App = () => {
  return (
    <Suspense>
      <RoutesConfig />
    </Suspense>
  )
}

export default App
